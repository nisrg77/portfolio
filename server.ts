import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client to prevent crash if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on this server. Please set it in your Secrets panel or .env file.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are a helpful, extremely professional AI Representative and Career Assistant for Nisarg Rana, a Software Engineer, AI Engineer, and Backend Specialist.
Your goal is to answer questions from recruiters, managers, and technology professionals about Nisarg's work history, skills, education, and credentials based strictly on his true resume details.
You should speak politely, warmly, and objectively. Maintain high-integrity answers.

Here are the absolute facts about Nisarg Rana you MUST follow:
- Full Name: Nisarg Rana
- Location: Ahmedabad, Gujarat, India (Open to remote roles and relocation)
- Primary Contact Email: rnnisarg7@gmail.com
- Direct Mobile/Phone: +91 7016653436
- LinkedIn URL: https://linkedin.com/in/rana-nisarg-a29b23372
- GitHub URL: https://github.com/nisrg77
- Professional Objective: Eagerly seeking full-time opportunities or projects to apply software development, API backend engineering, and AI/ML skills in real-world scalable applications.

Education & Credentials:
- Degree: Bachelor of Technology (B.Tech) in Computer Science & Engineering (2022 - 2026)
  Institution: Shri S'ad Vidya Mandal Institute Of Technology, GTU
  Updated CGPA: 7.6 / 10 
- Certification: Data Analyst Certification from DataCamp (achieved 2025)

Professional Experience:
1. Python Developer Intern | Grownited Pvt. Ltd. (Ahmedabad) [Jan 2026 – April 2026 (Updated)]
   - Architected and developed robust backend services using Python and the Django REST framework (DRF).
   - Designed and implemented clean RESTful APIs with complete CRUD functionality for frontend alignment.
   - Handled and integrated relational databases (MySQL, PostgreSQL), writing highly optimized SQL queries to accelerate data retrieval and cut server latency.
   - Promoted streamlined collaboration workflows using Git and GitHub for version control, code reviews, and visual debugging.
2. Frontend Developer Intern | LinkVerse Labs (Remote) [Jul 2025 – Aug 2025]
   - Built and maintained fully responsive, eye-pleasing, cross-browser compatible user interfaces with HTML, CSS, and modern JavaScript.
   - Engaged with cross-functional team pipelines to plan and ship intuitive user action models and interface components.
   - Spearheaded continuous code testing and debugging, elevating UI performance metrics and optimizing runtime speed.

Signature Projects Portfolio:
1. RAG-Based Document Q&A System: An end-to-end Retrieval-Augmented Generation pipeline built using LangChain and FAISS. Enables semantic similarity searches and highly precise, context-aware answers over uploaded PDF handbooks. Integrated OpenAI's GPT models, adjusting prompts to restrict hallucinations and preserve sourcing authenticity.
2. eSociety Management System: A role-based residential housing solution made with Python, Django, and PostgreSQL. Created specialized dashboards for tenants, security, and administrative clerks. Integrates complaint escalation loops, billing schedules, and visitor logging gates.
3. Sentiment Analysis with Transformers: Fine-tuned a BERT sequence classifier (Hugging Face) in PyTorch to output multi-class text sentiment analysis. Exposed via FastAPI async nodes. Surpassed traditional TF-IDF and Logistic Regression F1-scores by over 14%.
4. Customer Churn Prediction System: An in-depth telecom customer log data science project utilizing Scikit-learn, Pandas, and NumPy. Features precise exploratory analysis, data imputation, visual charts, and trained Random Forest classifiers to predict at-risk consumers.
5. Image Classification with CNN: Designed deep CNN models using TensorFlow and Keras, employing smart data augmentations and dropout strategies to eliminate training overfitting. Incorporates an OpenCV camera loader script. Achieved 93.5% accuracy.

