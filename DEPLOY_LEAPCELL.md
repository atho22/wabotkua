# 🚀 Deploy Bot WhatsApp KUA ke Leapcell

Panduan lengkap deploy bot ke Leapcell.

---

## ⚠️ **IMPORTANT: Limitations WhatsApp Bot**

WhatsApp Web.js **TIDAK COCOK** untuk:
- ❌ Serverless platform (AWS Lambda, Vercel, Netlify Functions)
- ❌ Ephemeral containers (Heroku free tier)
- ❌ Auto-scaling services

WhatsApp Web.js **BUTUH**:
- ✅ Dedicated server / VPS / Container yang always-on
- ✅ Persistent storage untuk session
- ✅ Chromium browser running (512MB+ RAM)
- ✅ Akses untuk scan QR code setiap deploy

**Recommended:** VPS (DigitalOcean, Linode, AWS EC2) atau Docker container

---

## 🎯 Deploy ke Leapcell (Jika Support Container)

### Step 1: Persiapan

1. **Sign up di Leapcell:**
   - Visit: https://leapcell.io
   - Create account
   - Verify email

2. **Install Leapcell CLI (jika ada):**
   ```bash
   npm install -g @leapcell/cli
   leapcell login
   ```

---

### Step 2: Setup Environment Variables

Di Leapcell dashboard, tambahkan environment variables:

```
GEMINI_API_KEY=AIzaSyDwRDtkDZpdBdbnQ1I4pz9RjDtz1RziLV8
BOT_MODE=hybrid
AI_MODEL=gemini-pro
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=500
REPLY_IN_GROUPS=false
DEBUG=true
NODE_ENV=production
```

---

### Step 3: Deploy via Git

1. **Initialize Git (jika belum):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Bot WhatsApp KUA"
   ```

2. **Push ke Leapcell:**
   ```bash
   # Connect to Leapcell
   leapcell link
   
   # Deploy
   leapcell deploy
   ```

---

### Step 4: Deploy via Docker (Recommended)

**Jika Leapcell support Docker:**

1. **Build Docker image:**
   ```bash
   docker build -t botwa-kua .
   ```

2. **Test locally:**
   ```bash
   docker run -it --rm \
     -e GEMINI_API_KEY=AIzaSyDwRDtkDZpdBdbnQ1I4pz9RjDtz1RziLV8 \
     -e BOT_MODE=hybrid \
     botwa-kua
   ```

3. **Push to Leapcell registry:**
   ```bash
   docker tag botwa-kua registry.leapcell.io/your-app/botwa-kua
   docker push registry.leapcell.io/your-app/botwa-kua
   ```

---

### Step 5: Scan QR Code

Setelah deploy:

1. **Check logs di Leapcell dashboard**
2. **Tunggu QR code URL muncul** di logs:
   ```
   ✅ QR Code berhasil disimpan sebagai GAMBAR:
      📁 File: qr-code.png
   ```

3. **Download file `qr-code.png` dari server** atau **buka URL** yang muncul di logs

4. **Scan dengan WhatsApp** (083879305916)

---

## 🔄 Alternative: Deploy ke VPS

**Lebih reliable untuk WhatsApp bot!**

### Option 1: DigitalOcean Droplet

```bash
# 1. Create Droplet (Ubuntu 22.04, $5/month)
# 2. SSH ke server
ssh root@your-server-ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install dependencies
sudo apt-get update
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 \
  libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
  libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
  libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
  libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
  fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# 5. Clone project
git clone <your-repo-url>
cd botwa

# 6. Install packages
npm install

# 7. Setup .env
nano .env
# Paste API key

# 8. Install PM2 (process manager)
sudo npm install -g pm2

# 9. Start bot
pm2 start index.js --name botwa-kua

# 10. Save PM2 config
pm2 save
pm2 startup

