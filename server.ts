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

      if (!user || !token) {
        console.error("Erro: JADLOG_USER ou JADLOG_TOKEN não configurados.");
        return res.status(500).json({ error: "Configuração da Jadlog ausente no servidor." });
      }

      // Jadlog API calculation
      const calculate = async (type: "E" | "R") => {
        const bodyV1: any = {
          "cepOrigem": originZip.replace(/\D/g, ''),
          "cepDestino": destZipCode.replace(/\D/g, ''),
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

        // Try these endpoints in order
        const endpoints = [
          "https://www.jadlog.com.br/inter/edi/api/frete/valor",
          "https://www.jadlog.com.br/ediapi/api/frete/valor",
          "https://www.jadlog.com.br/jadlog-api/webapi/frete/valor"
        ];

        // V2 Body Format (used by some EDI API versions)
        const bodyV2 = {
          "vlrConstante": 0,
          "vlrDeclarado": value || 100,
          "vlrColeta": 0,
          "vlrFrete": 0,
          "vlrTaxaExtra": 0,
          "ceps": [
            {
              "cepOrig": parseInt(originZip.replace(/\D/g, '')),
              "cepDest": parseInt(destZipCode.replace(/\D/g, '')),
              "peso": weight || 1,
              "vlrFrete": 0,
              "nfe": ""
            }
          ],
          "tpEntrega": type,
          "tpModalidade": "P", // "P" for Porta
          "tpServico": 1,
          "tpCarga": "N"
        };

        for (const url of endpoints) {
          // Try with V1 body first, then V2 if it failed with 400 or something similar
          const bodies = [bodyV1, bodyV2];
          
          for (const bodyToTry of bodies) {
            try {
              console.log(`Tentando Jadlog API (${type}) em: ${url} (Corpo: ${bodyToTry === bodyV1 ? 'V1' : 'V2'})`);
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(bodyToTry)
              });

              const status = response.status;
              const resultText = await response.text();
              
              if (response.ok) {
                console.log(`Sucesso na Jadlog API (${type}) via ${url} (Corpo: ${bodyToTry === bodyV1 ? 'V1' : 'V2'})`);
                return JSON.parse(resultText);
              } else {
                console.warn(`Jadlog API (${type}) em ${url} com corpo ${bodyToTry === bodyV1 ? 'V1' : 'V2'} falhou com status ${status}: ${resultText.substring(0, 100)}`);
              }
            } catch (err) {
              console.error(`Erro ao chamar ${url}:`, err);
            }
          }
        }

        throw new Error(`Todas as tentativas de API Jadlog falharam para o tipo ${type}`);
      };

      const extractFrete = (val: any) => {
        if (!val) return null;
        if (val.frete) {
          return Array.isArray(val.frete) ? val.frete[0] : val.frete;
        }
        // Se vlrFrete estiver diretamente na raiz (comum em V1)
        if (val.vlrFrete !== undefined) {
          return val;
        }
        return null;
      };

      const [express, rodoviario] = await Promise.allSettled([
        calculate("E"),
        calculate("R")
      ]);

      const results = [];
      
      const expVal = express.status === "fulfilled" ? extractFrete(express.value) : null;
      if (expVal && expVal.vlrFrete !== undefined) {
        const price = typeof expVal.vlrFrete === 'string' ? parseFloat(expVal.vlrFrete.replace(',', '.')) : Number(expVal.vlrFrete);
        results.push({ type: "express", ...expVal, vlrFrete: price });
      }

      const rodVal = rodoviario.status === "fulfilled" ? extractFrete(rodoviario.status === "fulfilled" ? rodoviario.value : null) : null;
      if (rodVal && rodVal.vlrFrete !== undefined) {
        const price = typeof rodVal.vlrFrete === 'string' ? parseFloat(rodVal.vlrFrete.replace(',', '.')) : Number(rodVal.vlrFrete);
        results.push({ type: "standard", ...rodVal, vlrFrete: price });
      }

      if (results.length === 0) {
        console.warn("Jadlog API falhou totalmente. Ativando fallback de segurança para não bloquear o checkout.");
        
        // Fallback dinâmico baseado em peso (Estimativa segura)
        const basePrice = 25.00;
        const weightFactor = (weight || 1) * 5.50; // R$ 5,50 por kg
        const estimatedPrice = basePrice + weightFactor;

        results.push({
          type: "express",
          vlrFrete: estimatedPrice + 15,
          prazo: "3 a 5 dias úteis",
          simulated: true
        });
        
        results.push({
          type: "standard",
          vlrFrete: estimatedPrice,
          prazo: "7 a 12 dias úteis",
          simulated: true
        });
      }

      res.json(results);
    } catch (error) {
      console.error("Erro geral ao calcular frete Jadlog:", error);
      res.status(500).json({ error: "Erro interno ao calcular frete." });
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
