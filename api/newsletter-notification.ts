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
  // CORS configuration
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

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório." });
  }

  try {
    const resend = getResend();

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

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Vercel newsletter notification error:", error);
    return res.status(500).json({ 
      error: "Erro do processamento na Vercel.", 
      details: error?.message || String(error) 
    });
  }
}
