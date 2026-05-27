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
    // 1. Inputs, configuration & Sanitization
    const { destZipCode, weight, value, width, height, length } = req.body;
    
    const token = (process.env.JADLOG_TOKEN || "").trim();
    const cnpj = (process.env.JADLOG_CNPJ || process.env.JADLOG_CLIENT_CODE || "").trim();
    const conta = (process.env.JADLOG_ACCOUNT || "").trim();
    const contratoVal = (process.env.JADLOG_CONTRACT || "").trim();
    const originZip = (process.env.ORIGIN_ZIP_CODE || "01001000").replace(/\D/g, '');
    
    const scaleFactor = Number(process.env.JADLOG_CUBIC_FACTOR || 6000);
    const fallbackEnabled = process.env.ENABLE_SHIPPING_FALLBACK === "true";
    const authUseBearer = process.env.JADLOG_AUTH_USE_BEARER !== "false";

    console.log(`[SHIPPING] Iniciando cálculo de frete para CEP ${destZipCode}. Peso real enviado: ${weight}kg.`);

    try {
      // 2. CEP and Dimensions Validations
      if (!destZipCode || typeof destZipCode !== 'string') {
        throw new Error("CEP de destino não informado ou inválido.");
      }
      
      const cleanDestZip = destZipCode.replace(/\D/g, '');
      if (cleanDestZip.length !== 8) {
        throw new Error(`CEP de destino deve ter exatamente 8 dígitos numéricos. Recebido: "${cleanDestZip}"`);
      }

      if (originZip.length !== 8) {
        throw new Error(`CEP de origem configurado (${originZip}) é inválido.`);
      }

      const inputWeight = Math.max(0.1, Number(weight) || 1);
      const inputVal = Math.max(0, Number(value) || 100);
      const w = Math.max(1, Number(width) || 15);
      const h = Math.max(1, Number(height) || 15);
      const l = Math.max(1, Number(length) || 15);

      // 3. Cubic weight calculation
      const cubicWeight = (w * h * l) / scaleFactor;
      const finalWeight = Math.max(inputWeight, cubicWeight);

      console.log(`[SHIPPING] Densidade e Volume - Dimensões: ${w}x${h}x${l} cm. Peso Cubado: ${cubicWeight.toFixed(3)}kg (fator: ${scaleFactor}). Peso final adotado: ${finalWeight.toFixed(3)}kg`);

      // 4. Modalidades setup (Read custom list from environment or use standard defaults)
      let modalitiesToQuery: { id: number; type: "express" | "standard"; name: string }[] = [];
      const envModalidadeStr = (process.env.JADLOG_MODALIDADE || "").trim();

      if (envModalidadeStr) {
        // Parse list of modalities, e.g. "40,3"
        const parsedModalities = envModalidadeStr.split(',').map(m => parseInt(m.trim())).filter(m => !isNaN(m));
        if (parsedModalities.length > 0) {
          modalitiesToQuery = parsedModalities.map((m, idx) => ({
            id: m,
            type: idx === 0 ? "express" : "standard",
            name: m === 40 ? "Jadlog .Package" : m === 3 ? "Jadlog .Com" : `Jadlog Modalidade ${m}`
          }));
        }
      }

      if (modalitiesToQuery.length === 0) {
        const modalExp = parseInt(process.env.JADLOG_MODALIDADE_EXPRESS || "40");
        const modalStd = parseInt(process.env.JADLOG_MODALIDADE_STANDARD || "3");
        modalitiesToQuery = [
          { id: isNaN(modalExp) ? 40 : modalExp, type: "express", name: "Jadlog .Package" },
          { id: isNaN(modalStd) ? 3 : modalStd, type: "standard", name: "Jadlog .Com" }
        ];
      }

      // Convert contract to numeric/null/string safely
      const parsedContract = contratoVal ? (isNaN(Number(contratoVal)) ? contratoVal : Number(contratoVal)) : null;

      // 5. Build query wrapper
      const queryJadlog = async (modalidade: number, serviceName: string) => {
        if (!token) {
          throw new Error("JADLOG_TOKEN de autenticação não está configurado nas variáveis de ambiente.");
        }

        const endpoint = "https://www.jadlog.com.br/embarcador/api/frete/valor";
        const requestPayload = {
          frete: [
            {
              cepori: originZip,
              cepdes: cleanDestZip,
              frap: "N",
              peso: parseFloat(finalWeight.toFixed(3)),
              cnpj: cnpj || "",
              conta: conta || "",
              contrato: parsedContract,
              modalidade: modalidade,
              tpentrega: "D",
              tpseguro: "N",
              vldeclarado: parseFloat(inputVal.toFixed(2)),
              vlcoleta: 0
            }
          ]
        };

        // Obfuscate / Sanitize token and CNPJ for secure logs
        const sanitizedPayload = {
          ...requestPayload,
          frete: requestPayload.frete.map(f => ({
            ...f,
            cnpj: f.cnpj ? `${f.cnpj.substring(0, 4)}***` : "",
            conta: f.conta ? `${f.conta.substring(0, 2)}***` : ""
          }))
        };

        console.log(`[JADLOG CALL] Endpoint: POST ${endpoint}`);
        console.log(`[JADLOG CALL] Payload Sanitizado:`, JSON.stringify(sanitizedPayload, null, 2));

        let authHeader = token;
        if (authUseBearer && !authHeader.toLowerCase().startsWith("bearer ")) {
          authHeader = `Bearer ${authHeader}`;
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(requestPayload)
        });

        console.log(`[JADLOG RESPONSE] Chamada finalizada com código HTTP ${response.status}`);

        if (!response.ok) {
          const rawErr = await response.text();
          console.error(`[JADLOG ERROR] Detalhe do erro (HTTP ${response.status}):`, rawErr);
          throw new Error(`Erro API Jadlog (Mod: ${modalidade}, HTTP ${response.status}): ${rawErr}`);
        }

        const data = await response.json();
        console.log(`[JADLOG RESPONSE] Retorno da simulação (Mod: ${modalidade}):`, JSON.stringify(data, null, 2));
        return data;
      };

      // 6. Execute calling for selected modalities
      const finalResults: any[] = [];
      const errorLog: string[] = [];

      for (const mod of modalitiesToQuery) {
        try {
          const responseData = await queryJadlog(mod.id, mod.name);
          
          let freteObj: any = null;
          if (responseData && responseData.frete) {
            freteObj = Array.isArray(responseData.frete) ? responseData.frete[0] : responseData.frete;
          } else if (Array.isArray(responseData)) {
            freteObj = responseData[0];
          } else {
            freteObj = responseData;
          }

          if (freteObj) {
            // Check for explicit error messages returned in 200 OK from Jadlog
            if (freteObj.error || freteObj.mensagem) {
              const errMsg = freteObj.error || freteObj.mensagem;
              console.warn(`[JADLOG PARTIAL ERROR] A simulação para modalidade ${mod.id} retornou um aviso de erro:`, errMsg);
              errorLog.push(`Modalidade ${mod.id} - ${errMsg}`);
              continue;
            }

            const calculatedPrice = freteObj.vltotal !== undefined ? Number(freteObj.vltotal) : (freteObj.vlrFrete !== undefined ? Number(freteObj.vlrFrete) : null);
            const rawPrazoValue = freteObj.prazo;
            const calculatedPrazo = rawPrazoValue !== undefined ? Number(rawPrazoValue) : null;

            if (calculatedPrice !== null) {
              finalResults.push({
                type: mod.type,
                carrier: "Jadlog",
                service: mod.id === 40 ? "Jadlog .Package" : mod.id === 3 ? "Jadlog .Com" : mod.name,
                price: calculatedPrice,
                vlrFrete: calculatedPrice, // Mantém compatibilidade total com o frontend
                deliveryDays: calculatedPrazo || 5,
                prazo: calculatedPrazo || 5, // Mantém compatibilidade total com o frontend
                raw: freteObj
              });
            } else {
              errorLog.push(`Modalidade ${mod.id} - preço 'vltotal' não encontrado no JSON.`);
            }
          }
        } catch (subErr: any) {
          console.error(`[JADLOG ERROR] Falha na simulação individual para modalidade ${mod.id}:`, subErr.message || subErr);
          errorLog.push(`Modalidade ${mod.id} - ${subErr.message || String(subErr)}`);
        }
      }

      // 7. Fallback logic (Only if enabled AND no real results could be obtained)
      if (finalResults.length === 0) {
        const errorContextMsg = errorLog.join("; ");
        console.error(`[SHIPPING ERROR] Falha completa ao contatar a API da Jadlog:`, errorContextMsg);

        if (fallbackEnabled) {
          console.warn("[SHIPPING FALLBACK] Usando fallback adaptativo porque 'ENABLE_SHIPPING_FALLBACK=true'.");
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

          // Peso afeta linearmente o custo de frete do simulador fallback
          const weightFactor = Math.ceil(finalWeight / 16);
          const results = [
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
          return res.json(results);
        } else {
          // Failure handling on production when fallback is off
          return res.status(502).json({
            error: "Não foi possível obter cotação de frete oficial da Jadlog.",
            details: errorContextMsg || "Nenhuma modalidade configurada pôde ser simulada com sucesso."
          });
        }
      }

      // Succesfully return the resolved array
      return res.json(finalResults);

    } catch (error: any) {
      console.error("[SHIPPING ERROR FATAL] Erro crítico ao processar cálculo de frete:", error);
      return res.status(500).json({
        error: "Erro inesperado ao simular frete.",
        details: error.message || String(error)
      });
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
