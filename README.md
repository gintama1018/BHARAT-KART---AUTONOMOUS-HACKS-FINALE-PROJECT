<div align="center">

# 🇮🇳 BharatKart

### *Empowering India's Artisans, One Craft at a Time*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?logo=supabase)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Voice-orange?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" alt="Indian Crafts" width="600" />

**An e-commerce platform connecting traditional Indian artisans directly with global customers, featuring AI-powered voice assistance for product listings in regional languages.**

[🚀 Live Demo](#) • [📖 Documentation](#architecture) • [🎥 Demo Video](#) • [👥 Team](#team)

</div>

---

## 🎯 Problem Statement

**Theme: Open Innovation - Bridging the Digital Divide for Rural Artisans**

India has **7 million+ artisans** across 28 states, yet:
- 📉 **70%** lack access to digital marketplaces
- 📝 **60%** face language barriers with technology
- 💰 **80%** rely on middlemen, losing up to 40% of earnings
- 📱 Many are not comfortable with text-based interfaces

**BharatKart solves these challenges** by providing:
1. A multilingual platform (11 Indian languages)
2. AI-powered voice input for product listings
3. Direct artisan-to-customer marketplace
4. Cultural preservation through storytelling

---

## ✨ Key Features

### 🎙️ AI Voice Companion
```
Artisan speaks in their native language
         ↓
   Gemini AI processes audio
         ↓
   Extracts structured product data
         ↓
   Human review & edit
         ↓
   Product published
```

- **Speak, Don't Type**: Artisans describe products in Hindi, Tamil, Gujarati, Bengali, or any regional language
- **Smart Extraction**: AI extracts product name, description, materials, cultural significance
- **Human Control**: Full editing before publishing (AI assists, never auto-publishes)

### 🌍 Multi-Language Support
| Language | Native Name | Code |
|----------|-------------|------|
| English | English | en |
| Hindi | हिंदी | hi |
| Gujarati | ગુજરાતી | gu |
| Tamil | தமிழ் | ta |
| Telugu | తెలుగు | te |
| Bengali | বাংলা | bn |
| Marathi | मराठी | mr |
| Kannada | ಕನ್ನಡ | kn |
| Malayalam | മലയാളം | ml |
| Punjabi | ਪੰਜਾਬੀ | pa |
| Odia | ଓଡ଼ିଆ | or |

### 🗺️ Explore by States
Each of India's 28 states showcased with:
- Unique cultural heritage
- Featured artisans
- State-specific crafts
- Cultural stories & festivals

### 👨‍🎨 Artisan Profiles
- Complete artisan stories
- Awards & recognition
- Craft techniques
- Direct messaging
- Product catalogs

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend - Next.js 15"
        A[Landing Page] --> B[State Explorer]
        A --> C[Artisan Profiles]
        A --> D[Product Catalog]
        E[Voice Recorder] --> F[Audio Blob]
    end
    
    subgraph "Backend - API Routes"
        F --> G[/api/voice/process]
        G --> H[Gemini AI]
        H --> I[Structured JSON]
    end
    
    subgraph "Database - Supabase"
        J[(Users)]
        K[(Products)]
        L[(Artisans)]
        M[(Orders)]
    end
    
    subgraph "Auth - Supabase"
        N[Email/Password]
        O[Google OAuth]
    end
    
    I --> K
    N --> J
    O --> J
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS + Framer Motion |
| **Database** | Supabase PostgreSQL |
| **Auth** | Supabase Auth (Email + Google OAuth) |
| **AI/Voice** | Google Gemini 1.5 Flash |
| **State** | React Context API |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/gintama1018/BHARAT-KART---AUTONOMOUS-HACKS-FINALE-PROJECT.git

# Navigate to project
cd bharat-kart-e-commerce-design

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` with:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI (for voice feature)
GEMINI_API_KEY=your_gemini_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
bharat-kart-e-commerce-design/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── voice/
│   │       └── process/          # Gemini AI voice processing
│   ├── artisans/
│   │   ├── [slug]/               # Dynamic artisan pages
│   │   └── add-product/          # Voice-powered product creation
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── callback/             # OAuth callback
│   ├── cart/
│   ├── checkout/
│   ├── explore/
│   ├── orders/
│   ├── profile/
│   ├── products/[id]/
│   └── states/[slug]/
├── components/
│   ├── cultural/                 # Premium animations & effects
│   ├── layout/                   # Header, Footer
│   ├── ui/                       # Reusable UI components
│   └── voice/                    # Voice recorder component
├── lib/
│   ├── auth-context.tsx          # Authentication state
│   ├── cart-context.tsx          # Shopping cart state
│   ├── language-context.tsx      # Multi-language support
│   ├── notification-context.tsx  # Toast notifications
│   ├── supabase.ts               # Supabase client
│   ├── artisans-data.ts          # Artisan information
│   └── states-data.ts            # State information
└── public/                       # Static assets
```

---

## 🎨 UI/UX Highlights

### Design Philosophy
- **Cultural Aesthetics**: Inspired by Indian art forms - rangoli patterns, traditional colors
- **Premium Feel**: Glassmorphism, smooth animations, micro-interactions
- **Accessibility**: High contrast, readable fonts, mobile-first

### Components
- 🎭 Premium animated cursor
- 🔔 Real-time notifications
- 🛒 Persistent cart with localStorage
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design

---

## 🔒 Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ Secure authentication with Supabase
- ✅ Protected API routes
- ✅ Input validation and sanitization
- ✅ No auto-publishing (human review required)

---

## 🤖 AI Voice Feature - Deep Dive

### How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   MediaRecorder │────▶│   Audio Blob     │────▶│ API: /voice/    │
│   (Browser API) │     │   (WebM format)  │     │     process     │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Product Form   │◀────│  Structured JSON │◀────│   Gemini 1.5    │
│  (Editable)     │     │  (with confidence)│    │   Flash API     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### Gemini Prompt (Safe & Professional)
```
You are assisting an Indian artisan in creating a product listing.
Convert the spoken input into structured data.
Do not invent details. Preserve cultural terms.
Return JSON only.

Fields:
- product_name
- description  
- craft_type
- material
- state
- cultural_tags
- language_detected
```

### Why This Matters for Judges
- ❌ **Not** a chatbot
- ❌ **Not** auto-publishing
- ❌ **Not** continuous voice agent
- ✅ **Assistive** companion with human control
- ✅ **Scalable** (runs only on user action)
- ✅ **Cost-effective** (no background processing)

---

## 📊 Impact Metrics (Projected)

| Metric | Target |
|--------|--------|
| Artisans Onboarded (Year 1) | 10,000+ |
| Products Listed | 50,000+ |
| States Covered | 28 |
| Languages Supported | 11 |
| Middleman Margin Saved | 30-40% |

---

## 🛣️ Roadmap

- [x] Core e-commerce platform
- [x] State-wise exploration
- [x] Artisan profiles with products
- [x] Voice-powered product listing
- [x] Multi-language support (11 languages)
- [x] Authentication (Email + Google)
- [x] Shopping cart & checkout
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Artisan verification system
- [ ] Mobile app (React Native)
- [ ] AR product preview

---

## 👥 Team

**AUTONOMOUS HACKS FINALE 2026**

| Role | Contribution |
|------|--------------|
| Full-Stack Development | Next.js, Supabase, API Routes |
| AI Integration | Gemini Voice Processing |
| UI/UX Design | Cultural aesthetics, animations |
| Database Design | PostgreSQL, RLS policies |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Indian Artisans** - For preserving our cultural heritage
- **Supabase** - For the amazing backend-as-a-service
- **Google Gemini** - For powerful AI capabilities
- **AUTONOMOUS HACKS** - For the opportunity to build for India

---

<div align="center">

**Made with ❤️ for India's Artisans**

*"Every craft tells a story. BharatKart helps the world listen."*

🇮🇳 जय हिंद 🇮🇳

</div>