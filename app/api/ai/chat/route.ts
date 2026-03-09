import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatContext = {
  path?: string;
};

const platformContext = `
Brand: Aidquarters
Mission: Recruit trusted household staff including housekeepers, drivers, and nannies.
Core user flows:
- Sign up and login
- Dashboard onboarding
- Verification journey: document match (NIN), ID match, face match
- Vetting payment flow
- Profile and account support
Common user needs:
- Finding and hiring trusted staff
- Understanding verification steps and requirements
- Payment guidance and troubleshooting
- Profile updates and account access issues
Tone guidelines:
- Speak plainly and confidently, avoid jargon
- Offer step-by-step guidance
- Ask one clarifying question when required
Assistant rules:
- Be concise, practical, and friendly.
- Prefer platform-specific guidance over generic advice.
- If unsure about an internal policy, say you are not certain and direct user to support.
- Do not invent fees, timelines, legal guarantees, or hiring outcomes.
- Keep user data private; never request passwords, OTPs, or full card details.
Contact rules:
- Do not answer questions about non-recruitment platform topics.
- If user requests support for a different service, politely redirect to that service's support.
- use support@aidquarters.com as a primary contact email for any inquiries.
`;

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI key is not configured" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const message = String(body?.message || "").trim();
    const context: ChatContext = body?.context || {};
    const history = Array.isArray(body?.history)
      ? (body.history as ChatMessage[])
          .filter(
            (m) =>
              m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string",
          )
          .slice(-10)
      : [];
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are Aidquarters AI assistant. Help users with recruitment platform questions, onboarding, verification, payments, and account support in a concise friendly tone.",
        },
        {
          role: "system",
          content: platformContext,
        },
        {
          role: "system",
          content: `Current page: ${context?.path || "unknown"}`,
        },
        ...history,
        { role: "user", content: message },
      ],
      max_output_tokens: 350,
    });

    const reply = String(response.output_text || "").trim();
    return NextResponse.json({
      reply: reply || "I could not generate a response right now.",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unable to process request" },
      { status: 500 },
    );
  }
}
