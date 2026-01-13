import { createClient } from "@supabase/supabase-js";

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // ❗ DO NOT throw during build
  if (!url || !anonKey) {
    // This allows Vercel build to pass
    // Real usage only happens in the browser
    console.warn("Supabase env vars missing — client not initialized yet");
    return null as any;
  }

  _supabase = createClient(url, anonKey);
  return _supabase;
}

// Backward-compatible export
export const supabase = new Proxy(
  {},
  {
    get(_, prop) {
      const client = getSupabaseClient();
      if (!client) {
        throw new Error("Supabase client not initialized");
      }
      return (client as any)[prop];
    },
  }
) as ReturnType<typeof createClient>;
