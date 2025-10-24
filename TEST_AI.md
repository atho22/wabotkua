# 🧪 Testing AI Features

Daftar pertanyaan untuk test AI bot.

---

## ✅ Test FAQ (Harus Cepat - dari Database)

Ini harus dijawab instant dari FAQ, bukan AI:

1. `menu` atau `MENU`
2. `1` (syarat nikah)
3. `2` (biaya)
4. `3` (proses)
5. `syarat nikah`
6. `biaya nikah`
7. `proses nikah`
8. `halo` atau `hai`
9. `assalamualaikum`

**Expected:** Jawaban instant dalam < 1 detik

---

## 🤖 Test AI (Pertanyaan Kompleks)

Ini harus dijawab oleh AI (2-3 detik):

### Kategori 1: Wali Nikah
1. "Wali saya di luar negeri, bagaimana solusinya?"
2. "Apa bedanya wali nasab dan wali hakim?"
3. "Apakah ayah tiri bisa jadi wali nikah?"
4. "Kalau wali menolak tanpa alasan, gimana?"

### Kategori 2: Dokumen & Syarat
1. "Akta kelahiran hilang, apakah bisa pakai dokumen lain?"
2. "KTP saya masih proses, bisa nikah dulu ga?"
3. "Surat N1, N2, N4 itu apa sih sebenarnya?"
4. "Berapa lama kursus pranikah harus diikuti?"

### Kategori 3: Situasi Khusus
1. "Saya nikah siri 5 tahun lalu, bisa dicatat sekarang?"
2. "Sudah cerai 2 bulan, kapan bisa nikah lagi?"
3. "Bisa nikah beda agama di KUA ga?"
4. "Menikah dengan WNA, syaratnya apa aja?"

### Kategori 4: Biaya & Proses
1. "Kalau nikah di rumah tapi jauh dari KUA, kena biaya berapa?"
2. "Duplikat buku nikah karena rusak, prosesnya gimana?"
3. "Berapa lama pengurusan itsbat nikah?"
4. "Biaya nikah di KUA benar-benar gratis atau ada biaya admin?"

### Kategori 5: Perceraian & Rujuk
1. "Istri mau cerai, tapi saya ga mau. Bagaimana prosesnya?"
2. "Sudah berapa lama harus cerai sebelum bisa rujuk?"
3. "Rujuk itu harus di KUA atau bisa sendiri?"
4. "Apa bedanya cerai gugat dan cerai talak?"

### Kategori 6: Wakaf
1. "Bagaimana cara mewakafkan tanah di KUA?"
2. "Apa itu nazhir wakaf?"
3. "Tanah wakaf bisa dijual kembali ga?"

### Kategori 7: Edge Cases
1. "Umur saya baru 18 tahun, boleh nikah ga?"
2. "Calon istri saya hamil, bisa dipercepat ga prosesnya?"
3. "Saya TNI, apakah syaratnya beda?"
4. "Nikah di hari Jumat bisa ga?"

---

## 🎯 Expected AI Response Quality

AI harus:
1. ✅ Jawab sesuai konteks KUA
2. ✅ Pakai bahasa Indonesia yang sopan
3. ✅ Terstruktur dengan poin-poin
4. ✅ Pakai emoji yang sesuai (✅❌📋💰⏰📞)
5. ✅ Akhiri dengan: "Untuk informasi lebih detail, silakan hubungi KUA terdekat atau call center Kemenag: 151"
6. ✅ Tidak lebih dari 500 kata
7. ✅ Tidak memberikan fatwa atau nasihat hukum kompleks

---

## 🔀 Test Mode Switching

### Test Mode FAQ Only
```env
BOT_MODE=faq
```
Test: "Wali saya di luar negeri, gimana?"
Expected: Default response (tidak mengerti)

### Test Mode AI Only
```env
BOT_MODE=ai
```
Test: "menu"
Expected: AI jawab tentang menu (bukan FAQ template)

### Test Mode Hybrid
```env
BOT_MODE=hybrid
```
Test: "menu" → FAQ (instant)
Test: "Wali saya di luar negeri" → AI (2-3 detik)

---

## 📊 Performance Testing

### Response Time
- FAQ: < 1 detik ✅
- AI: 2-5 detik ✅
- Timeout: > 10 detik ❌

### Accuracy
- FAQ match rate: 100%
- AI relevance: > 90%
- AI hallucination: < 5%

### Quota Monitoring
- Check di: https://aistudio.google.com
- Gemini Pro free: 60 req/min
- Monitor usage setiap hari

---

## 🐛 Common Issues to Test

1. **Pesan kosong**: ""
   - Expected: Bot minta user ketik sesuatu

2. **Pesan sangat panjang**: (> 1000 kata)
   - Expected: AI tetap jawab tapi ringkas

3. **Bahasa campur**: "syarat nikah tapi wali gw di LN"
   - Expected: AI deteksi hybrid FAQ + AI

4. **Spam**: User kirim 10 pesan berturut-turut
   - Expected: Bot jawab semua (tapi rate limit API?)

5. **Pertanyaan di luar konteks**: "Berapa harga emas hari ini?"
   - Expected: AI bilang fokusnya adalah KUA

---

## ✅ Test Checklist

Sebelum deploy production:

- [ ] Test semua FAQ masih jalan
- [ ] Test AI jawab pertanyaan kompleks
- [ ] Test mode hybrid switch correctly
- [ ] Test error handling (API down, quota habis)
- [ ] Test multiple users simultaneously
- [ ] Test di grup WhatsApp (if enabled)
- [ ] Check memory usage (no memory leak)
- [ ] Check bot reconnect after disconnect
- [ ] Monitor quota usage
- [ ] Test edge cases (empty message, spam, etc)

---

**Happy Testing! 🧪**

