# Quran Journal (V1)

Application Next.js 14 + TypeScript pour suivre la mémorisation, la révision et l'étude du Coran.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- composants style shadcn/ui (local)
- Supabase (auth + persistance)

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d'environnement
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Base de données
1. Exécuter `supabase/schema.sql` dans SQL Editor.
2. Seed des 114 sourates:
```bash
npx tsx supabase/seed.ts
```

## Pages
- `/dashboard`
- `/surahs`
- `/juz`
- `/hizb`
- `/revision`
- `/study`
- `/notes`
- `/settings`

## Notes
- Si Supabase n'est pas configuré, l'app utilise des données d'exemple locales pour une UX immédiate.
- Les calculs centraux sont dans `src/lib/utils.ts`.
