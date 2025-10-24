# 🚀 START HERE - Bot WhatsApp KUA dengan AI

Panduan super cepat untuk memulai!

---

## 🎯 Apa yang Sudah Dibuat?

**Bot WhatsApp HYBRID (FAQ + AI) untuk layanan KUA** ✅

Fitur:
- ✅ Auto-reply 24/7
- ✅ Menu interaktif (1-6)
- ✅ Database FAQ lengkap info KUA
- ✅ Google Gemini Pro AI integration
- ✅ Hybrid mode (FAQ cepat + AI pintar)
- ✅ Natural language understanding
- ✅ Nomor bot: **083879305916**

---

## ⚡ Quick Start (5 Menit)

### Step 1: Install
```bash
cd /home/atho/botwa
npm install
```

⏳ **Note:** First install butuh 2-5 menit (download Chromium ~150MB)

### Step 2: Setup AI (Optional)
```bash
# Buat file .env
nano .env

# Isi dengan:
GEMINI_API_KEY=your_api_key_here
BOT_MODE=hybrid
AI_MODEL=gemini-pro
```

Dapatkan API key: https://aistudio.google.com/app/apikey

### Step 3: Run Bot
```bash
npm start
```

### Step 4: Scan QR Code
- Buka WhatsApp **083879305916**
- Linked Devices → Link a Device
- Scan QR code di terminal

### Step 5: Test! 🎉
Kirim dari HP lain ke **083879305916**:
- `menu` → Lihat menu
- `1` → Info syarat nikah
- "Wali saya di luar negeri, gimana?" → AI jawab!

---

## 📖 Dokumentasi Lengkap

### 🔰 Untuk Pemula:
1. **README.md** - Dokumentasi utama (lengkap banget!)
2. **QUICK_START.md** - Panduan cepat

### 🤖 Setup AI:
3. **SETUP_AI.md** - Panduan setup Google Gemini Pro
4. **AI_FEATURES.md** - Penjelasan fitur AI lengkap
5. **ENV_TEMPLATE.txt** - Template config

### 🧪 Testing:
6. **TEST_AI.md** - Daftar test cases
7. **CONTOH_PENGGUNAAN.md** - Contoh percakapan

---

## 📁 File Structure

```
botwa/
├── START_HERE.md              ← KAMU DI SINI
├── README.md                  ← Baca ini dulu!
├── SETUP_AI.md                ← Setup AI
├── package.json
├── index.js                   ← Bot utama
├── config/
│   └── aiConfig.js           ← Config AI
├── data/
│   └── faqKUA.js             ← Database FAQ
└── utils/
    ├── messageHandler.js     ← Logic hybrid
    └── aiService.js          ← AI service
```

---

## 🎛️ Mode Bot

### Tanpa AI (FAQ Only)
Tidak setup `.env` → Bot otomatis mode FAQ
- ✅ Cepat
- ✅ Gratis
- ❌ Kurang fleksibel

### Dengan AI (Hybrid) ⭐ RECOMMENDED
Setup `.env` dengan API key → Bot mode hybrid
- ✅ FAQ untuk pertanyaan standar (cepat)
- ✅ AI untuk pertanyaan kompleks (smart)
- ✅ Hemat quota

---

## 🔥 Contoh Penggunaan

### FAQ (Instant ⚡)
```
User: menu
Bot: [Menu lengkap 1-6]

User: 1
Bot: [Info syarat nikah lengkap]

User: syarat nikah
Bot: [Info syarat nikah lengkap]
```

### AI (Smart 🤖)
```
User: Wali saya di luar negeri, gimana solusinya?
Bot: [AI jawab dengan detail & kontekstual]

User: Nikah siri 5 tahun lalu bisa dicatat ga?
Bot: [AI jelaskan tentang Itsbat Nikah]

User: Apa bedanya wali nasab dan wali hakim?
Bot: [AI jelaskan perbedaannya]
```

---

## 🆘 Butuh Bantuan?

### Masalah Umum:

**Error: "Could not find expected browser (chrome)"**
```bash
npm install
# Download Chromium (~150MB)
```

**Bot tidak jalan?**
```bash
rm -rf node_modules
npm install
npm start
```

**AI tidak aktif?**
- Cek file `.env` ada dan benar
- Cek `GEMINI_API_KEY` terisi
- Lihat `SETUP_AI.md`

**Bot terputus?**
```bash
rm -rf .wwebjs_auth
npm start
# Scan QR lagi
```

### Baca Dokumentasi:
- **README.md** - Troubleshooting lengkap
- **SETUP_AI.md** - AI troubleshooting

---

## 🎯 Recommended Reading Order

1. **START_HERE.md** ← (Kamu di sini)
2. **QUICK_START.md** - Jalankan bot dulu
3. **README.md** - Pahami semua fitur
4. **SETUP_AI.md** - Setup AI (kalau mau)
5. **TEST_AI.md** - Test bot kamu

---

## 💡 Tips

### Untuk Production:
1. ✅ Setup `.env` dengan AI
2. ✅ Mode `hybrid` (hemat quota)
3. ✅ Monitor quota di Google AI Studio
4. ✅ Backup folder `.wwebjs_auth`
5. ✅ Jalankan di server/VPS (bukan laptop)
6. ✅ Gunakan PM2 untuk auto-restart

### Untuk Development:
```bash
# Auto-reload saat edit code
npm run dev
```

---

## 📊 What's Included

### ✅ Bot Features:
- WhatsApp Web.js integration
- Auto-reply system
- Menu interaktif (1-6)
- Keyword recognition
- FAQ database lengkap
- Google Gemini Pro AI
- Hybrid mode (FAQ + AI)
- Error handling
- Logging system

### ✅ Documentation:
- 8 file dokumentasi lengkap
- Quick start guide
- AI setup guide
- Test cases
- Troubleshooting
- Examples

### ✅ Ready to Deploy:
- Package.json configured
- .gitignore setup
- Environment template
- Error handling
- Graceful shutdown

---

## 🚀 Next Steps

1. **Jalankan bot** (5 menit)
   ```bash
   npm install && npm start
   ```

2. **Test basic features** (5 menit)
   - Kirim `menu`
   - Kirim `1`, `2`, `3`
   - Test keyword

3. **Setup AI** (10 menit)
   - Dapatkan API key
   - Setup `.env`
   - Restart bot
   - Test AI

4. **Deploy ke production** (optional)
   - Setup VPS
   - Install PM2
   - Configure auto-start

---

## 🎉 You're Ready!

Bot sudah siap digunakan! 

**Nomor Bot:** 083879305916

Silakan explore dokumentasi untuk memahami semua fitur.

**Selamat mencoba! 🚀**

---

Made with ❤️ for Indonesian KUA services

