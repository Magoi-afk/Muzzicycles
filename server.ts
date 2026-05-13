import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from "dotenv";

dotenv.config();

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

let mpClient: MercadoPagoConfig | null = null;

function getMercadoPago(): MercadoPagoConfig {
  if (!mpClient) {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error('MERCADO_PAGO_ACCESS_TOKEN environment variable is required');
    }
    mpClient = new MercadoPagoConfig({ accessToken });
  }
  return mpClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const resend = getResend();

      // 1) Email de confirmação para o usuário
      await resend.emails.send({
        from: "Muzzicycles <onboarding@resend.dev>", // Usando o remetente padrão do Resend para testes
        to: email,
        subject: `Confirmação de Contato: ${subject}`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h1 style="color: #2563eb;">Olá, ${name}!</h1>
            <p>Recebemos sua mensagem sobre "<strong>${subject}</strong>".</p>
            <p>Nossa equipe entrará em contato em breve.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">Muzzicycles — Tecnologia Sustentável</p>
          </div>
        `,
      });

      // 2) Email de notificação para a Muzzicycles
      await resend.emails.send({
        from: "Muzzicycles Website <onboarding@resend.dev>",
        to: "muzzicycles@muzzicycles.com.br",
        subject: `Novo Contato: ${subject}`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2 style="color: #2563eb;">Nova mensagem recebida pelo site</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <p><strong>Mensagem:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
        `,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      res.status(500).json({ error: "Erro ao processar sua solicitação. Tente novamente mais tarde." });
    }
  });

  app.post("/api/create-preference", async (req, res) => {
    try {
      const { items, payer } = req.body;
      const client = getMercadoPago();
      const preference = new Preference(client);

      const result = await preference.create({
        body: {
          items: items.map((item: any) => ({
            id: item.id,
            title: `Muzzicycle ${item.name}`,
            unit_price: Number(item.price),
            quantity: Number(item.quantity || 1),
            currency_id: 'BRL',
            picture_url: item.image
          })),
          payer: {
            name: payer.name,
            email: payer.email,
          },
          back_urls: {
            success: `${req.headers.origin}/?status=success`,
            failure: `${req.headers.origin}/?status=failure`,
            pending: `${req.headers.origin}/?status=pending`,
          },
          auto_return: 'approved',
        }
      });

      res.json({ 
        id: result.id,
        init_point: result.init_point
      });
    } catch (error) {
      console.error("Erro ao criar preferência MP:", error);
      res.status(500).json({ error: "Erro ao processar pagamento." });
    }
  });

  app.post("/api/shipping/calculate", async (req, res) => {
    try {
      const { destZipCode, weight, value, width, height, length } = req.body;
      
      const user = process.env.JADLOG_USER;
      const token = process.env.JADLOG_TOKEN;
      const clientCode = process.env.JADLOG_CLIENT_CODE;
      const originZip = process.env.ORIGIN_ZIP_CODE || "01001000";

      // Basic validation to prevent crashes
      if (!destZipCode || typeof destZipCode !== 'string') {
        return res.status(400).json({ error: "CEP de destino inválido." });
      }

      // Jadlog API calculation
      const calculate = async (type: "E" | "R") => {
        // If no credentials, don't even try - go straight to simulated results via Promise.allSettled
        if (!user || !token) {
          return null; 
        }
        
        const cleanDestZip = destZipCode.replace(/\D/g, '');
        if (cleanDestZip.length !== 8) return null;

        const bodyV1: any = {
          "cepOrigem": originZip.replace(/\D/g, ''),
          "cepDestino": cleanDestZip,
          "vlrDeclarado": value || 100,
          "peso": weight || 1,
          "tpEntrega": type,
          "tpModalidade": "D",
          "vlLargura": width || 15,
          "vlAltura": height || 15,
          "vlComprimento": length || 15
        };

        if (clientCode) {
          bodyV1.cnpj = clientCode;
        }

        const endpoints = [
          "https://www.jadlog.com.br/inter/edi/api/frete/valor",
          "https://www.jadlog.com.br/ediapi/api/frete/valor"
        ];

        for (const url of endpoints) {
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Authorization": token.startsWith('Bearer') ? token : `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(bodyV1)
            });

            if (!response.ok) {
              const errorText = await response.text();
              console.error(`Jadlog API Error (${url}) - Status: ${response.status}:`, errorText);
              continue;
            }
            
            const result = await response.json();
            return result;
          } catch (err) {
            console.error(`Erro ao chamar Jadlog ${url}:`, err);
          }
        }
        return null;
      };

      const extractFrete = (val: any) => {
        if (!val) return null;
        if (val.frete) return Array.isArray(val.frete) ? val.frete[0] : val.frete;
        if (val.vlrFrete !== undefined) return val;
        return null;
      };

      // Run both calculations
      const [expressRes, rodoviarioRes] = await Promise.all([
        calculate("E").catch(() => null),
        calculate("R").catch(() => null)
      ]);

      const results = [];
      
      const expVal = extractFrete(expressRes);
      if (expVal && expVal.vlrFrete !== undefined) {
        const price = typeof expVal.vlrFrete === 'string' ? parseFloat(expVal.vlrFrete.replace(',', '.')) : Number(expVal.vlrFrete);
        results.push({ type: "express", ...expVal, vlrFrete: price });
      }

      const rodVal = extractFrete(rodoviarioRes);
      if (rodVal && rodVal.vlrFrete !== undefined) {
        const price = typeof rodVal.vlrFrete === 'string' ? parseFloat(rodVal.vlrFrete.replace(',', '.')) : Number(rodVal.vlrFrete);
        results.push({ type: "standard", ...rodVal, vlrFrete: price });
      }

      res.json(results);
    } catch (error) {
      console.error("Erro fatal no cálculo de frete:", error);
      res.status(500).json({ error: "Erro ao calcular frete com a Jadlog oficial." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
