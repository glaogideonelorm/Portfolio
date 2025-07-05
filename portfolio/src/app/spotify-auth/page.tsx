"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SpotifyAuth() {
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initiateAuth = async () => {
      try {
        const response = await fetch("/api/auth/spotify");
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setStatus("error");
          return;
        }

        if (data.url) {
          // Redirect to Spotify's authorization page
          window.location.href = data.url;
        }
      } catch (err) {
        console.error(err);
        setError("Failed to initiate Spotify authentication");
        setStatus("error");
      }
    };

    initiateAuth();
  }, []);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-red-900/20 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-xl font-bold text-red-500 mb-4">
            Authentication Error
          </h1>
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Connecting to Spotify...</p>
      </div>
    </div>
  );
}
