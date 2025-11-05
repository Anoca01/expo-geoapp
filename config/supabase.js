import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fqpqrawrewycmkhgmssb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcHFyYXdyZXd5Y21raGdtc3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjkyMzMsImV4cCI6MjA3Nzg0NTIzM30.Vy2HzrUCibJfYCNUYpSA5mwhNi4nw3TatnLv3uGtILE'

export const supabase = createClient(supabaseUrl, supabaseKey)