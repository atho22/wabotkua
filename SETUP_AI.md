# 🤖 Setup AI (Google Gemini Pro)

Panduan lengkap untuk mengaktifkan AI di bot WhatsApp KUA.

---

## 🎯 Apa yang Berubah?

Bot sekarang **HYBRID**:
- ✅ **FAQ Priority** - Jawab cepat pakai database untuk pertanyaan standar
- ✅ **AI Fallback** - Pakai Gemini Pro untuk pertanyaan kompleks/natural
- ✅ **Smart Detection** - Otomatis pilih FAQ atau AI

---

## 🔑 Dapatkan API Key Google Gemini

### Step 1: Buka Google AI Studio
1. Kunjungi: https://aistudio.google.com/app/apikey
2. Login dengan akun Google kamu (yang sudah Pro)

### Step 2: Generate API Key
1. Klik **"Get API Key"** atau **"Create API Key"**
2. Pilih project atau buat baru
3. Copy API Key yang muncul
4. **SIMPAN BAIK-BAIK!** (API key ini rahasia)

---

## ⚙️ Setup Environment Variable

### Step 1: Buat File .env

Di folder `/home/atho/botwa`, buat file baru bernama `.env` (dengan titik di depan):

```bash
cd /home/atho/botwa
nano .env
```

### Step 2: Isi File .env

Copy-paste ini ke dalam file `.env` (atau copy dari `ENV_TEMPLATE.txt`):

```env
# Google Gemini API Configuration
GEMINI_API_KEY=PASTE_API_KEY_KAMU_DISINI

# Bot Configuration
BOT_MODE=hybrid

# AI Settings
AI_MODEL=gemini-pro
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=500

# Optional
REPLY_IN_GROUPS=false
DEBUG=true
```

**Ganti `PASTE_API_KEY_KAMU_DISINI` dengan API key yang kamu dapat dari Step 2!**

### Step 3: Save File

- Di nano: tekan `CTRL+O`, lalu `ENTER`, lalu `CTRL+X`
- Di vim: tekan `ESC`, ketik `:wq`, lalu `ENTER`

---

## 🚀 Test Bot dengan AI

### 1. Install Dependencies Baru

```bash
cd /home/atho/botwa
npm install
```

Ini akan install:
- `@google/generative-ai` - Google Gemini SDK
- `dotenv` - Environment variable manager

### 2. Jalankan Bot

```bash
npm start
```

Kamu akan lihat:
```
🤖 Memulai Bot WhatsApp KUA...

✅ Google Gemini AI (gemini-pro) berhasil diinisialisasi
📊 Mode: HYBRID
⚙️  Menginisialisasi client...
```

### 3. Scan QR Code & Test

Setelah bot aktif, coba kirim pesan:

**Test FAQ (akan pakai database):**
- `menu` → Langsung dari FAQ
- `1` → Langsung dari FAQ
- `syarat nikah` → Langsung dari FAQ

**Test AI (akan pakai Gemini):**
- `Saya mau nikah tapi wali saya di luar negeri, gimana ya?`
- `Berapa lama proses duplikat buku nikah kalau hilang?`
- `Apa bedanya wali nasab dan wali hakim?`
- `Saya sudah cerai 3 bulan lalu, bisakah rujuk sekarang?`

AI akan jawab dengan **lebih natural dan kontekstual**! 🔥

---

## 📊 3 Mode Bot

Bot bisa jalan dalam 3 mode (edit di file `.env`):

### 1. **FAQ Mode** (mode lama, tanpa AI)
```env
BOT_MODE=faq
```
- Hanya pakai database FAQ
- Cepat, hemat quota API
- Tapi kurang fleksibel

### 2. **AI Mode** (semua pakai AI)
```env
BOT_MODE=ai
```
- Semua pertanyaan ke Gemini Pro
- Super smart tapi pakai quota API
- Cocok untuk testing AI

### 3. **HYBRID Mode** ⭐ (RECOMMENDED)
```env
BOT_MODE=hybrid
```
- FAQ dulu (cepat & gratis)
- Kalau ga ketemu, baru pakai AI
- **Best of both worlds!**

