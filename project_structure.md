# 📁 knowsamvidhan - Project Structure

*Generated on: 4/30/2026, 2:27:08 PM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 86 |
| 📁 Total Folders | 66 |
| 🌳 Max Depth | 5 levels |
| 🛠️ Tech Stack | React, Next.js, TypeScript, CSS, Node.js |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔵 🔍 **eslint.config.mjs** - ESLint config
- 🟡 ▲ **next.config.ts** - Next.js config
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🔴 📖 **README.md** - Project documentation
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- ⚛️ **.tsx** (React TypeScript files): 32 files (37.2%)
- 🔷 **.ts** (TypeScript files): 27 files (31.4%)
- 📄 **.sql** (Other files): 5 files (5.8%)
- 🎨 **.svg** (SVG images): 5 files (5.8%)
- 📖 **.md** (Markdown files): 3 files (3.5%)
- ⚙️ **.json** (JSON files): 3 files (3.5%)
- 🖼️ **.png** (PNG images): 3 files (3.5%)
- 📄 **.mjs** (Other files): 2 files (2.3%)
- 🚫 **.gitignore** (Git ignore): 1 files (1.2%)
- 🖼️ **.ico** (Icon files): 1 files (1.2%)
- 🎨 **.css** (Stylesheets): 1 files (1.2%)
- 📄 **.** (Other files): 1 files (1.2%)
- ⚙️ **.toml** (TOML files): 1 files (1.2%)
- 📄 **.prisma** (Other files): 1 files (1.2%)

### By Category

- **React**: 32 files (37.2%)
- **TypeScript**: 27 files (31.4%)
- **Assets**: 9 files (10.5%)
- **Other**: 9 files (10.5%)
- **Config**: 4 files (4.7%)
- **Docs**: 3 files (3.5%)
- **DevOps**: 1 files (1.2%)
- **Styles**: 1 files (1.2%)

### 📁 Largest Directories

- **root**: 86 files
- **app**: 54 files
- **app\api**: 23 files
- **app\api\admin**: 20 files
- **app\(admin)**: 16 files

## 🌳 Directory Structure

```
knowsamvidhan/
├── 🟡 🚫 **.gitignore**
├── 📖 AGENTS.md
├── 🚀 app/
│   ├── 📂 (admin)/
│   │   ├── 📂 activity-logs/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 ad-dashboard/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 admin-xyz/
│   │   │   ├── 📂 forgot-password/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── ⚛️ page.tsx
│   │   │   └── 📂 verify-otp/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 alerts/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 amendments/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 analytics/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 articles/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 clauses/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 parts/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 preamble/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 quizzes/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 schedules/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 settings/
│   │   │   └── ⚛️ page.tsx
│   │   └── 📂 users/
│   │   │   └── ⚛️ page.tsx
│   ├── 📂 (user)/
│   │   ├── ⚛️ layout.tsx
│   │   ├── 📂 logout/
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ page.tsx
│   │   ├── 📂 signup/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 user_amendments/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 user_articles/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 user_login/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 user_parts/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 user_preamble/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 user_quiz/
│   │   │   └── ⚛️ page.tsx
│   │   └── 📂 user_schedules/
│   │   │   └── ⚛️ page.tsx
│   ├── 🔌 api/
│   │   ├── 📂 admin/
│   │   │   ├── 📂 amendments/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 articles/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 clauses/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 forgot-password/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 login/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 logout/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 parts/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 preamble/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 quizzes/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 reset-password/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 schedules/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 send-otp/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 users/
│   │   │   │   └── 🔷 route.ts
│   │   │   └── 📂 verify-otp/
│   │   │   │   └── 🔷 route.ts
│   │   └── 📂 auth/
│   │   │   ├── 📂 login/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 logout/
│   │   │   │   └── 🔷 route.ts
│   │   │   └── 📂 register/
│   │   │   │   └── 🔷 route.ts
│   ├── 🖼️ favicon.ico
│   ├── 🎨 globals.css
│   ├── ⚛️ layout.tsx
│   └── 📂 reset-password/
│   │   └── ⚛️ page.tsx
├── 📖 CLAUDE.md
├── 🧩 components/
│   ├── ⚛️ ConstitutionHero.tsx
│   ├── ⚛️ Footer.tsx
│   └── ⚛️ Navbar.tsx
├── 🔵 🔍 **eslint.config.mjs**
├── 📚 lib/
│   └── 🔷 prisma.ts
├── 📄 LICENSE
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🟡 🔒 **package-lock.json**
├── 🔴 📦 **package.json**
├── 📄 postcss.config.mjs
├── 📂 prisma/
│   ├── 📂 migrations/
│   │   ├── 📂 20260428094838_init/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20260428101337_add_schedule_model/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20260428104217_add_amendment_model/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20260429055747_add_quiz_models/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20260429175327_init/
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   └── 📄 schema.prisma
├── 🔷 proxy.ts
├── 🌐 public/
│   ├── 🎨 file.svg
│   ├── 🎨 globe.svg
│   ├── 📂 image/
│   │   ├── 🖼️ ashoka.png
│   │   ├── 🖼️ book.png
│   │   └── 🖼️ logo.png
│   ├── 🎨 next.svg
│   ├── 🎨 vercel.svg
│   └── 🎨 window.svg
├── 🔴 📖 **README.md**
└── 🟡 🔷 **tsconfig.json**
```

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- 📖 Docs: Markdown files
- ⚛️ React: React TypeScript files
- 🔷 TypeScript: TypeScript files
- 🖼️ Assets: Icon files
- 🎨 Styles: Stylesheets
- 📄 Other: Other files
- ⚙️ Config: JSON files
- ⚙️ Config: TOML files
- 🎨 Assets: SVG images
- 🖼️ Assets: PNG images

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
