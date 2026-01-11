import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const origin = requestUrl.origin

    if (code) {
        const supabase = createClient()
        if (supabase) {
            await supabase.auth.exchangeCodeForSession(code)
        }
    }

    // Redirect to home page after successful authentication
    return NextResponse.redirect(`${origin}/`)
}
