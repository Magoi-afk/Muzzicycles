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

// Helper to calculate robust adaptive fallback shipping costs when Jadlog API is offline or during dev
function getFallbackShipping(cleanDestZip: string, finalWeight: number) {
  const stateCode = cleanDestZip.substring(0, 2);
  const statePrefix = parseInt(stateCode);

  let baseStandard = 150;
  let baseExpress = 280;
  let daysStandard = 12;
  let daysExpress = 5;

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

  // Weight affects cost linearly
  const weightFactor = Math.ceil(finalWeight / 16);
  return [
    {
      type: "express",
      carrier: "Jadlog",
      service: "Jadlog .Package",
      price: baseExpress * weightFactor,
      vlrFrete: baseExpress * weightFactor,
      deliveryDays: daysExpress,
      prazo: daysExpress,
      raw: { origin: "fallback", info: "Simulado localmente por indisponibilidade da API" }
    },
    {
      type: "standard",
      carrier: "Jadlog",
      service: "Jadlog .Com",
      price: baseStandard * weightFactor,
      vlrFrete: baseStandard * weightFactor,
      deliveryDays: daysStandard,
      prazo: daysStandard,
      raw: { origin: "fallback", info: "Simulado localmente por indisponibilidade da API" }
    }
  ];
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS Middleware
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

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

      // Even if email sending fails (e.g. because of sandboxing or missing keys in dev),
      // we do not block the request. This avoids breaking Client/Dev form experience.
      // The frontend can still proceed knowing the copy was registered or stored.
      res.json({ 
        success: true, 
        confirmSent, 
        magoiNotifySent,
        warning: (!confirmSent || !magoiNotifySent) ? `Alguns e-mails não foram disparados via Resend (restringido pelo Resend em ambientes de teste): ${errors.join(" | ")}` : undefined
      });
    } catch (error) {
      console.error("Erro geral no endpoint de email:", error);
      res.status(500).json({ 
        error: "Erro ao processar envio de e-mails via Resend.",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/purchase-notification", async (req, res) => {
    const { orderId, payerName, payerEmail, items, total, trackingNumber } = req.body;

    if (!orderId || !payerEmail || !items || !total) {
      return res.status(400).json({ error: "Dados do pedido incompletos para envio de e-mail." });
    }

    try {
      let confirmSent = false;
      let adminNotifySent = false;
      const primaryKey = process.env.RESEND_API_KEY;
      const magoiKey = "re_5bnXBCqD_E1iTb8yDc4cCw7ZdApZemHS2";

      const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);

      const itemsHtmlList = items.map((item: any) => `
        <tr style="border-bottom: 1px solid #edf2f7;">
          <td style="padding: 12px 0; font-size: 14px; font-weight: bold; color: #1a202c;">
            ${item.name}
          </td>
          <td style="padding: 12px 0; font-size: 14px; text-align: center; color: #4a5568;">
            ${item.quantity}x
          </td>
          <td style="padding: 12px 0; font-size: 14px; text-align: center; color: #4a5568;">
            Aro ${item.selectedAro || 'Único'}
          </td>
          <td style="padding: 12px 0; font-size: 14px; text-align: right; font-weight: bold; color: #1a202c;">
            ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
          </td>
        </tr>
      `).join('');

      // Clean, premium design in deep brand blue and warm details
      const clientHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: 800; tracking-tight: -0.025em;">Muzzicycles</h1>
            <p style="font-size: 14px; color: #718096; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.05em;">Tecnologia & Sustentabilidade</p>
          </div>
          
          <div style="border-top: 4px solid #2563eb; padding-top: 25px;">
            <h2 style="color: #1a202c; font-size: 20px; font-weight: 700; margin-top: 0;">Oba! Compra Aprovada 🚲🎉</h2>
            <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">
              Olá, <strong>${payerName || 'Amigo Ciclista'}</strong>!
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">
              Seu pagamento foi confirmado com sucesso. Estamos muito felizes em ter você como parte do nosso ecossistema sustentável. Seu pedido já foi registrado e está sendo preparado com muito carinho!
            </p>
          </div>

          <div style="background-color: #f7fafc; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #edf2f7;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">
              <span style="font-size: 13px; color: #718096;"><strong>Código do Pedido:</strong></span>
              <span style="font-size: 13px; font-weight: bold; color: #1a202c;">#${orderId}</span>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #e2e8f0;">
                  <th style="text-align: left; padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #718096;">Produto</th>
                  <th style="text-align: center; padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #718096;">Qtd</th>
                  <th style="text-align: center; padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #718096;">Aro</th>
                  <th style="text-align: right; padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #718096;">Valor</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtmlList}
              </tbody>
            </table>

            <div style="margin-top: 15px; text-align: right; font-size: 16px; font-weight: bold; color: #1a202c;">
              Total Geral: <span style="color: #2563eb; font-size: 18px;">${formattedTotal}</span>
            </div>
          </div>

          ${trackingNumber ? `
          <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; border: 1px solid #bfdbfe; margin-bottom: 25px;">
            <h4 style="margin: 0 0 10px 0; color: #1e40af; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">📦 Rastreio de Entrega</h4>
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #1e3a8a; line-height: 1.5;">
              Sua entrega será processada pela transportadora Jadlog. Você pode acompanhar o status completo fazendo login no seu painel da Muzzicycles usando o código de rastreamento abaixo:
            </p>
            <div style="background: #ffffff; padding: 12px; border-radius: 8px; font-weight: bold; font-family: monospace; font-size: 16px; color: #2563eb; text-align: center; border: 1px dashed #3b82f6;">
              ${trackingNumber}
            </div>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #718096; line-height: 1.5;">
            <p>Se tiver qualquer dúvida, responda diretamente a este e-mail ou mande uma mensagem pelo formulário de contato.</p>
            <p style="margin-top: 25px; font-size: 11px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 20px;">
              Este é um e-mail de confirmação automática enviado para ${payerEmail}. Muzzicycles — Rodando o mundo com plástico reciclado.
            </p>
          </div>
        </div>
      `;

      // HTML content for Matheus notify admin email
      const adminNotifyHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #2d3748; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #10b981; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 15px; font-size: 24px; font-weight: 800;">💰 Nova Venda Aprovada!</h2>
          <p style="font-size: 15px; line-height: 1.6;">Sensacional! O sistema acaba de aprovar uma nova compra no site Muzzicycles.</p>
          
          <div style="background-color: #f7fafc; border-radius: 12px; padding: 20px; border: 1px solid #edf2f7; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14.5px;"><strong>Cliente:</strong> ${payerName || 'Não informado'}</p>
            <p style="margin: 0 0 10px 0; font-size: 14.5px;"><strong>E-mail:</strong> <a href="mailto:${payerEmail}" style="color: #2563eb; text-decoration: none;">${payerEmail}</a></p>
            <p style="margin: 0 0 10px 0; font-size: 14.5px;"><strong>Pedido ID:</strong> #${orderId}</p>
            <p style="margin: 0 0 10px 0; font-size: 14.5px;"><strong>Código de Rastreio:</strong> ${trackingNumber || 'Não gerado'}</p>
            <p style="margin: 0 0 15px 0; font-size: 14.5px;"><strong>Total da Venda:</strong> <span style="color: #10b981; font-weight: bold; font-size: 16px;">${formattedTotal}</span></p>
            
            <h4 style="margin: 15px 0 10px 0; font-size: 13px; text-transform: uppercase; color: #718096; letter-spacing: 0.05em; border-top: 1px dashed #e2e8f0; padding-top: 15px;">Itens Vendidos:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                ${items.map((item: any) => `
                  <tr>
                    <td style="padding: 6px 0; font-size: 13.5px; font-weight: bold; color: #1a202c;">${item.name} (Aro ${item.selectedAro || 'Único'})</td>
                    <td style="padding: 6px 0; font-size: 13.5px; text-align: right; color: #4a5568;">${item.quantity}x de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <p style="font-size: 13px; color: #718096; text-align: center; margin-top: 25px;">Prepare o pedido para entrega rápida via Jadlog!</p>
        </div>
      `;

      // Try primary key domain first
      let lastUsedKey = "";
      if (primaryKey) {
        try {
          const resendPrimary = new Resend(primaryKey);
          await resendPrimary.emails.send({
            from: "Muzzicycles <contato@muzzicycles.com.br>",
            to: payerEmail,
            replyTo: "contato@muzzicycles.com.br",
            subject: `Compra Confirmada! Pedido #${orderId} - Muzzicycles`,
            html: clientHtml,
          });
          confirmSent = true;
          lastUsedKey = primaryKey;
          console.log("[SERVER PURCHASE RESEND] Email de confirmação enviado ao cliente (Chave Principal).");
        } catch (errConfirmPrimary: any) {
          console.warn("[SERVER PURCHASE RESEND] Erro com chave principal, tentando chave Magoi:", errConfirmPrimary?.message || errConfirmPrimary);
        }
      }

      if (!confirmSent) {
        try {
          const resendMagoi = new Resend(magoiKey);
          await resendMagoi.emails.send({
            from: "Muzzicycles via Magoi <onboarding@resend.dev>",
            to: payerEmail,
            replyTo: "magoi.empresa@gmail.com",
            subject: `Compra Confirmada! Pedido #${orderId} - Muzzicycles`,
            html: clientHtml,
          });
          confirmSent = true;
          lastUsedKey = magoiKey;
          console.log("[SERVER PURCHASE RESEND] Email de confirmação enviado ao cliente (Chave Magoi).");
        } catch (errConfirmMagoi: any) {
          console.error("[SERVER PURCHASE RESEND] Erro com chave Magoi:", errConfirmMagoi?.message || errConfirmMagoi);
        }
      }

      // Notify Matheus Admin
      const adminEmail = "matheusmagoi26@gmail.com";
      const activeAdminKey = lastUsedKey || primaryKey || magoiKey;
      const adminFromAddress = activeAdminKey === magoiKey
        ? "Muzzicycles Vendas <onboarding@resend.dev>"
        : "Muzzicycles Vendas <contato@muzzicycles.com.br>";

      try {
        const resendClientInstance = new Resend(activeAdminKey);
        await resendClientInstance.emails.send({
          from: adminFromAddress,
          to: adminEmail,
          replyTo: payerEmail,
          subject: `✨ Nova Venda Muzzicycles! #${orderId} - ${formattedTotal}`,
          html: adminNotifyHtml,
        });
        adminNotifySent = true;
        console.log("[SERVER PURCHASE RESEND] Notificação administrativa enviada para Matheus!");
      } catch (errAdmin: any) {
        console.warn("[SERVER PURCHASE RESEND] Erro ao enviar notificação para administrador:", errAdmin?.message || errAdmin);
      }

      res.json({ success: true, clientConfirmationSent: confirmSent, adminNotificationSent: adminNotifySent });
    } catch (error) {
      console.error("Erro no endpoint de notificação de compra:", error);
      res.status(500).json({ 
        error: "Erro geral ao enviar emails de compra.",
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
      const primaryKey = process.env.RESEND_API_KEY;
      const magoiKey = "re_5bnXBCqD_E1iTb8yDc4cCw7ZdApZemHS2";
      const activeKey = primaryKey || magoiKey;

      if (!activeKey) {
        console.warn("[SERVER NEWSLETTER] Sem chave Resend configurada.");
        return res.json({ success: true, warning: "Resend api key not set" });
      }

      const resend = new Resend(activeKey);

      // Notificação para o Matheus
      await resend.emails.send({
        from: activeKey === magoiKey 
          ? "Newsletter Muzzicycles <onboarding@resend.dev>" 
          : "Newsletter Muzzicycles <contato@muzzicycles.com.br>",
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

      // 1. Get and sanitize inputs and environment variables
      const rawOriginZip = process.env.ORIGIN_ZIP_CODE || "02521100";
      const originZip = rawOriginZip.replace(/\D/g, '');
      const destZip = (destZipCode || "").replace(/\D/g, '');

      if (destZip.length !== 8) {
        return res.status(400).json({ error: "CEP de destino inválido." });
      }

      const token = (process.env.JADLOG_TOKEN || "").trim();
      const cnpj = (process.env.JADLOG_CNPJ || "43990100000115").trim().replace(/\D/g, '');
      const conta = (process.env.JADLOG_CONTA || "034099").trim();

      const inputWeight = Math.max(0.1, Number(weight) || 1);
      const inputVal = Math.max(0, Number(value) || 100);
      const w = Math.max(1, Number(width) || 15);
      const h = Math.max(1, Number(height) || 15);
      const l = Math.max(1, Number(length) || 15);
      const scaleFactor = Number(process.env.JADLOG_CUBIC_FACTOR || 6000);

      const cubicWeight = (w * h * l) / scaleFactor;
      const finalWeight = parseFloat(Math.max(inputWeight, cubicWeight).toFixed(3));
      const declaredValue = parseFloat(inputVal.toFixed(2));

      console.log(`[SHIPPING v2.3] Calculando frete de ${originZip} para ${destZip}. Peso: ${finalWeight}kg. Valor: R$${declaredValue}`);

      // Helper to query a single modality
      const queryModality = async (modalityId: number) => {
        const payload = {
          frete: [
            {
              cepori: originZip,
              cepdes: destZip,
              frap: "N",
              peso: finalWeight,
              cnpj: cnpj,
              conta: conta,
              contrato: null,
              modalidade: modalityId,
              tpentrega: "D",
              tpseguro: "N",
              vldeclarado: declaredValue,
              vlcoleta: 0
            }
          ]
        };

        const authHeader = token.toLowerCase().startsWith("bearer ") ? token : `Bearer ${token}`;

        const response = await fetch("https://www.jadlog.com.br/embarcador/api/frete/valor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader,
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const rawErr = await response.text();
          throw new Error(`HTTP ${response.status}: ${rawErr}`);
        }

        const responseData = await response.json();
        
        let freteObj: any = null;
        if (responseData && responseData.frete) {
          freteObj = Array.isArray(responseData.frete) ? responseData.frete[0] : responseData.frete;
        } else if (Array.isArray(responseData)) {
          freteObj = responseData[0];
        } else {
          freteObj = responseData;
        }

        if (!freteObj) {
          throw new Error("Resposta da Jadlog inválida ou vazia.");
        }

        if (freteObj.error || freteObj.mensagem) {
          throw new Error(freteObj.error || freteObj.mensagem || "Erro retornado pela Jadlog.");
        }

        return freteObj;
      };

      // Call modalities 3 and 4 in parallel using Promise.all
      const [resCom, resPackage] = await Promise.allSettled([
        queryModality(3), // Jadlog .Com (modality 3)
        queryModality(4)  // Jadlog .Package (modality 4)
      ]);

      // If either of the calls failed with error, log error and return HTTP 500
      if (resCom.status === "rejected") {
        console.error("[JADLOG ERROR COM]", resCom.reason);
        return res.status(500).json({ error: "Não foi possível calcular o frete." });
      }
      if (resPackage.status === "rejected") {
        console.error("[JADLOG ERROR PACKAGE]", resPackage.reason);
        return res.status(500).json({ error: "Não foi possível calcular o frete." });
      }

      const results: any[] = [];

      // Jadlog .Com (Modality 3)
      const freteCom = resCom.value;
      const vltotalCom = freteCom.vltotal !== undefined ? freteCom.vltotal : freteCom.vlrFrete;
      if (vltotalCom !== null && vltotalCom !== undefined && Number(vltotalCom) > 0) {
        const prazo = freteCom.prazo !== undefined ? Number(freteCom.prazo) : 2;
        results.push({
          type: "com",
          name: "Jadlog .Com",
          vlrFrete: Number(vltotalCom),
          prazo: prazo,
          description: `Estimativa: ${prazo} ${prazo === 1 ? 'dia útil' : 'dias úteis'}`
        });
      }

      // Jadlog .Package (Modality 4)
      const fretePackage = resPackage.value;
      const vltotalPackage = fretePackage.vltotal !== undefined ? fretePackage.vltotal : fretePackage.vlrFrete;
      if (vltotalPackage !== null && vltotalPackage !== undefined && Number(vltotalPackage) > 0) {
        const prazo = fretePackage.prazo !== undefined ? Number(fretePackage.prazo) : 5;
        results.push({
          type: "package",
          name: "Jadlog .Package",
          vlrFrete: Number(vltotalPackage),
          prazo: prazo,
          description: `Estimativa: ${prazo} ${prazo === 1 ? 'dia útil' : 'dias úteis'}`
        });
      }

      return res.json(results);

    } catch (error: any) {
      console.error("[SHIPPING ROUTE FATAL]", error);
      return res.status(500).json({ error: "Não foi possível calcular o frete." });
    }
  });

  // Servir arquivos estáticos das pastas public/images e public/pdfs de forma explícita para garantir resolução em qualquer ambiente
  app.use('/images', express.static(path.join(process.cwd(), 'public/images')));
  app.use('/pdfs', express.static(path.join(process.cwd(), 'public/pdfs')));

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
