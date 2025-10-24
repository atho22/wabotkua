# 🆓 Deploy Bot WhatsApp KUA - 100% GRATIS!

Panduan deploy gratis untuk production.

---

## 🏆 **TOP 3 PLATFORM GRATIS**

### 🥇 Railway.app - $5/bulan credit (GRATIS!)
- ✅ Easiest setup (5 menit)
- ✅ $5 credit gratis setiap bulan
- ✅ Cukup untuk bot 24/7
- ✅ Persistent storage
- ✅ No credit card needed

### 🥈 Oracle Cloud Always Free
- ✅ GRATIS SELAMANYA
- ✅ 1GB RAM VMs (2x)
- ✅ 200GB storage
- ⚠️ Setup agak ribet
- ⚠️ Butuh kartu kredit (verify only)

### 🥉 Fly.io Free Tier
- ✅ 3 VMs gratis
- ✅ 3GB storage
- ✅ Always-on
- ⚠️ Butuh credit card

---

## 🚀 **TUTORIAL: Railway.app (RECOMMENDED)**

### Step 1: Push ke GitHub

```bash
cd /home/atho/botwa

# Initialize Git
git init
git add .
git commit -m "Bot WhatsApp KUA dengan AI"

# Create GitHub repo di: https://github.com/new
# Nama repo: botwa-kua
# Public atau Private (pilih public untuk gratis)

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/botwa-kua.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy ke Railway

1. **Sign Up Railway:**
   - Visit: https://railway.app
   - Sign in with GitHub
   - No credit card needed!

2. **New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `botwa-kua`

3. **Add Environment Variables:**
   ```
   GEMINI_API_KEY=AIzaSyDwRDtkDZpdBdbnQ1I4pz9RjDtz1RziLV8
   BOT_MODE=hybrid
   AI_MODEL=gemini-pro
   AI_TEMPERATURE=0.7
   AI_MAX_TOKENS=500
   NODE_ENV=production
   ```

4. **Deploy!**
   - Railway akan auto-deploy
   - Tunggu 2-3 menit

5. **Check Logs:**
   - Click "View Logs"
   - Tunggu QR code muncul:
   ```
   ✅ QR Code berhasil disimpan sebagai GAMBAR:
      📁 File: qr-code.png
   ```

6. **Scan QR Code:**
   - Download file dari Railway dashboard (jika ada)
   - Atau buka URL yang muncul di logs
   - Scan dengan WA 083879305916

**DONE! Bot running 24/7 GRATIS!** 🎉

---

## 🔧 **TUTORIAL: Oracle Cloud (Gratis Selamanya)**

### Step 1: Sign Up

1. Visit: https://www.oracle.com/cloud/free/
2. Click "Start for free"
3. Fill form (butuh kartu kredit untuk verify, tidak di-charge)
4. Verify email

### Step 2: Create VM Instance

1. **Go to Console**
2. **Menu** → **Compute** → **Instances**
3. **Create Instance:**
   - Name: `botwa-kua`
   - Image: **Ubuntu 22.04**
   - Shape: **VM.Standard.E2.1.Micro** (Always Free)
   - Networking: Default
   - SSH keys: Generate atau upload pubkey

4. **Download private key** (jika generate)
5. **Copy Public IP**

### Step 3: Setup Server

```bash
# SSH ke server
ssh -i private-key.pem ubuntu@YOUR_VM_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies untuk Chromium
sudo apt-get install -y \
  gconf-service libasound2 libatk1.0-0 libc6 libcairo2 \
  libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
  libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 \
  libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
  libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
  libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
  libxrender1 libxss1 libxtst6 ca-certificates \
  fonts-liberation libappindicator1 libnss3 lsb-release \
  xdg-utils wget chromium-browser

# Clone project
git clone https://github.com/YOUR_USERNAME/botwa-kua.git
cd botwa-kua

# Install packages
npm install

