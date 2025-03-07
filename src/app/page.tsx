"use client";
import { useState } from "react";
import { ReactReader } from "react-reader";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const [location, setLocation] = useState<string | number>(0);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(prompt);
      const res = await fetch("/api/v1/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.result);
      } else {
        setResponse(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
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
      <form onSubmit={handleSubmit}>
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
