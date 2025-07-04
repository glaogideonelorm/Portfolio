import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    
    // Use 127.0.0.1 instead of localhost as per Spotify's new requirements
    const url = new URL(request.url);
    const port = url.port; // This will be 3001 from the request
    const redirectUri = `http://127.0.0.1:${port}/callback`;
    
    const scope = 'user-read-currently-playing user-read-recently-played';
    
    // Generate a random state value for security
    const state = Math.random().toString(36).substring(7);
    
    const params = new URLSearchParams({
      client_id: clientId!,
      response_type: 'code',
      redirect_uri: redirectUri,
      state,
      scope,
      show_dialog: 'true' // Force showing the Spotify login dialog
    });

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    
    console.log('🎵 Spotify Auth URL:', authUrl);
    console.log('🎵 Redirect URI:', redirectUri);
    
    // Instead of redirecting, return the URL
    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate auth URL' }, { status: 500 });
  }
} 