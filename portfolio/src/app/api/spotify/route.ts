import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
  if (!REFRESH_TOKEN) {
    throw new Error('REFRESH_TOKEN not set. Complete Spotify authentication first.');
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Token refresh failed:', errorData);
    throw new Error('Failed to refresh access token');
  }

  return response.json();
}

async function getNowPlaying(accessToken: string) {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  return response.json();
}

async function getRecentlyPlayed(accessToken: string) {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  return response.json();
}

export async function GET() {
  try {
    // Check if required environment variables are set
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error('Missing Spotify credentials');
      return NextResponse.json({ 
        error: 'Spotify credentials not configured' 
      }, { status: 500 });
    }

    if (!REFRESH_TOKEN) {
      console.error('REFRESH_TOKEN not set - user needs to authenticate');
      return NextResponse.json({ 
        error: 'REFRESH_TOKEN not set. Please authenticate with Spotify first.' 
      }, { status: 401 });
    }

    const { access_token } = await getAccessToken();
    
    // Try to get currently playing track
    const nowPlaying = await getNowPlaying(access_token);
    
    if (nowPlaying) {
      const track = {
        isPlaying: true,
        title: nowPlaying.item.name,
        artist: nowPlaying.item.artists.map((artist: { name: string }) => artist.name).join(', '),
        albumImageUrl: nowPlaying.item.album.images[0].url,
        songUrl: nowPlaying.item.external_urls.spotify,
      };
      
      return NextResponse.json(track);
    }
    
    // If no track is playing, get recently played
    const recentlyPlayed = await getRecentlyPlayed(access_token);
    
    if (recentlyPlayed && recentlyPlayed.items[0]) {
      const track = {
        isPlaying: false,
        title: recentlyPlayed.items[0].track.name,
        artist: recentlyPlayed.items[0].track.artists.map((artist: { name: string }) => artist.name).join(', '),
        albumImageUrl: recentlyPlayed.items[0].track.album.images[0].url,
        songUrl: recentlyPlayed.items[0].track.external_urls.spotify,
      };
      
      return NextResponse.json(track);
    }
    
    return NextResponse.json(null);
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    
    // Provide specific error messages based on the error
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch Spotify data';
    
    if (errorMessage.includes('REFRESH_TOKEN')) {
      return NextResponse.json({ 
        error: 'REFRESH_TOKEN not configured. Please complete Spotify authentication.' 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 });
  }
} 