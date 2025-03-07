import { NextResponse, type NextRequest } from "next/server";
import { createOpenAIClient } from "~/lib/utils";

export async function POST(request: NextRequest) {
  const openai = createOpenAIClient();

  try {
    const body = await request.json();
    const { prompt } = body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Or your preferred model
      messages: [
        { role: "system", content: "summarize the paragraph and relay its relavance to the story as a whole." },
        { role: "user", content: prompt },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0]!.message.content,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