# 11. Check logs
pm2 logs botwa-kua
```

---

### Option 2: Railway.app (Easy!)

**Railway sangat cocok untuk WhatsApp bot!**

1. **Sign up:** https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Connect repository**
4. **Add environment variables** di Railway dashboard
5. **Deploy!**
6. **Check logs** untuk QR code URL
7. **Scan QR code**

---

### Option 3: Render.com

1. **Sign up:** https://render.com
2. **New Web Service**
3. **Connect GitHub repo**
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. **Add env vars**
7. **Deploy!**

---

## 📊 Resource Requirements

### Minimum:
- **RAM:** 512MB (recommended: 1GB)
- **CPU:** 0.5 core (recommended: 1 core)
- **Storage:** 1GB (untuk session & cache)
- **Bandwidth:** Unlimited or 1TB+

### Recommended Platforms:

| Platform | Price | Suitable? | Notes |
|----------|-------|-----------|-------|
| **Railway** | $5-10/mo | ✅ Best | Persistent storage, easy deploy |
| **Render** | $7/mo | ✅ Good | Persistent disk available |
| **DigitalOcean** | $5/mo | ✅ Best | Full VPS control |
| **Linode** | $5/mo | ✅ Best | Full VPS control |
| **Leapcell** | Varies | ⚠️ Check | Cek persistent storage support |
| **Heroku** | $7/mo | ⚠️ Maybe | Butuh paid tier + persistent storage |
| **Vercel** | Free | ❌ No | Serverless, not suitable |
| **Netlify** | Free | ❌ No | Serverless, not suitable |

---

## 🔐 Security Checklist

Sebelum deploy:

- [ ] `.env` ada di `.gitignore`
- [ ] API key TIDAK di-commit ke Git
- [ ] Environment variables di-set di platform
- [ ] Session folder di-backup (jika perlu)
- [ ] Logs monitoring aktif
- [ ] Firewall configured (jika VPS)

---

## 🐛 Troubleshooting

### Bot crash setelah deploy
**Symptom:** Container restart terus

**Solution:**
- Check logs: `pm2 logs` atau di dashboard
- Pastikan dependencies installed
- Cek RAM cukup (min 512MB)
- Verifikasi environment variables

### QR Code tidak muncul
**Symptom:** Tidak ada file qr-code.png

**Solution:**
- Check logs untuk error
- Pastikan persistent storage mounted
- Tunggu 60-90 detik untuk initialize
- Restart container

### Session hilang setiap restart
**Symptom:** Harus scan QR code terus

**Solution:**
- **CRITICAL:** Setup persistent storage!
- Mount volume untuk `.wwebjs_auth` folder
- Di Docker: `-v /path/to/storage:/app/.wwebjs_auth`
- Di platform: Enable persistent disk

### Bot disconnect sering
**Symptom:** WhatsApp disconnect otomatis

**Solution:**
- Pastikan server always-on (bukan serverless)
- Check koneksi internet stabil
- Increase memory allocation
- Check WhatsApp di HP tidak logout

---

## 📖 Monitoring

### Check Bot Status

```bash
# Via PM2 (VPS)
pm2 status
pm2 logs botwa-kua

# Via Docker
docker ps
docker logs <container-id>

# Via platform dashboard
# Check logs di Leapcell/Railway/Render dashboard
```

### Health Indicators

Bot sehat jika:
- ✅ Process running (uptime > 1 hour)
- ✅ No error di logs
- ✅ Bisa terima & balas pesan
- ✅ Memory usage stabil (< 300MB)
- ✅ CPU usage rendah (< 10%)

---

## 🎉 After Deploy Success

1. ✅ **Save QR code** untuk backup
2. ✅ **Backup session folder** (`.wwebjs_auth`)
3. ✅ **Setup monitoring** (uptime, logs)
4. ✅ **Test bot** kirim pesan
5. ✅ **Document** server details
6. ✅ **Setup auto-restart** (PM2/Docker)

---

## 🚀 Recommended Deployment

**Untuk WhatsApp bot, saya SANGAT RECOMMEND:**

### Option 1: Railway.app ⭐⭐⭐⭐⭐
- ✅ Easiest deployment
- ✅ Persistent storage built-in
- ✅ Great for Node.js apps
- ✅ Auto-restart
- ✅ Good logs
- 💰 $5-10/month

### Option 2: DigitalOcean VPS ⭐⭐⭐⭐⭐
- ✅ Full control
- ✅ Reliable
- ✅ Cheap ($5/month)
- ✅ Scalable
- ⚠️ Need manual setup

### Option 3: Render.com ⭐⭐⭐⭐
- ✅ Easy deployment
- ✅ Persistent disk available
- ✅ Good UI
- 💰 $7/month

---

## 📞 Support

Jika ada masalah saat deploy:
1. Check logs first
2. Baca troubleshooting section
3. Verify environment variables
4. Test locally dengan Docker first

---

**Good luck dengan deployment! 🚀**

Pilih platform yang cocok dan ikuti panduannya!