---

## 🎨 Customization AI

### Ubah Model AI

Edit di `.env`:
```env
# Untuk Gemini Pro (powerful, lebih lambat)
AI_MODEL=gemini-pro

# Untuk Gemini Flash (lebih cepat, hemat)
AI_MODEL=gemini-1.5-flash
```

### Ubah Kreativitas AI

Temperature (0.0 - 1.0):
```env
# Lebih konsisten & akurat (0.5-0.7)
AI_TEMPERATURE=0.7

# Lebih kreatif & variatif (0.8-1.0)
AI_TEMPERATURE=0.9

# Sangat strict & faktual (0.1-0.3)
AI_TEMPERATURE=0.3
```

### Ubah Panjang Jawaban

Max tokens:
```env
# Jawaban pendek (300-400)
AI_MAX_TOKENS=300

# Jawaban sedang (500-700) - RECOMMENDED
AI_MAX_TOKENS=500

# Jawaban panjang (800-1000)
AI_MAX_TOKENS=1000
```

---

## 🔧 Troubleshooting

### API Key Invalid
**Error:** `API key not valid`

**Solusi:**
1. Cek API key di `.env` (pastikan tidak ada spasi)
2. Generate API key baru di Google AI Studio
3. Pastikan akun Google aktif

### AI Tidak Jalan
**Bot jalan tapi AI tidak aktif**

**Cek:**
1. File `.env` ada dan isinya benar?
2. `GEMINI_API_KEY` sudah diisi?
3. Lihat log saat bot start, ada error?

### Quota Habis
**Error:** `Resource exhausted`

**Solusi:**
1. Switch ke `gemini-1.5-flash` (lebih hemat)
2. Ubah mode ke `hybrid` (hemat quota)
3. Cek quota di: https://aistudio.google.com

### Response Lambat
**AI jawab terlalu lama**

**Solusi:**
1. Switch ke `gemini-1.5-flash`
2. Kurangi `AI_MAX_TOKENS` jadi 300-400
3. Cek koneksi internet

---

## 💡 Tips & Best Practices

### 1. **Gunakan Mode Hybrid**
- FAQ untuk pertanyaan umum (cepat)
- AI untuk pertanyaan kompleks (smart)
- Hemat quota API

### 2. **Monitor Usage**
- Cek quota API di Google AI Studio
- Gemini Pro gratis: 60 requests/menit
- Gemini Pro (paid): Unlimited

### 3. **Fine-tune AI**
Edit system prompt di `config/aiConfig.js` untuk adjust behavior AI:
```javascript
systemPrompt: `Kamu adalah asisten KUA...`
```

### 4. **Test Berkala**
- Test FAQ masih jalan
- Test AI bisa jawab pertanyaan kompleks
- Monitor log untuk error

---

## 📈 Upgrade ke Gemini 1.5

Jika mau pakai model terbaru:

```env
# Gemini 1.5 Pro (most powerful)
AI_MODEL=gemini-1.5-pro-latest

# Gemini 1.5 Flash (fastest)
AI_MODEL=gemini-1.5-flash-latest
```

---

## 🎯 Contoh Percakapan Hybrid

**User:** menu
**Bot:** [FAQ Response - instant] ⚡

**User:** 1
**Bot:** [FAQ Response - instant] ⚡

**User:** Kalau saya nikah siri 5 tahun lalu, bisa dicatat sekarang ga?
**Bot:** [AI Response - 2-3 detik] 🤖
```
Bisa, melalui proses Itsbat Nikah (penetapan nikah).

Prosesnya:
✅ Ajukan permohonan ke Pengadilan Agama
✅ Siapkan bukti-bukti pernikahan...
✅ ...

Untuk informasi lebih detail, silakan hubungi KUA terdekat atau call center Kemenag: 151
```

---

**AI Setup Complete! Bot kamu sekarang SUPER SMART! 🤖✨**

Kalau ada masalah, cek troubleshooting di atas atau contact support.

