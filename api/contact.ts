import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// Lazily initialize Resend
let resendClient: Resend | null = null;
function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

export default async function handler(req: any, res: any) {
  // Config CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método Não Permitido" });
  }

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
        console.log("[RESEND] Email de confirmação enviado ao cliente com sucesso (Chave Principal).");
      } catch (errConfirmPrimary: any) {
        console.warn("[RESEND] Erro ao enviar para o cliente com chave principal, tentando chave Magoi:", errConfirmPrimary?.message || errConfirmPrimary);
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
        console.log("[RESEND] Email de confirmação enviado ao cliente com sucesso (Chave Magoi).");
      } catch (errConfirmMagoi: any) {
        console.error("[RESEND] Erro ao enviar para o cliente com chave Magoi:", errConfirmMagoi?.message || errConfirmMagoi);
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
      console.warn(`[RESEND] Erro ao enviar notificação administrativa para ${adminEmail} com a chave ativa, tentando fallback...`, errAdmin1?.message || errAdmin1);
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
          console.error(`[RESEND] Erro ao enviar notificação administrativa via chave alternativa para ${adminEmail}:`, errAdmin2?.message || errAdmin2);
          errors.push(`Admin (${adminEmail} - Chave Alternativa): ${errAdmin2?.message || String(errAdmin2)}`);
        }
      }
    }

    // If absolutely both kinds of sendings failed, we throw an error
    if (!confirmSent && !magoiNotifySent) {
      return res.status(500).json({ 
        error: "Ambas as tentativas de envio falharam.",
        details: errors.join(" | ")
      });
    }

    return res.status(200).json({ success: true, confirmSent, magoiNotifySent });
  } catch (error: any) {
    console.error("Vercel api contact fatal error:", error);
    return res.status(500).json({ 
      error: "Erro interno no servidor de envio.", 
      details: error?.message || String(error) 
    });
  }
}
