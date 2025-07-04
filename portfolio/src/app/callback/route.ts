import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL('/?spotify_error=missing_code', request.url));
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    
    // Use 127.0.0.1 instead of localhost to match what was sent to Spotify
    const url = new URL(request.url);
    const port = url.port;
    const redirectUri = `http://127.0.0.1:${port}/callback`;

    console.log('🎵 Using redirect URI for token exchange:', redirectUri);

    // Exchange code for access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Token exchange failed:', errorData);
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    
    // Store the refresh token securely - for now we'll just log it
    console.log('🎵 Spotify Refresh Token (add this to your .env.local file):');
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
    
    // Redirect back to the main page with success message
    return NextResponse.redirect(new URL('/?spotify_success=true', request.url));
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    return NextResponse.redirect(new URL('/?spotify_error=auth_failed', request.url));
  }
} 