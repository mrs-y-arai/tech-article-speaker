import { NextRequest } from "next/server";
import { updateSession } from "./utils/middleware/supabase";

export async function middleware(request: NextRequest) {
  const sessionResponse = await updateSession(request);
  return sessionResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/bookmarks/summarize (summarize API endpoint)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/bookmarks/summarize|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
