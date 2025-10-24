const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/aiConfig');

let genAI = null;
let model = null;

/**
 * Initialize Google Gemini AI
 */
function initializeAI() {
  if (!config.apiKey) {
    console.log('⚠️  AI tidak diinisialisasi (API key tidak ada)');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(config.apiKey);
    model = genAI.getGenerativeModel({
      model: config.model,
      generationConfig: config.generationConfig,
      safetySettings: config.safetySettings,
    });

    console.log(`✅ Google Gemini AI (${config.model}) berhasil diinisialisasi`);
    console.log(`📊 Mode: ${config.mode.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error('❌ Error inisialisasi AI:', error.message);
    return false;
  }
}

/**
 * Generate response using AI
 * @param {string} userMessage - User's message
 * @param {string} userName - User's name (optional)
 * @returns {Promise<string>} - AI response
 */
async function generateAIResponse(userMessage, userName = 'User') {
  if (!model) {
    throw new Error('AI model belum diinisialisasi');
  }

  try {
    // Build full prompt with context
    const fullPrompt = `${config.systemPrompt}

User: ${userName}
Pertanyaan: ${userMessage}

Jawab dengan informatif, ramah, dan sesuai konteks layanan KUA:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    if (config.debug) {
      console.log('🤖 AI Response generated successfully');
    }

    return text.trim();

  } catch (error) {
    console.error('❌ Error generating AI response:', error.message);
    
    // Fallback response
    return `Maaf, terjadi kesalahan saat memproses pertanyaan Anda. 😔

Silakan coba lagi atau hubungi langsung:
📞 Call Center Kemenag: 151
🌐 Website: simkah.kemenag.go.id

Atau ketik *MENU* untuk melihat informasi yang tersedia.`;
  }
}

/**
 * Check if AI is available
 * @returns {boolean}
 */
function isAIAvailable() {
  return model !== null && config.apiKey !== '';
}

/**
 * Get current AI mode
 * @returns {string} - 'faq', 'ai', or 'hybrid'
 */
function getAIMode() {
  return config.mode;
}

/**
 * Chat with conversation history (untuk percakapan berkelanjutan)
 * @param {Array} history - Array of {role: 'user'|'model', parts: [{text: '...'}]}
 * @param {string} newMessage - New message from user
 * @returns {Promise<string>} - AI response
 */
async function chatWithHistory(history, newMessage) {
  if (!model) {
    throw new Error('AI model belum diinisialisasi');
  }

  try {
    const chat = model.startChat({
      history: history,
      generationConfig: config.generationConfig,
      safetySettings: config.safetySettings,
    });

    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text().trim();

  } catch (error) {
    console.error('❌ Error in chat with history:', error.message);
    throw error;
  }
}

module.exports = {
  initializeAI,
  generateAIResponse,
  isAIAvailable,
  getAIMode,
  chatWithHistory,
};

