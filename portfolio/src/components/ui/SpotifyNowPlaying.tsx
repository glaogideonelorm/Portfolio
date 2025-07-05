import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify");
        if (response.status === 401) {
          setError("not_authenticated");
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setTrack(data);
          setError(null);
        } else {
          // Check for specific errors
          if (data.error && data.error.includes("REFRESH_TOKEN")) {
            setError("refresh_token_missing");
          } else {
            setError(data.error || "Failed to fetch Spotify data");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to connect to Spotify");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (error === "not_authenticated" || error === "refresh_token_missing") {
    return (
      <Link href="/spotify-auth">
        <motion.div
          className="flex items-center space-x-4 bg-spotify p-4 rounded-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 bg-spotify-dark rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              {error === "refresh_token_missing"
                ? "Setup Spotify"
                : "Connect Spotify"}
            </p>
            <p className="text-xs text-gray-400">
              {error === "refresh_token_missing"
                ? "Complete authentication to enable"
                : "Share what you&apos;re listening to"}
            </p>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-400 text-sm">Spotify Error: {error}</p>
        <Link
          href="/spotify-auth"
          className="text-red-300 text-xs underline hover:no-underline"
        >
          Try reconnecting
        </Link>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">No track playing</p>
        <p className="text-gray-500 text-xs">
          Connect Spotify to see what you&apos;re listening to
        </p>
      </div>
    );
  }

  return (
    <motion.a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-4 bg-spotify-dark p-4 rounded-lg hover:bg-spotify-light transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        {track.albumImageUrl && (
          <img
            src={track.albumImageUrl}
            alt={`${track.title} album art`}
            className="w-12 h-12 rounded-md"
          />
        )}
        {track.isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{track.title}</p>
        <p className="text-xs text-gray-400 truncate">
          {track.isPlaying ? "Now playing" : "Recently played"} · {track.artist}
        </p>
      </div>
    </motion.a>
  );
}
