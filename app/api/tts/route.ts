// app/api/tts/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge";

// Swap ELEVENLABS_VOICE_ID via env to change the voice without code changes.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // "Rachel" default

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  if (!text) {
    return new Response("Missing text", { status: 400 });
  }
  if (!process.env.ELEVENLABS_API_KEY) {
    return new Response("ELEVENLABS_API_KEY is not configured on the server.", { status: 500 });
  }

  // optimize_streaming_latency=4 + eleven_turbo_v2_5 = lowest latency ElevenLabs
  // combination available today. Audio starts streaming to the client the
  // moment the first chunk is generated, rather than waiting for the full
  // clip this is what makes playback start feel instant.
  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream?optimize_streaming_latency=4`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.4, similarity_boost: 0.8 },
      }),
    }
  );

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text();
    return new Response(errText, { status: upstream.status });
  }

  // Pipe the upstream stream straight through no buffering server-side.
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
