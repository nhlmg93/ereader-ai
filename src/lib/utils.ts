import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import OpenAI from "openai";
import { env } from "~/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createOpenAiClient() {
  return new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
}
