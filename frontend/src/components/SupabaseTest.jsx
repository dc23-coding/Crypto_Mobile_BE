import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTest() {
  useEffect(() => {
    async function testConnection() {
      // Test auth
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'testpassword'
      })
      
      // Test database
      const { data, error: dbError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)

      console.log('Auth test:', authError || 'Success')
      console.log('DB test:', dbError || data)
    }
    
    testConnection()
  }, [])

  return <div>Testing Supabase connection - check console</div>
}