Rules for your responses:
1. Default to a friendly, encouraging professional advocate persona representing Nisarg Rana.
2. Use formatting such as bullet points or bold tags to present technical explanations clearly.
3. ONLY quote the provided historical facts. If asked about facts not listed (e.g., favorite sports, marital status), politely decline, saying: "I do not have recorded information about that, but feel free to ask about Nisarg's software engineering credentials, AI/ML expertise, and projects."
4. If a recruiter asks about pricing, salary terms, direct scheduling, or private contact options, guide them warmly to reach out directly to Nisarg via email (rnnisarg7@gmail.com), phone (+91 7016653436), or LinkedIn.
`;

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are all required.' });
    }

    console.log(`[Contact Service Log] Received submission from: ${name} <${email}>`);

    // 1. Persist to JSON storage so submissions are always preserved
    const submissionsPath = path.join(process.cwd(), 'submissions.json');
    let submissions = [];
    
    try {
      if (fs.existsSync(submissionsPath)) {
        const fileContent = fs.readFileSync(submissionsPath, 'utf-8');
        submissions = JSON.parse(fileContent);
      }
    } catch (err) {
      console.error('Error reading submissions storage:', err);
    }

    const newSubmission = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    submissions.push(newSubmission);

    try {
      fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing submission data:', err);
    }

    // 2. Real SMTP Email delivery logic via Nodemailer
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.RECEIVER_EMAIL || 'rnnisarg7@gmail.com';

    let emailSent = false;
    let feedbackMessage = 'Thank you! Your message was received offline and logged securely.';
    let previewUrl = '';

    if (host && user && pass) {
      try {
        const portInt = parseInt(port || '465', 10);
        const transporter = nodemailer.createTransport({
          host,
          port: portInt,
          secure: portInt === 465, // true for port 465, false for other ports (e.g. 587)
          auth: {
            user,
            pass,
          },
          tls: {
            // Do not fail on invalid certificates (helpful for some custom custom domains/networks)
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: `"${name} (Portfolio Contact)" <${user}>`,
          to: receiver,
          replyTo: email, // Direct reply to sender
          subject: `📩 New Contact: ${name}`,
          text: `You have received a new contact submission from your portfolio website.\n\n` +
                `Sender Details:\n` +
                `- Name: ${name}\n` +
                `- Email: ${email}\n` +
                `- Date: ${new Date().toLocaleString()}\n\n` +
                `Message:\n` +
                `----------------------------------------\n` +
                `${message}\n` +
                `----------------------------------------\n\n` +
                `To reply to this person, simply reply directly to this mail, or mail them at: ${email}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 8px; background-color: #ffffff; color: #18181b;">
              <h2 style="color: #10b981; font-size: 20px; font-weight: 600; border-bottom: 2px solid #f4f4f5; padding-bottom: 12px; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                📩 New Portfolio Contact
              </h2>
              
              <div style="margin: 20px 0; background-color: #fafafa; padding: 16px; border-radius: 6px; border: 1px solid #f0f0f0;">
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #4b5563;">From:</strong> ${name}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #4b5563;">Email:</strong> <a href="mailto:${email}" style="color: #10b981; text-decoration: none; font-weight: 500;">${email}</a></p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #4b5563;">Received:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background-color: #fcfdfa; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #27272a;">${message}</p>
              </div>
              
              <p style="font-size: 12px; color: #71717a; margin-top: 24px; border-top: 1px solid #f4f4f5; padding-top: 12px; line-height: 1.5;">
                This message was delivered in real-time. You can hit <strong>Reply</strong> to email the sender directly at <a style="color: #10b981;" href="mailto:${email}">${email}</a>.
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        feedbackMessage = 'Thank you! Your message was received and successfully forwarded to Nisarg\'s email inbox!';
        console.log(`[Contact Service Log] Real email successfully transmitted to ${receiver}`);
      } catch (smtpError: any) {
        console.error('[Contact Service Log] SMTP transmission failure:', smtpError);
        feedbackMessage = `Message recorded locally! Real-time email delivery failed (SMTP Error: ${smtpError.message || 'connection refused'}).`;
      }
    } else {
      console.log(`[Contact Service Log] SMTP credentials not fully configured. Instantiating seamless sandbox testing environment...`);
      try {
        // Generate an on-the-fly ethereal test user account
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const mailOptions = {
          from: `"${name} (Portfolio Tester)" <${testAccount.user}>`,
          to: receiver,
          replyTo: email,
          subject: `📩 [TEST SANDBOX] Portfolio Message from ${name}`,
          text: `Hello, this is a simulated portfolio submission email.\n\nFrom: ${name} <${email}>\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; color: #0f172a;">
              <span style="font-size: 10px; font-weight: 700; background-color: #3b82f6; color: white; padding: 4px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">
                Test Sandbox Dispatch
              </span>
              <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin-top: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                📩 New Portfolio Contact
              </h2>
              
              <div style="margin: 16px 0; background-color: #ffffff; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0;">
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #64748b;">From:</strong> ${name}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #64748b;">Sender Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #64748b;">Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background-color: #ffffff; border-left: 4px solid #3b82f6; padding: 16px; margin: 16px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #1e293b;">${message}</p>
              </div>
              
              <p style="font-size: 11px; color: #64748b; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px; line-height: 1.5;">
                This simulated transmission succeeded! You can check the complete markup/layout design by clicking on the custom preview URL returned by nodemailer.
              </p>
            </div>
          `
        };

        const info = await transporter.sendMail(mailOptions);
        previewUrl = nodemailer.getTestMessageUrl(info) || '';
        emailSent = true;
        feedbackMessage = `Thank you! Your message was received! (Sandbox Mode Active: Created a temporary sandbox SMTP courier. View sent template: ${previewUrl})`;
        console.log(`[Contact Service Log] Dummy sandbox email sent successfully. Inbox URL: ${previewUrl}`);
      } catch (err: any) {
        console.error('[Contact Service Log] Sandbox initialization failure:', err);
        feedbackMessage = `Thank you! Your message was recorded offline in local log files. Custom SMTP variables can be added to the Secrets Panel anytime!`;
      }
    }

    return res.json({
      success: true,
      emailSent,
      previewUrl,
      message: feedbackMessage
    });
  } catch (error: any) {
    console.error('Contact endpoint error:', error);
    return res.status(500).json({
      error: 'Failed to process submission. Please contact Nisarg Rana directly via rnnisarg7@gmail.com.'
    });
  }
});

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const ai = getGeminiClient();

    // Map history to the structured format required by the Gemini API
    const formattedContents = [
      ...(history || []).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text || 'I apologize, but I could not formulate a response at the moment.';
    res.json({ text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while generating a response from the AI representative.',
    });
  }
});

// Setup Vite Dev server or Production static serving
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in Development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static paths served from dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to trigger bootstrap sequence:', err);
});
