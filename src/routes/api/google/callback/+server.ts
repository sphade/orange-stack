import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from '$lib/server/auth/session';
import { google } from '$lib/server/auth/oauth';
import { decodeIdToken } from 'arctic';
import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { createUser, getUserFromGoogleId } from '$lib/server/auth/user';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const claims = decodeIdToken(tokens.idToken());
	console.log('🚀 ~ GET ~ claims:', claims);
	const googleUserId = claims.sub;
	const username = claims.name;
	const email = claims.email;
	const picture = claims.picture;

	// TODO: Replace this with your own DB query.
	const existingUser = await getUserFromGoogleId(googleUserId, event.locals.db);

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id, event.locals.db);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	// TODO: Replace this with your own DB query.
	const user = await createUser(googleUserId, email, username, picture, event.locals.db);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id, event.locals.db);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
