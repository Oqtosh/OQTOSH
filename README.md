# 🍽️ OQTOSH Restaurant - Menyu Web Sayti

Qashqadaryo milliy taomlari bo'yicha zamonaviy restorant menyu sayti.

![OQTOSH Restaurant](https://via.placeholder.com/1200x400/0a0a0a/d4af37?text=OQTOSH+RESTAURANT)

## ✨ Xususiyatlar

- 🎨 **Zamonaviy dizayn** - Yashil-oltin ranglar va professional interfeys
- 📱 **Responsive** - Barcha qurilmalarda ishlaydi (mobil, planshet, desktop)
- ⚡ **Tez va samarali** - React + Vite + Tailwind CSS
- 🔐 **Admin panel** - Menyuni oson tahrirlash
- 💾 **Ma'lumotlar bazasi** - Supabase backend
- 🖼️ **Rasm yuklash** - Har bir taom uchun rasm
- 📂 **9 ta kategoriya** - Salatlar, Suyuq taomlar, Quyuq taomlar va boshqalar

## 🚀 O'rnatish

### 1. Repository ni clone qiling

```bash
git clone https://github.com/sizning-username/oqtosh-restaurant.git
cd oqtosh-restaurant
```

### 2. Dependencies ni o'rnating

```bash
npm install
# yoki
pnpm install
```

### 3. Supabase sozlamalari

1. [Supabase](https://supabase.com) da account yarating
2. Yangi project yarating
3. `/utils/supabase/info.tsx` faylida ma'lumotlarni to'ldiring:

```typescript
export const projectId = "sizning-project-id";
export const publicAnonKey = "sizning-public-anon-key";
```

### 4. Development serverni ishga tushiring

```bash
npm run dev
# yoki
pnpm run dev
```

Sayt `http://localhost:5173` da ochiladi.

## 🛠️ Texnologiyalar

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI, Lucide Icons
- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **Build Tool:** Vite
- **Notifications:** Sonner

## 📋 Admin Panel

### Kirish:
1. Edit (✏️) tugmasini **1 soniya** bosib turing
2. Parol kiriting: `superadmin`
3. Admin rejimi yoqiladi

### Imkoniyatlar:
- ✍️ Taom nomini tahrirlash
- 📝 Taom tarkibini o'zgartirish
- 💰 Narxni yangilash
- 📷 Rasm yuklash
- ➕ Yangi taom qo'shish
- 🗑️ Taomni o'chirish
- ✅ Barcha o'zgarishlarni saqlash

## 📁 Loyiha strukturasi

```
oqtosh-restaurant/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Asosiy komponent
│   │   └── components/          # UI komponentlar
│   ├── styles/                  # CSS fayllar
│   └── imports/                 # Logo va rasmlar
├── supabase/
│   └── functions/
│       └── server/
│           └── index.tsx        # Backend API
├── package.json
└── vite.config.ts
```

## 🌐 Deploy qilish

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# dist/ papkasini Netlify ga yuklang
```

### Supabase Edge Functions deploy

```bash
supabase functions deploy server
```

## 🔒 Xavfsizlik

- Admin parolni o'zgartirish tavsiya etiladi
- `.env` faylidagi ma'lumotlarni hech qachon GitHub ga yuklmang
- Supabase keys ni himoyalang

## 📞 Aloqa

- **Manzil:** Yakkabog' tumani, Oqtosh MFY
- **Telefon:** +998 90 444 17 71

## 📄 Litsenziya

MIT License - O'zingizning loyihalaringizda erkin foydalaning!

---

**Made with ❤️ by OQTOSH Restaurant Team**
