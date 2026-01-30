# GitHub ga yuklash bo'yicha qo'llanma

## 1. GitHub da repository yaratish

1. [GitHub](https://github.com) ga kiring
2. O'ng yuqori burchakda **"+"** tugmasini bosing
3. **"New repository"** ni tanlang
4. Repository nomi: `oqtosh-restaurant`
5. Description: `OQTOSH Restaurant menyu web sayti`
6. **Public** yoki **Private** tanlang
7. **Create repository** tugmasini bosing

## 2. Kodlarni GitHub ga yuklash

### A. Agar Git o'rnatilmagan bo'lsa:

**Windows:**
[https://git-scm.com/download/win](https://git-scm.com/download/win) dan yuklab oling

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### B. Git orqali yuklash:

Terminal yoki Command Prompt ni oching va quyidagi buyruqlarni bajaring:

```bash
# 1. Loyiha papkasiga o'ting
cd oqtosh-restaurant

# 2. Git ni ishga tushiring
git init

# 3. Barcha fayllarni qo'shing
git add .

# 4. Commit qiling
git commit -m "Initial commit: OQTOSH restaurant website"

# 5. GitHub repository ga ulang (sizning username va repo nomingizni kiriting)
git remote add origin https://github.com/SIZNING-USERNAME/oqtosh-restaurant.git

# 6. Asosiy branch nomini o'zgartiring (agar kerak bo'lsa)
git branch -M main

# 7. GitHub ga yuklang
git push -u origin main
```

### C. GitHub Desktop orqali (oson yo'l):

1. [GitHub Desktop](https://desktop.github.com/) ni yuklab oling
2. GitHub Desktop ni oching
3. **File > Add Local Repository** ni tanlang
4. Loyiha papkasini tanlang
5. **Publish repository** tugmasini bosing

## 3. Yangilanishlarni yuklash

Kodda o'zgarish qilganingizdan keyin:

```bash
git add .
git commit -m "O'zgarishlar tavsifi"
git push
```

## 4. Deploy qilish (Vercel)

1. [Vercel](https://vercel.com) ga kiring (GitHub bilan)
2. **New Project** tugmasini bosing
3. GitHub repository ni tanlang: `oqtosh-restaurant`
4. **Deploy** tugmasini bosing
5. 2-3 daqiqada sayt tayyor bo'ladi!

Vercel sizga shunday URL beradi: `https://oqtosh-restaurant.vercel.app`

## 5. Deploy qilish (Netlify)

1. [Netlify](https://netlify.com) ga kiring
2. **Add new site > Import an existing project**
3. GitHub ni tanlang va repository ni ulang
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy** tugmasini bosing

## 6. Environment Variables (Vercel/Netlify)

Deploy qilgandan keyin, environment variables ni qo'shing:

**Vercel:**
1. Project Settings > Environment Variables
2. Quyidagilarni qo'shing:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Netlify:**
1. Site settings > Environment variables
2. Yuqoridagi o'zgaruvchilarni qo'shing

## 7. Custom Domain (ixtiyoriy)

Agar o'z domeningiz bo'lsa (masalan: `oqtosh.uz`):

**Vercel:**
1. Project Settings > Domains
2. Domeningizni qo'shing
3. DNS sozlamalarini o'zgartiring

**Netlify:**
1. Domain settings > Add custom domain
2. DNS sozlamalarini yangilang

## Muammo yuzaga kelsa:

- Git xatolari: `git status` bilan holatni tekshiring
- Push muammosi: `git pull origin main` bajaring, keyin `git push`
- Deploy xatolari: Build logs ni tekshiring

---

**Omad! 🚀**
