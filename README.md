# 🕌 Bot WhatsApp - Layanan Informasi KUA

Bot WhatsApp otomatis **dengan AI (Google Gemini Pro)** untuk memberikan informasi lengkap tentang layanan **Kantor Urusan Agama (KUA)**.

Bot ini membantu masyarakat mendapatkan informasi seputar:
- ✅ Syarat pendaftaran nikah
- ✅ Biaya layanan KUA
- ✅ Proses dan waktu pelayanan
- ✅ Semua layanan yang tersedia di KUA
- ✅ FAQ (Pertanyaan yang sering diajukan)
- ✅ Kontak dan informasi KUA
- 🤖 **Pertanyaan kompleks dijawab oleh AI!**

---

## 📋 Fitur

- **Auto-Reply 24/7** - Bot menjawab otomatis kapan saja
- **Menu Interaktif** - Pilih menu dengan nomor 1-6
- **Keyword Recognition** - Bot mengerti kata kunci seperti "syarat", "biaya", "proses"
- **Informasi Lengkap** - Semua info KUA dalam satu bot
- **Mudah Digunakan** - Interface sederhana dan user-friendly
- 🤖 **AI-Powered (Google Gemini Pro)** - Jawab pertanyaan kompleks dengan AI
- 🎯 **Hybrid Mode** - FAQ cepat + AI pintar untuk pertanyaan natural
- 💬 **Natural Language** - Tanya dengan bahasa sehari-hari, AI mengerti!

---

## 🚀 Cara Install

### 1. Persyaratan Sistem

Pastikan sudah terinstall:
- **Node.js** (versi 16 atau lebih baru)
- **npm** (biasanya sudah include dengan Node.js)

Cek versi:
```bash
node --version
npm --version
```

**Note:** Bot akan otomatis download Chromium (~150MB) saat `npm install` pertama kali.

### 2. Clone/Download Project

```bash
cd /home/atho/botwa
```

### 3. Install Dependencies

```bash
npm install
```

Ini akan menginstall:
- `whatsapp-web.js` - Library untuk WhatsApp bot
- `qrcode-terminal` - Untuk menampilkan QR code di terminal
- `@google/generative-ai` - Google Gemini AI SDK
- `dotenv` - Environment variable manager
- `puppeteer` - Browser automation (auto-download Chromium ~150MB)

**⏳ First install akan butuh 2-5 menit** (download Chromium)

### 4. Setup AI (Opsional tapi Recommended!)

**Untuk mengaktifkan AI (Google Gemini Pro):**

1. Dapatkan API key dari: https://aistudio.google.com/app/apikey
2. Buat file `.env` di root folder:
   ```bash
   nano .env
   ```
3. Isi file `.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   BOT_MODE=hybrid
   AI_MODEL=gemini-pro
   ```
4. Save dan restart bot

**📖 Lihat panduan lengkap di:** `SETUP_AI.md`

**Note:** Bot tetap bisa jalan tanpa AI (mode FAQ only)

---

## 📱 Cara Menjalankan Bot

### 1. Jalankan Bot

```bash
npm start
```

Atau dengan auto-reload (development):
```bash
npm run dev
```

### 2. Scan QR Code

Setelah menjalankan bot, akan muncul **QR Code** di terminal.

**Cara scan:**
1. Buka WhatsApp di HP dengan nomor **083879305916**
2. Tap Menu (⋮) atau Settings
3. Pilih **"Linked Devices"**
4. Tap **"Link a Device"**
5. Scan QR code yang muncul di terminal

⚠️ **PENTING:** Bot akan menggunakan nomor **083879305916** sebagai nomor yang aktif 24/7

### 3. Bot Siap Digunakan!

Setelah scan berhasil, bot akan menampilkan:
```
✅ Bot WhatsApp KUA siap digunakan!
📞 Bot sekarang dapat menerima dan membalas pesan.
```

Bot sekarang aktif dan siap menerima pesan!

---

## 💬 Cara Menggunakan Bot

### Mengirim Pesan ke Bot

Kirim pesan WhatsApp ke nomor **083879305916** (nomor bot yang sudah login).

### 2 Cara Bertanya:

#### 1️⃣ **Menggunakan Menu & Kata Kunci (FAQ - Cepat ⚡)**

Ketik **MENU** untuk melihat menu utama:

```
🕌 SELAMAT DATANG DI LAYANAN INFO KUA 🕌

Silakan pilih menu yang Anda butuhkan:

1️⃣ Syarat Nikah
2️⃣ Biaya Layanan
3️⃣ Proses & Waktu
4️⃣ Layanan KUA
5️⃣ Pertanyaan Umum (FAQ)
6️⃣ Kontak & Lokasi
0️⃣ Info Bot
```

### Cara Memilih Menu

Cukup ketik **nomor menu**, contoh:
- Ketik `1` untuk info Syarat Nikah
- Ketik `2` untuk info Biaya
- Ketik `3` untuk info Proses & Waktu

### Menggunakan Kata Kunci (FAQ)

Bot mengerti kata kunci, contoh:
- Ketik `syarat` → Bot akan balas info syarat nikah
- Ketik `biaya` → Bot akan balas info biaya
- Ketik `proses` → Bot akan balas info proses
- Ketik `halo` atau `assalamualaikum` → Bot akan menyapa

#### 2️⃣ **Tanya dengan Bahasa Natural (AI - Pintar 🤖)**

**Jika AI diaktifkan**, bot bisa jawab pertanyaan kompleks:

**Contoh pertanyaan:**
- "Saya mau nikah tapi wali saya di luar negeri, gimana ya?"
- "Berapa lama proses duplikat buku nikah kalau hilang?"
- "Apa bedanya wali nasab dan wali hakim?"
- "Saya sudah cerai 3 bulan lalu, bisakah rujuk sekarang?"
- "Kalau nikah siri 5 tahun lalu, bisa dicatat ga?"

