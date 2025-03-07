"use client";
import { type FormEvent, useState } from "react";
import { ReactReader } from "react-reader";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const [location, setLocation] = useState<string | number>(0);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = (await res.json()) as { result: string; error?: string };

      if (res.ok) {
        setResponse(data.result);
      } else {
        setResponse(`Error: ${data.error && "Something went wrong"}`);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error Unknown";
      setResponse(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        ></textarea>
        <Button type="submit">{isLoading ? "Processing..." : "Submit"}</Button>
      </form>
      {response && (
        <div className="rounded border bg-gray-50 p-4">
          <h2 className="mb-2 font-bold">Response:</h2>
          <div className="whitespace-pre-wrap">{response}</div>
        </div>
      )}
    </div>
  );
}
