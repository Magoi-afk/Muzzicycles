import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
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
