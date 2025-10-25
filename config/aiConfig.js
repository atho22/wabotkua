// CATATAN PENTING: Jika Anda mendapatkan error "ERR_REQUIRE_ESM", 
// itu karena 'node-fetch' v3+ adalah ESM-only.
// Solusi: Jalankan `npm uninstall node-fetch` lalu `npm install node-fetch@2`
require('dotenv').config();
const fetch = require('node-fetch');

const config = {
  // 1. PERBAIKAN KEAMANAN: Kunci API yang di-hardcode dihapus.
  // Pastikan GEMINI_API_KEY ada di file .env Anda.
  apiKey: process.env.GEMINI_API_KEY,

  // Bot mode: 'faq', 'ai', atau 'hybrid'
  mode: process.env.BOT_MODE || 'hybrid',

  // 2. PERBAIKAN MODEL: Menggunakan nama model yang valid.
  model: process.env.AI_MODEL || 'gemini-1.5-flash-latest',

  // AI Generation Config
  generationConfig: {
    temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
    maxOutputTokens: parseInt(process.env.AI_MAX_TOKENS) || 500,
    topP: 0.95,
    topK: 40,
  },

  // Safety Settings (Tidak berubah)
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    // ... (kategori lain tetap sama) ...
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],

  // System Prompt untuk konteks KUA (Tidak berubah)
  systemPrompt: `Kamu adalah asisten virtual untuk Kantor Urusan Agama (KUA) Indonesia.

PERAN & TUGAS:
- Memberikan informasi akurat tentang layanan KUA
- Menjawab pertanyaan seputar pernikahan, perceraian, rujuk, wakaf, dan layanan KUA lainnya
- Menggunakan bahasa Indonesia yang sopan dan mudah dipahami
- Selalu merujuk ke informasi resmi dari Kementerian Agama RI

KONTEKS LAYANAN KUA:
1. PERNIKAHAN: Pendaftaran nikah, akad nikah, buku nikah, syarat dokumen
2. PERCERAIAN: Mediasi, pendampingan sidang, pencatatan cerai
3. RUJUK: Pencatatan rujuk, konseling
4. KONSELING: Pranikah (Suscatin), konseling keluarga
5. WALI HAKIM: Untuk yang tidak punya wali nasab
6. WAKAF: Pencatatan tanah wakaf, AIW
7. LAYANAN DIGITAL: SIMKAH, e-sertifikat

SYARAT NIKAH DI KUA:
- KTP, KK, Akta Kelahiran (asli + fotokopi)
- Surat dari kelurahan (N1, N2, N4)
- Pas foto 2x3 (4 lembar)
- Ijazah terakhir
- Surat keterangan status (lajang/duda/janda)
- Sertifikat kursus pranikah (Suscatin)

BIAYA:
- Nikah di KUA: GRATIS
- Nikah di luar KUA: Ada biaya transportasi petugas (~Rp 600.000)
- Buku nikah: GRATIS
- Duplikat buku nikah: Sesuai peraturan daerah

PROSES:
- Pendaftaran minimal 10 hari kerja sebelum akad
- Wajib ikut Suscatin (2-3 hari, 16-24 jam)
- Jadwal akad: Senin-Kamis jam kerja, Jumat libur

KONTAK RESMI:
- Call Center Kemenag: 151 (24 jam)
- Website: simkah.kemenag.go.id

CARA MENJAWAB:
1. Jawab dengan jelas dan ringkas
2. Gunakan poin-poin untuk kemudahan membaca
3. Jika tidak yakin, arahkan ke KUA terdekat atau call center 151
4. Selalu ramah dan profesional
5. Maksimal 500 kata per jawaban
6. Gunakan emoji yang sesuai untuk kejelasan (✅❌📋💰⏰📞)

BATASAN:
- Jangan memberikan nasihat hukum yang kompleks
- Jangan memberikan fatwa agama
- Untuk kasus spesifik, arahkan ke KUA atau pengadilan agama
- Jika ditanya di luar konteks KUA, dengan sopan bilang fokus kamu adalah layanan KUA

Selalu akhiri dengan: "Untuk informasi lebih detail, silakan hubungi KUA terdekat atau call center Kemenag: 151"`,

  // Options
  replyInGroups: process.env.REPLY_IN_GROUPS === 'true',
  debug: process.env.DEBUG === 'true',
};

// 3. PERBAIKAN FUNGSI: 'askGemini' sekarang menggunakan 'systemPrompt'
/**
 * Memanggil Gemini API dengan system prompt KUA.
 * @param {string} question Pertanyaan dari user
 * @param {object} opts Opsi tambahan (opsional)
 * @returns {Promise<string>} Jawaban dari AI
 */
async function askGemini(question, opts = {}) {
  // Validasi apiKey sekali lagi saat fungsi dipanggil
  if (!config.apiKey) {
    console.error("[askGemini] Error: API Key tidak ada.");
    return "Maaf, layanan AI tidak dapat dihubungi karena konfigurasi API Key bermasalah.";
  }

  const apiKey = config.apiKey;
  const model = opts.model || config.model;

  const payload = {
    // Ini adalah bagian krusial untuk memberitahu AI perannya
    systemInstruction: {
      parts: [
        { text: config.systemPrompt }
      ]
    },
    contents: [
      {
        role: "user", // Selalu definisikan role untuk chat
        parts: [
          { text: question }
        ]
      }
    ],
    generationConfig: opts.generationConfig || config.generationConfig,
    safetySettings: opts.safetySettings || config.safetySettings
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      // Error handling lebih baik
      const errorBody = await res.text();
      console.error(`[Gemini API] Error: ${res.status} ${res.statusText}`);
      console.error("[Gemini API] Response Body:", errorBody);
      throw new Error(`[Gemini API] Error ${res.status}: ${errorBody}`);
    }

    const data = await res.json();

    // Handling jika API tidak mengembalikan kandidat (misal, diblokir safety)
    if (!data.candidates || data.candidates.length === 0) {
      console.warn("[Gemini API] No candidates returned. Response:", JSON.stringify(data, null, 2));
      if (data.promptFeedback) {
        return `Maaf, permintaan Anda tidak dapat diproses karena diblokir oleh filter keamanan (Alasan: ${data.promptFeedback.blockReason}).`;
      }
      return "Maaf, terjadi kesalahan pada AI. Tidak ada jawaban yang diterima.";
    }

    // Ekstrak jawaban
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return answer;

  } catch (error) {
    console.error("[askGemini] Gagal memanggil API:", error.message);
    return "Maaf, terjadi masalah saat menyambungkan ke layanan AI. Silakan coba lagi nanti.";
  }
}

// Menambahkan fungsi askGemini ke config agar bisa di-export
config.askGemini = askGemini;

// Validasi API Key (Tidak berubah, logika ini sudah benar)
if (config.mode !== 'faq' && !config.apiKey) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY tidak ditemukan di .env!');
  console.warn('   Bot akan berjalan dalam mode FAQ only.');
  config.mode = 'faq';
}

module.exports = config;