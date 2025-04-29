import "server-only";
import { Database } from "~/../supabase/database.types";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createSuperUserClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}
