# 📖 Quran Memorization Tracker

> **Personal Project** — A full-stack web application to track Quran memorization, revision schedules, and study notes.

---

## ✨ Features

- 📊 **Dashboard** — Overview of memorization progress and weekly revision stats
- 📋 **Surahs** — Track memorization status for all 114 surahs
- 🔁 **Revision** — Schedule and log revision sessions
- 📚 **Juz & Hizb** — Progress organized by Juz and Hizb divisions
- 📝 **Notes** — Personal study notes per surah
- ⚙️ **Settings** — User preferences and account management
- 🔐 **Authentication** — Secure login via Supabase Auth

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Supabase](https://supabase.com/) | Database & Authentication |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI components |
| [Zod](https://zod.dev/) | Schema validation |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Supabase](https://supabase.com/) account (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aissouss/quran-memorization-tracker.git
cd quran-memorization-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database Setup

1. Go to your Supabase project → **SQL Editor**
2. Run the contents of `supabase/schema.sql`
3. Seed the 114 surahs:

```bash
npx tsx supabase/seed.ts
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** If Supabase is not configured, the app falls back to local sample data so you can explore the UI immediately.

---

## 📁 Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
│   ├── dashboard/
│   ├── layout/
│   ├── surahs/
│   └── ui/
└── lib/          # Utilities and Supabase queries
supabase/
├── schema.sql    # Database schema
└── seed.ts       # Surah seed data
```

---

## 🧑‍💻 Author

**Aissouss** — L3 Software Engineering Student  
[GitHub](https://github.com/aissouss)

---

## 📄 License

This project is for personal and educational use.
