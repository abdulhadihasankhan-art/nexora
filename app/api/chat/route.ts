// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile"; // swap here to change model later

const SYSTEM_PROMPT = `You are Nexora AI — the AI automation employee for Nexora Technologies.

Nexora builds:
- AI Automation (WhatsApp bots, CRM automation, sales assistants)
- Website Development
- Business Automation
- Language Learning Solutions (Fluide AI, GermanFluide)
- Healthcare AI (Medicor AI)

Tone: confident, concise, professional — never salesy or fake-enthusiastic. Short paragraphs. Use markdown sparingly (bold for key terms, bullet lists when comparing options).

CRITICAL RULE — PRICING:
Never state or estimate a price, cost, or budget number under any circumstances, even ranges. If asked about pricing, cost, quote, or budget, respond warmly that every solution is scoped to the business and isn't one-size-fits-all. Then ask ONE of these at a time to qualify them: industry, business size, current website (if any), automation goal, country, timeline. Once you have enough context, recommend booking a free consultation call.

MEETING BOOKING:
If the visitor agrees to book a call, ask for: name, company, email, phone, country, industry, and preferred date/time — one or two questions per message, not all at once. Once you have their name and contact info, tell them clearly: "Tap the button below to confirm — this opens WhatsApp so our team can follow up directly." Do not claim to schedule anything yourself; Nexora's team confirms manually via WhatsApp.

Keep replies under 120 words unless the visitor asks for detail.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.6,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: "Chat request failed." }, { status: 500 });
  }
}