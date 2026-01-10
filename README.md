# 🇮🇳 BharatKart - Celebrating India's Heritage

<div align="center">

![BharatKart Logo](https://img.shields.io/badge/BharatKart-🛒_E--Commerce-orange?style=for-the-badge&logo=shopify&logoColor=white)

**A Premium E-Commerce Platform for Authentic Indian Handicrafts & Artisan Products**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-purple?style=flat-square&logo=framer)](https://www.framer.com/motion/)

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Installation](#installation)

</div>

---

## 🌟 About The Project

**BharatKart** is a modern e-commerce platform designed to showcase and sell authentic Indian handicrafts, connecting traditional artisans with global customers. Built for the **Autonomous Hacks Finale**, this project celebrates India's rich cultural heritage through a stunning digital experience.

### 🎯 Mission
> *"Empowering Indian artisans by bringing their centuries-old crafts to the digital marketplace, preserving cultural heritage while creating sustainable livelihoods."*

---

## ✨ Features

### 🛍️ E-Commerce Functionality
- **🛒 Real-Time Cart** - Add/remove items with live updates and localStorage persistence
- **🔔 Notification System** - Real-time alerts for cart updates and order confirmations
- **💳 Checkout Flow** - Complete checkout with address form, payment options (Card, UPI, Net Banking, COD)
- **🎉 Order Confirmation** - Animated success page with confetti celebration and auto-redirect

### 🗺️ State-Wise Exploration
- **28 Indian States** - Each with unique cultural themes and authentic products
- **Dynamic State Pages** - Featuring local artisans, products, and heritage sites
- **Cultural Color Palettes** - State-specific gradients and visual themes

### 🎪 Festival Collections
- **Diwali** - Diyas, Rangoli, Torans, Gift Boxes
- **Holi** - Organic Gulal, Traditional Pichkari, Festive Kurtas
- **Durga Puja** - Clay Idols, Kantha Sarees, Dhak Replicas
- **Navratri** - Chaniya Choli, Dandiya Sticks, Bandhani Dupattas
- **Onam, Pongal, Baisakhi, Ganesh Chaturthi** and more!

### 🔍 Smart Search & Navigation
- **Autocomplete Search** - Search across states, products, artisans, and categories
- **Recent & Trending Searches** - Personalized search experience
- **Category Pages** - Textiles, Pottery, Jewelry, Crafts, Art, Home Decor

### 🎨 Premium UI/UX
- **🌙 Dark/Light Mode** - Seamless theme switching with animated toggle
- **📱 Fully Responsive** - Optimized for all devices
- **✨ Smooth Animations** - Framer Motion powered transitions
- **🎭 Cultural Aesthetics** - Indian-inspired design elements

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React Framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Beautiful icons |
| **next-themes** | Dark mode support |
| **canvas-confetti** | Celebration effects |

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/gintama1018/BHARAT-KART---AUTONOMOUS-HACKS-FINALE-PROJECT.git

# Navigate to project directory
cd BHARAT-KART---AUTONOMOUS-HACKS-FINALE-PROJECT

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
bharat-kart-e-commerce-design/
├── app/
│   ├── artisans/          # Artisan listing page
│   ├── cart/              # Shopping cart
│   ├── categories/[slug]/ # Dynamic category pages
│   ├── checkout/          # Checkout & confirmation
│   ├── festivals/[slug]/  # Festival collection pages
│   ├── states/[slug]/     # Dynamic state pages
│   └── ...
├── components/
│   ├── cultural/          # Cultural-themed components
│   ├── layout/            # Header, Footer, etc.
│   └── ui/                # Reusable UI components
├── lib/
│   ├── cart-context.tsx   # Cart state management
│   ├── notification-context.tsx  # Notification system
│   ├── states-data.ts     # All 28 state data
│   ├── festivals-data.ts  # Festival information
│   └── categories-data.ts # Product categories
└── public/
    └── images/cultural/   # State & festival images
```

---

## 🎨 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero & featured states |
| Explore | `/explore` | Browse all products & categories |
| States | `/states` | View all 28 Indian states |
| State Detail | `/states/[slug]` | State-specific products & artisans |
| Festivals | `/festivals` | All festival collections |
| Festival Shop | `/festivals/[slug]` | Festival-specific products |
| Cart | `/cart` | Shopping cart with quantity controls |
| Checkout | `/checkout` | Address & payment form |
| Order Confirmed | `/checkout/confirm` | Success animation & timeline |

---

## 🔄 User Flow

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Browse    │───▶│  Add to Cart │───▶│   Checkout  │
│ Products    │    │   + Notify   │    │  + Payment  │
└─────────────┘    └──────────────┘    └─────────────┘
                                              │
                   ┌──────────────────────────┘
                   ▼
           ┌─────────────────┐
           │  Order Confirmed │
           │   🎉 Confetti!   │
           └─────────────────┘
```

---

## 👥 Team

**Autonomous Hacks Finale Project**

---

## 📝 License

This project was created for the **Autonomous Hacks Finale** hackathon.

---

<div align="center">

### 🙏 Jai Hind! Support Indian Artisans 🇮🇳

Made with ❤️ for India's Cultural Heritage

</div>