# Quran Journal (V1 terminée)

Application web complète de suivi de mémorisation du Coran (dashboard, surahs, révision, juz/hizb, étude, notes) avec persistance locale + Supabase optionnel.

## Fonctionnalités livrées
- Surah Tracker complet (114 sourates, édition statut/ayah, calcul auto progression + restant, recherche, filtres, tri, vue tableau + cartes).
- Dashboard fiable (catégories exclusives, % mémorisé basé sur **6236 ayahs**, % restant, révision hebdomadaire).
- Révision opérationnelle (date dernière révision, marquage rapide, à réviser auto, % hebdo auto).
- Juz/Hizb avec progression calculée selon ayahs mémorisés des sourates associées.
- Étude & Notes éditables et attachées à une sourate.
- Persistance locale immédiate (localStorage) et lecture/écriture Supabase si configuré + user authentifié.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- UI primitives style shadcn/ui
- Supabase JS

## Installation
```bash
npm install
cp .env.example .env.local
npm run dev
```
Puis ouvrir: `http://localhost:3000/dashboard`

## Variables d'environnement
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Supabase (optionnel mais recommandé)
1. Exécuter `supabase/schema.sql` dans SQL Editor.
2. Seed des 114 sourates:
```bash
npx tsx supabase/seed.ts
```
3. Activer Auth Email OTP côté Supabase pour la persistance par utilisateur.

## Commandes utiles
```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```
