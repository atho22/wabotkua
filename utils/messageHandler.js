const { faqData, keywords } = require('../data/faqKUA');
const { generateAIResponse, isAIAvailable, getAIMode } = require('./aiService');

/**
 * Handle incoming messages and return appropriate response
 * @param {string} message - Incoming message text
 * @param {string} userName - User's name (optional)
 * @returns {Promise<string>} - Response message
 */
async function handleMessage(message, userName = 'User') {
  const lowerMessage = message.toLowerCase().trim();
  const mode = getAIMode();

  // =======================
  // MODE: AI ONLY
  // =======================
  if (mode === 'ai' && isAIAvailable()) {
    try {
      console.log('🤖 Mode AI: Menggunakan AI untuk semua pertanyaan');
      const aiResponse = await generateAIResponse(message, userName);
      return aiResponse;
    } catch (error) {
      console.error('❌ AI Error, fallback ke FAQ');
      // Fallback to FAQ if AI fails
    }
  }

  // =======================
  // FAQ MATCHING
  // =======================
  let faqResponse = null;

  // Check for menu numbers (1-6, 0)
  if (lowerMessage === '1') {
    faqResponse = faqData.syaratNikah;
  } else if (lowerMessage === '2') {
    faqResponse = faqData.biaya;
  } else if (lowerMessage === '3') {
    faqResponse = faqData.proses;
  } else if (lowerMessage === '4') {
    faqResponse = faqData.layanan;
  } else if (lowerMessage === '5') {
    faqResponse = faqData.faq;
  } else if (lowerMessage === '6') {
    faqResponse = faqData.kontak;
  } else if (lowerMessage === '0') {
    faqResponse = faqData.info;
  } else {
    // Check for keywords
    for (const [keyword, responseKey] of Object.entries(keywords)) {
      if (lowerMessage.includes(keyword)) {
        faqResponse = faqData[responseKey];
        break;
      }
    }
  }

  // If FAQ found, return it
  if (faqResponse) {
    console.log('📋 Menggunakan FAQ response');
    return faqResponse;
  }

  // =======================
  // MODE: HYBRID - Use AI as fallback
  // =======================
  if (mode === 'hybrid' && isAIAvailable()) {
    try {
      console.log('🤖 FAQ tidak ditemukan, menggunakan AI...');
      const aiResponse = await generateAIResponse(message, userName);
      return aiResponse;
    } catch (error) {
      console.error('❌ AI Error:', error.message);
      // Continue to default response
    }
  }

  // =======================
  // DEFAULT RESPONSE (No FAQ, No AI)
  // =======================
  return `Maaf, saya tidak mengerti pesan Anda. 😅

Ketik *MENU* untuk melihat daftar layanan yang tersedia.

Atau ketik kata kunci seperti:
• *syarat* - Info syarat nikah
• *biaya* - Info biaya
• *proses* - Info proses & waktu
• *layanan* - Semua layanan KUA
• *kontak* - Kontak KUA`;
}

/**
 * Check if message should be auto-replied
 * @param {object} msg - WhatsApp message object
 * @returns {boolean}
 */
function shouldReply(msg) {
  // Don't reply to:
  // - Group messages (optional - change to false to enable group replies)
  // - Status updates
  // - Own messages
  
  if (msg.isStatus) return false;
  if (msg.fromMe) return false;
  
  // Uncomment this to disable group replies:
  // if (msg.from.includes('@g.us')) return false;
  
  return true;
}

/**
 * Format message for better readability
 * @param {string} text - Text to format
 * @returns {string}
 */
function formatMessage(text) {
  // Already formatted in faqData, just return as is
  return text;
}

module.exports = {
  handleMessage,
  shouldReply,
  formatMessage
};

