# ⚡ Quick Start Guide - Bot WhatsApp KUA

Panduan cepat untuk menjalankan bot dalam 5 menit!

---

## 🚀 Langkah Cepat

### 1. Install Dependencies
```bash
cd /home/atho/botwa
npm install
```

⏳ **Note:** First install butuh 2-5 menit (download Chromium ~150MB)

### 2. Jalankan Bot
```bash
npm start
```

### 3. Scan QR Code
- Buka WhatsApp di HP dengan nomor **083879305916**
- Pilih **Linked Devices** → **Link a Device**
- Scan QR code yang muncul di terminal

### 4. ✅ Selesai!
Bot sekarang aktif dan siap menerima pesan!

---

## 📱 Nomor Bot

**Nomor WhatsApp Bot:** 083879305916

Gunakan nomor ini untuk:
- ✅ Scan QR code saat setup
- ✅ Bot akan aktif dengan nomor ini
- ✅ User kirim pesan ke nomor ini

---

## 💬 Test Bot

Setelah bot aktif, coba kirim pesan dari HP lain:

1. **Kirim:** `halo`
   - Bot akan menyapa dan memberi instruksi

2. **Kirim:** `menu`
   - Bot akan tampilkan menu lengkap

3. **Kirim:** `1`
   - Bot akan kirim info syarat nikah

---

## 🛑 Menghentikan Bot

Tekan **CTRL + C** di terminal

---

## 🔧 Troubleshooting Cepat

**Error: "Could not find expected browser (chrome)"**
```bash
npm install
# Ini akan download Chromium (~150MB)
```

**Bot tidak jalan?**
```bash
rm -rf node_modules
npm install
npm start
```

**Bot terputus?**
```bash
rm -rf .wwebjs_auth
npm start
# Scan QR code lagi
```

---

## 📖 Dokumentasi Lengkap

Lihat **README.md** untuk dokumentasi lengkap dan advanced features.

---

**Bot ready! Selamat menggunakan! 🎉**

