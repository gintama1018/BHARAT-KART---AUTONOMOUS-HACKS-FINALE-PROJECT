import { createBrowserClient } from '@supabase/ssr'

// Supabase configuration - hardcoded temporarily for testing
const SUPABASE_URL = 'https://dxshuprwpggyuacejlwb.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4c2h1cHJ3cGdneXVhY2VqbHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzYxNzgsImV4cCI6MjA4MzY1MjE3OH0.2K3WRU71pwHzZcIKqmy7fbOzwqXf-SmukiuGWQtyTvs'

// Create a Supabase client for browser usage
export function createClient() {
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

// Types for our database
export interface Profile {
    id: string
    full_name: string | null
    phone: string | null
    avatar_url: string | null
    created_at: string
}

export interface Address {
    id: string
    user_id: string
    full_name: string
    phone: string
    email: string
    address: string
    city: string
    pin_code: string
    is_default: boolean
    created_at: string
}

export interface Order {
    id: string
    user_id: string
    order_number: string
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
    subtotal: number
    shipping: number
    tax: number
    total: number
    address_id: string
    payment_method: string
    created_at: string
    items?: OrderItem[]
}

export interface OrderItem {
    id: string
    order_id: string
    product_name: string
    product_image: string
    artisan: string
    state: string
    price: number
    quantity: number
}
