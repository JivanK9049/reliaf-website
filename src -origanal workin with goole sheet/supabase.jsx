import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://hoxscusuuciygraszahu.supabase.co/rest/v1/";

const supabaseKey =
  "sb_publishable_shbdwZ9wN7Lg6GjZGkGMTQ_bOZnF1YU";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);