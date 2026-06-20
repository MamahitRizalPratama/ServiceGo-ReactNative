import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fauyqifisllawjvudlrk.supabase.co';
const supabaseKey = 'sb_publishable_3W6YoE76AN3rqXAQHBBMug_rj-854XX';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);