# Setup environment
nano .env
# Paste:
# GEMINI_API_KEY=AIzaSyDwRDtkDZpdBdbnQ1I4pz9RjDtz1RziLV8
# BOT_MODE=hybrid
# AI_MODEL=gemini-pro

# Save (CTRL+O, ENTER, CTRL+X)

# Install PM2
sudo npm install -g pm2

# Start bot
pm2 start index.js --name botwa-kua

# Auto-start on reboot
pm2 save
pm2 startup
# Copy & run command yang muncul

# Check logs
pm2 logs botwa-kua
```

### Step 4: Get QR Code

```bash
# Wait for QR code generation
pm2 logs botwa-kua --lines 100

# Download QR code image
# Dari local machine:
scp -i private-key.pem ubuntu@YOUR_VM_IP:~/botwa-kua/qr-code.png ./
```

**Scan QR code dan DONE!** Bot gratis selamanya! 🎊

---

## 💰 **Estimasi Biaya (Bulanan)**

| Platform | Cost | Bot 24/7? | Setup Time |
|----------|------|-----------|------------|
| **Railway** | **$0** ($5 credit) | ✅ Yes | 5 min |
| **Oracle Cloud** | **$0** | ✅ Yes | 30 min |
| **Fly.io** | **$0** | ✅ Yes | 10 min |
| **Render Free** | **$0** | ❌ No (sleep) | 5 min |
| **GCP Free** | **$0** (90 hari) | ✅ Yes | 20 min |

---

## 🎯 **Rekomendasi Berdasarkan Kebutuhan**

### Kamu Mau Cepat & Mudah?
→ **Railway.app** (5 menit setup!)

### Kamu Mau Gratis Selamanya?
→ **Oracle Cloud Always Free**

### Kamu Oke dengan Setup Teknis?
→ **Oracle Cloud** (best value!)

### Kamu Cuma Mau Testing?
→ **Render.com Free** (tapi bot sleep)

---

## ⚡ **Quick Comparison**

**Railway.app:**
- ✅ Pro: Super easy, auto-deploy dari GitHub
- ✅ Pro: $5 credit = gratis untuk bot kecil
- ✅ Pro: Persistent storage built-in
- ❌ Con: Mungkin bayar kalau traffic tinggi

**Oracle Cloud:**
- ✅ Pro: GRATIS SELAMANYA
- ✅ Pro: Full VPS control
- ✅ Pro: 1GB RAM cukup
- ❌ Con: Setup agak ribet
- ❌ Con: Butuh kartu kredit

**Fly.io:**
- ✅ Pro: Easy deployment
- ✅ Pro: Good free tier
- ❌ Con: Butuh credit card
- ❌ Con: Limits ketat

---

## 🔒 **Security Tips**

1. ✅ Jangan commit `.env` ke GitHub
2. ✅ Gunakan environment variables di platform
3. ✅ Setup firewall di VPS (Oracle/GCP)
4. ✅ Backup session folder regular
5. ✅ Monitor logs untuk abuse

---

## 📊 **Resource Usage**

Bot WhatsApp ini butuh:
- **RAM:** ~200-300MB
- **CPU:** <5% (idle), ~20% (processing)
- **Storage:** ~500MB (dengan cache)
- **Bandwidth:** ~1-2GB/bulan (low traffic)

**Cocok untuk semua platform gratis di atas!** ✅

---

## 🎉 **My Top Pick: Railway.app**

**Why?**
1. ✅ Setup 5 menit
2. ✅ $5 credit = cukup untuk bot 24/7
3. ✅ Auto-deploy dari GitHub
4. ✅ Persistent storage
5. ✅ Good logs & monitoring
6. ✅ No credit card needed

**Perfect untuk bot WhatsApp!** 🚀

---

## 📞 **Need Help?**

Baca dokumentasi:
- Railway: https://docs.railway.app
- Oracle: https://docs.oracle.com/cloud
- Fly.io: https://fly.io/docs

---

**Deploy sekarang dan nikmati bot GRATIS! 🎊**