Bot akan jawab dengan **kontekstual dan detail** menggunakan Google Gemini Pro! 🔥

### Mode Hybrid (Best of Both Worlds)

Bot otomatis memilih:
- ✅ **FAQ** untuk pertanyaan standar (instant, hemat)
- ✅ **AI** untuk pertanyaan kompleks/natural (smart, detail)

---

## 🛠️ Kustomisasi

### Mengedit Konten FAQ

Edit file `/home/atho/botwa/data/faqKUA.js` untuk mengubah isi pesan.

Contoh:
```javascript
const faqData = {
  syaratNikah: `Syarat nikah di KUA: ...`,
  biaya: `Biaya layanan: ...`,
  // ... dst
};
```

### Menambah Kata Kunci

Tambahkan kata kunci baru di `keywords` object:
```javascript
const keywords = {
  'syarat': 'syaratNikah',
  'nikah': 'syaratNikah',
  // Tambah kata kunci baru
  'menikah': 'syaratNikah',
};
```

### Menonaktifkan Reply di Grup

Edit file `/home/atho/botwa/utils/messageHandler.js`:
```javascript
function shouldReply(msg) {
  // Uncomment baris ini untuk menonaktifkan reply di grup:
  if (msg.from.includes('@g.us')) return false;
  
  return true;
}
```

---

## 📁 Struktur Project

```
botwa/
├── index.js                    # File utama bot
├── package.json                # Dependencies & scripts
├── .gitignore                  # File yang diabaikan git
├── .env                        # Environment variables (buat sendiri)
├── ENV_TEMPLATE.txt            # Template untuk .env
├── README.md                   # Dokumentasi (file ini)
├── SETUP_AI.md                 # Panduan setup AI lengkap
├── QUICK_START.md              # Panduan cepat
├── CONTOH_PENGGUNAAN.md        # Contoh percakapan
├── config/
│   └── aiConfig.js            # Konfigurasi AI
├── data/
│   └── faqKUA.js              # Data FAQ & menu
├── utils/
│   ├── messageHandler.js      # Handler pesan & logic (hybrid)
│   └── aiService.js           # Service Google Gemini AI
└── .wwebjs_auth/              # Session WhatsApp (auto-generated)
```

---

## 🔧 Troubleshooting

### Bot tidak jalan / error saat npm start

**Error: "Could not find expected browser (chrome)"**

**Solusi:**
```bash
npm install
```
Ini akan download Chromium yang diperlukan (~150MB)

**Error lainnya:**

**Solusi:**
1. Hapus folder `node_modules`:
   ```bash
   rm -rf node_modules
   ```
2. Install ulang:
   ```bash
   npm install
   ```

### QR Code tidak muncul

**Solusi:**
1. Pastikan terminal support Unicode
2. Coba perbesar ukuran terminal
3. Restart bot

### Bot terputus terus

**Solusi:**
1. Hapus folder `.wwebjs_auth`:
   ```bash
   rm -rf .wwebjs_auth
   ```
2. Jalankan ulang bot dan scan QR code lagi

### Bot tidak balas pesan

**Solusi:**
1. Cek apakah bot masih running (lihat terminal)
2. Cek koneksi internet
3. Pastikan nomor tidak di-block
4. Cek log di terminal untuk error

---

## 💡 Tips & Best Practices

1. **Jalankan di Server/VPS** - Agar bot bisa online 24/7
2. **Gunakan PM2** - Untuk auto-restart jika bot crash:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "bot-kua"
   pm2 save
   pm2 startup
   ```
3. **Backup Session** - Backup folder `.wwebjs_auth` agar tidak perlu scan ulang
4. **Monitor Log** - Selalu cek log untuk debugging
5. **Update Konten** - Perbarui info FAQ sesuai aturan terbaru KUA

---

## 📞 Kontak & Support

Jika ada pertanyaan atau butuh bantuan:
- 💬 WhatsApp Bot: **083879305916**
- 📧 Email: [sesuaikan dengan email Anda jika ada]

**Note:** Nomor 083879305916 adalah nomor yang akan digunakan sebagai bot (scan QR code dengan nomor ini)

---

## ⚖️ Disclaimer

Bot ini dibuat untuk memberikan **informasi umum** tentang layanan KUA.

Untuk informasi **resmi dan terkini**, silakan hubungi:
- 🏢 KUA di wilayah Anda
- ☎️ Call Center Kemenag: **151**
- 🌐 Website: simkah.kemenag.go.id

---

## 📝 Lisensi

Dibuat dengan ❤️ untuk memudahkan masyarakat mengakses informasi KUA.

---

## 🎯 Roadmap / Pengembangan Selanjutnya

Fitur yang bisa dikembangkan:
- [x] ✅ AI Integration (Google Gemini Pro) - **DONE!**
- [x] ✅ Hybrid Mode (FAQ + AI) - **DONE!**
- [ ] Database untuk menyimpan riwayat chat
- [ ] Conversation history (AI remember context)
- [ ] Fitur booking jadwal nikah
- [ ] Reminder untuk pengguna (H-7, H-3, H-1)
- [ ] Multi-admin untuk balas manual
- [ ] Dashboard web untuk monitoring
- [ ] Integrasi dengan Google Calendar
- [ ] Export data chat ke Excel
- [ ] Fitur broadcast untuk pengumuman
- [ ] Multi-language support (ID/EN)

---

**Selamat menggunakan Bot WhatsApp KUA! 🕌**

Semoga bermanfaat untuk memudahkan masyarakat dalam mengakses informasi KUA.

# wabotkua
