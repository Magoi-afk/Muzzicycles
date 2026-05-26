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
    let notifySent = false;
    let magoiNotifySent = false;
    let errors: string[] = [];

    // 1) Envio principal do Resend da Muzzicycles (opcional, se a chave de ambiente existir)
    const primaryKey = process.env.RESEND_API_KEY;
    if (primaryKey) {
      try {
        const resend = new Resend(primaryKey);

        // 1.1) Email de confirmação para o usuário
        try {
          await resend.emails.send({
            from: "Muzzicycles <contato@muzzicycles.com.br>",
            to: email,
            replyTo: "contato@muzzicycles.com.br",
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
          confirmSent = true;
        } catch (errConfirm: any) {
          const errMsg = errConfirm?.message || String(errConfirm);
          console.error("Vercel confirm email sandbox error:", errMsg);
          errors.push(`Confirmação: ${errMsg}`);
        }

        // 1.2) Email de notificação para a Muzzicycles
        try {
          await resend.emails.send({
            from: "Muzzicycles <contato@muzzicycles.com.br>",
            to: "muzzicycles@muzzicycles.com.br",
            replyTo: email,
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
          notifySent = true;
        } catch (errNotify: any) {
          const errMsg = errNotify?.message || String(errNotify);
          console.error("Vercel notification email error:", errMsg);
          errors.push(`Notificação: ${errMsg}`);
        }
      } catch (errPrimaryClient) {
        console.error("Erro no processamento do Resend primário:", errPrimaryClient);
        errors.push(`Erro Resend Primário: ${errPrimaryClient instanceof Error ? errPrimaryClient.message : String(errPrimaryClient)}`);
      }
    } else {
      console.warn("RESEND_API_KEY não configurada no ambiente. Pulando envio principal.");
      errors.push("RESEND_API_KEY principal ausente.");
    }

    // 2) Envio do aviso dedicado Magoi usando a chave fornecida pelo usuário
    try {
      const magoiResend = new Resend("re_5bnXBCqD_E1iTb8yDc4cCw7ZdApZemHS2");
      await magoiResend.emails.send({
        from: "Muzzicycles Notificação <onboarding@resend.dev>",
        to: "magoi.empresa@gmail.com",
        replyTo: email,
        subject: `Aviso de Contato: ${subject}`,
        html: `
          <div style="font-family: sans-serif; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
            <h2 style="color: #2563eb; margin-top: 0;">Novo contato recebido pelo site!</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <p style="margin-bottom: 5px;"><strong>Mensagem:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; font-style: italic;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 11px; color: #999; margin: 0;">Este aviso foi disparado usando a chave dedicada da Magoi Empresa.</p>
          </div>
        `,
      });
      magoiNotifySent = true;
    } catch (errMagoi: any) {
      const errMsg = errMagoi?.message || String(errMagoi);
      console.error("Erro ao enviar email de notificação dedicado com chave Magoi (Vercel API):", errMsg);
      errors.push(`Notificação Magoi: ${errMsg}`);
    }

    // Se todas as tentativas de envio falharam
    if (!confirmSent && !notifySent && !magoiNotifySent) {
      return res.status(500).json({ 
        error: "Erro parcial ou total ao enviar e-mails via Resend.",
        details: errors.join(" | ")
      });
    }

    return res.status(200).json({ success: true, confirmSent, notifySent, magoiNotifySent });
  } catch (error: any) {
    console.error("Vercel api contact fatal error:", error);
    return res.status(500).json({ 
      error: "Erro interno no servidor de envio.", 
      details: error?.message || String(error) 
    });
  }
}
