import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Inilah yang akan menggabungkan URL dan Key secara otomatis
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
