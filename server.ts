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

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Por favor, digite um endereço de e-mail válido." });
    }

    try {
      let confirmSent = false;
      let magoiNotifySent = false;
      let errors: string[] = [];

      const primaryKey = process.env.RESEND_API_KEY;
      const magoiKey = "re_5bnXBCqD_E1iTb8yDc4cCw7ZdApZemHS2";

      // HTML content for the client's confirmation email
      const clientHtml = `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; padding: 25px;">
          <h2 style="color: #2563eb; margin-top: 0;">Olá, ${name}!</h2>
          <p>Recebemos sua mensagem enviada através de nosso site sobre o assunto "<strong>${subject}</strong>".</p>
          <div style="background: #fdfdfd; padding: 15px; border-radius: 8px; border: 1px solid #eee; font-style: italic; margin: 15px 0; color: #666;">
            "${message.replace(/\n/g, '<br/>')}"
          </div>
          <p style="font-size: 16px; font-weight: bold; color: #2563eb; margin: 20px 0 10px 0;">Nossa equipe entrará em contato com você em breve!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; margin: 0;">Muzzicycles — Tecnologia e Mobilidade Sustentável</p>
        </div>
      `;

      // HTML content for Magoi's admin notification email
      const adminNotifyHtml = `
        <div style="font-family: sans-serif; color: #333; padding: 25px; border: 1px solid #eee; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; margin-top: 0; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">📬 Novo Cliente em Contato!</h2>
          <p>Olá! Há um novo cliente que acabou de entrar em contato conosco pelo formulário do site.</p>
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; border: 1px solid #eee; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Nome:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>E-mail:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Assunto:</strong> ${subject}</p>
            <p style="margin: 12px 0 4px 0; font-size: 14px;"><strong>Mensagem:</strong></p>
            <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; font-style: italic; color: #555;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; margin: 0; text-align: center;">Este aviso automático de contato foi disparado usando o token de integração da Magoi Empresa.</p>
        </div>
      `;

      // Action 1: Send confirmation email TO THE CLIENT.
      // Try the primary key (where the domain was verified) FIRST, fallback to magoiKey if needed.
      let lastUsedKey = "";
      if (primaryKey) {
        try {
          const resendPrimary = new Resend(primaryKey);
          await resendPrimary.emails.send({
            from: "Muzzicycles <contato@muzzicycles.com.br>",
            to: email,
            replyTo: "contato@muzzicycles.com.br",
            subject: `Confirmação de Contato - Muzzicycles: ${subject}`,
            html: clientHtml,
          });
          confirmSent = true;
          lastUsedKey = primaryKey;
          console.log("[SERVER RESEND] Email de confirmação enviado ao cliente com sucesso (Chave Principal).");
        } catch (errConfirmPrimary: any) {
          console.warn("[SERVER RESEND] Erro ao enviar para o cliente com chave principal, tentando chave Magoi:", errConfirmPrimary?.message || errConfirmPrimary);
          errors.push(`Cliente (Chave Principal): ${errConfirmPrimary?.message || String(errConfirmPrimary)}`);
        }
      }

      if (!confirmSent) {
        try {
          const resendMagoi = new Resend(magoiKey);
          await resendMagoi.emails.send({
            from: "Muzzicycles via Magoi <onboarding@resend.dev>",
            to: email,
            replyTo: "magoi.empresa@gmail.com",
            subject: `Confirmação de Contato - Muzzicycles: ${subject}`,
            html: clientHtml,
          });
          confirmSent = true;
          lastUsedKey = magoiKey;
          console.log("[SERVER RESEND] Email de confirmação enviado ao cliente com sucesso (Chave Magoi).");
        } catch (errConfirmMagoi: any) {
          console.error("[SERVER RESEND] Erro ao enviar para o cliente com chave Magoi:", errConfirmMagoi?.message || errConfirmMagoi);
          errors.push(`Cliente (Chave Magoi): ${errConfirmMagoi?.message || String(errConfirmMagoi)}`);
        }
      }

      // Action 2: Send admin notification TO MAGOI
      const adminEmail = "magoi.empresa@gmail.com";
      const activeAdminKey = lastUsedKey || primaryKey || magoiKey;
      const adminFromAddress = activeAdminKey === magoiKey
        ? "Muzzicycles Notificação <onboarding@resend.dev>"
        : "Muzzicycles Notificação <contato@muzzicycles.com.br>";

      try {
        const resendClientInstance = new Resend(activeAdminKey);
        await resendClientInstance.emails.send({
          from: adminFromAddress,
          to: adminEmail,
          replyTo: email,
          subject: `Novo cliente em contato: ${name} - ${subject}`,
          html: adminNotifyHtml,
        });
        magoiNotifySent = true;
      } catch (errAdmin1: any) {
        console.warn(`[SERVER RESEND] Erro ao enviar notificação administrativa para ${adminEmail} com a chave ativa, tentando fallback...`, errAdmin1?.message || errAdmin1);
        errors.push(`Admin (${adminEmail} - Chave Ativa): ${errAdmin1?.message || String(errAdmin1)}`);

        const alternativeKey = activeAdminKey === magoiKey ? (primaryKey || "") : magoiKey;
        if (alternativeKey) {
          const fallbackFromAddress = alternativeKey === magoiKey
            ? "Muzzicycles Notificação <onboarding@resend.dev>"
            : "Muzzicycles Notificação <contato@muzzicycles.com.br>";
          try {
            const resendAlt = new Resend(alternativeKey);
            await resendAlt.emails.send({
              from: fallbackFromAddress,
              to: adminEmail,
              replyTo: email,
              subject: `Novo cliente em contato: ${name} - ${subject}`,
              html: adminNotifyHtml,
            });
            magoiNotifySent = true;
          } catch (errAdmin2: any) {
            console.error(`[SERVER RESEND] Erro ao enviar notificação administrativa via chave alternativa para ${adminEmail}:`, errAdmin2?.message || errAdmin2);
            errors.push(`Admin (${adminEmail} - Chave Alternativa): ${errAdmin2?.message || String(errAdmin2)}`);
          }
        }
      }

      // If absolutely both kinds of sendings failed, we throw an error
      if (!confirmSent && !magoiNotifySent) {
        throw new Error(`Ambas as tentativas de envio falharam. Erros: ${errors.join(" | ")}`);
      }

      res.json({ success: true, confirmSent, magoiNotifySent });
    } catch (error) {
      console.error("Erro geral no endpoint de email:", error);
      res.status(500).json({ 
        error: "Erro ao processar envio de e-mails via Resend.",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/newsletter-notification", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email é obrigatório." });
    }

    try {
      const resend = getResend();

      // Notificação para o Matheus
      await resend.emails.send({
        from: "Newsletter Muzzicycles <contato@muzzicycles.com.br>",
        to: "matheusmagoi26@gmail.com",
        subject: "🚀 Novo inscrito na Newsletter!",
        html: `
          <div style="font-family: sans-serif; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
            <h2 style="color: #2563eb; margin-top: 0;">Mais um usuário interessado!</h2>
            <p style="font-size: 16px;">O seguinte e-mail acaba de se cadastrar na newsletter pelo site:</p>
            <div style="background: #f4f7ff; padding: 15px; border-radius: 8px; font-weight: bold; color: #1e40af; border: 1px solid #dbeafe;">
              ${email}
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 20px;">Este e-mail foi enviado automaticamente pelo sistema da Muzzicycles.</p>
          </div>
        `,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Erro ao enviar notificação de newsletter:", error);
      // Não falhamos a requisição se apenas o email de aviso falhar, 
      // pois o usuário já foi salvo no banco. Mas retornamos um log.
      res.json({ success: true, warning: "Admin notification failed" });
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

      let results = [];
      
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

      // Heuristic Fallback if API returns nothing or is not configured
      if (results.length === 0) {
        console.log("Jadlog API returned no results or is not configured. Using heuristic fallback.");
        const cleanDestZip = destZipCode.replace(/\D/g, '');
        const stateCode = cleanDestZip.substring(0, 2);
        
        // Base price variations based on distance from SP (01-19)
        let baseStandard = 150;
        let baseExpress = 280;
        let daysStandard = 12;
        let daysExpress = 5;

        const statePrefix = parseInt(stateCode);
        
        if (statePrefix >= 1 && statePrefix <= 19) { // SP
          baseStandard = 85; baseExpress = 140; daysStandard = 4; daysExpress = 2;
        } else if (statePrefix >= 20 && statePrefix <= 28) { // RJ/ES
          baseStandard = 120; baseExpress = 190; daysStandard = 7; daysExpress = 3;
        } else if (statePrefix >= 30 && statePrefix <= 39) { // MG
          baseStandard = 110; baseExpress = 180; daysStandard = 6; daysExpress = 3;
        } else if (statePrefix >= 40 && statePrefix <= 49) { // BA/SE
          baseStandard = 180; baseExpress = 320; daysStandard = 10; daysExpress = 5;
        } else if (statePrefix >= 50 && statePrefix <= 59) { // PE/AL/PB/RN
          baseStandard = 210; baseExpress = 380; daysStandard = 12; daysExpress = 6;
        } else if (statePrefix >= 60 && statePrefix <= 65) { // CE/PI/MA
          baseStandard = 230; baseExpress = 410; daysStandard = 14; daysExpress = 7;
        } else if (statePrefix >= 66 && statePrefix <= 69) { // NORTH
          baseStandard = 280; baseExpress = 520; daysStandard = 18; daysExpress = 9;
        } else if (statePrefix >= 70 && statePrefix <= 76) { // DF/GO/TO/RO
          baseStandard = 170; baseExpress = 290; daysStandard = 9; daysExpress = 5;
        } else if (statePrefix >= 77 && statePrefix <= 79) { // MT/MS
          baseStandard = 190; baseExpress = 330; daysStandard = 11; daysExpress = 6;
        } else if (statePrefix >= 80 && statePrefix <= 99) { // SOUTH
          baseStandard = 140; baseExpress = 240; daysStandard = 8; daysExpress = 4;
        }

        // Apply weight factor (multiplier)
        const weightFactor = Math.ceil(weight / 16); 
        results = [
          { 
            type: "express", 
            vlrFrete: baseExpress * weightFactor, 
            prazo: daysExpress,
            servico: "Jadlog .Package"
          },
          { 
            type: "standard", 
            vlrFrete: baseStandard * weightFactor, 
            prazo: daysStandard,
            servico: "Jadlog .Com"
          }
        ];
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
