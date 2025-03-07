import { NextResponse, type NextRequest } from "next/server";
import { createOpenAIClient } from "~/lib/utils";

export async function POST(request: NextRequest) {
  const openai = createOpenAIClient();

  try {
    const body = (await request.json()) as { prompt: string };
    const { prompt } = body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Or your preferred model
      messages: [
        {
          role: "system",
          content:
            "summarize the paragraph and relay its relavance to the story as a whole.",
        },
        { role: "user", content: prompt },
      ],
    });

    if (completion.choices[0]) {
      return NextResponse.json({
        result: completion.choices[0].message.content,
      });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occured";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
