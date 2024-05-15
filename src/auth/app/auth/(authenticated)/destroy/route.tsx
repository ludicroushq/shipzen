import { getAuth, lucia } from "@/auth";
import { baseUrl } from "@/config/app";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const auth = await getAuth();

	if (auth) {
		await lucia.invalidateSession(auth.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	}

	return NextResponse.redirect(baseUrl);
}
