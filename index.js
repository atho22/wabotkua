const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const QRCode = require('qrcode');
const fs = require('fs');
const { handleMessage, shouldReply } = require('./utils/messageHandler');
const { initializeAI, getAIMode } = require('./utils/aiService');

console.log('🤖 Memulai Bot WhatsApp KUA...\n');

// Initialize AI
const aiInitialized = initializeAI();
if (!aiInitialized) {
  console.log('ℹ️  Bot berjalan dalam mode FAQ only (tanpa AI)');
}

// Initialize WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './.wwebjs_auth'
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ],
    timeout: 60000  // Increase timeout to 60 seconds
  },
  // Increase timeout for auth
  authTimeoutMs: 60000
});

// QR Code untuk scan
client.on('qr', async (qr) => {
  console.log('📱 QR Code untuk login WhatsApp:');
  console.log('');
  
  // Display QR in terminal
  try {
    qrcodeTerminal.generate(qr, { small: true });
  } catch (error) {
    console.log('⚠️  QR code tidak bisa ditampilkan di terminal');
  }
  
  // Generate QR Code as PNG image
  try {
    await QRCode.toFile('qr-code.png', qr, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    console.log('');
    console.log('✅ QR Code berhasil disimpan sebagai GAMBAR:');
    console.log('   📁 File: qr-code.png');
    console.log('   📂 Lokasi: /home/atho/botwa/qr-code.png');
    console.log('');
    console.log('🖼️  BUKA FILE qr-code.png dan scan dengan HP!');
  } catch (error) {
    console.error('❌ Error saving QR code image:', error.message);
  }
  
  // Save QR code string to text file as backup
  fs.writeFileSync('qr-code.txt', qr);
  
  console.log('');
  console.log('💡 Cara scan:');
  console.log('   1. Buka file qr-code.png');
  console.log('   2. Buka WhatsApp di HP (083879305916)');
  console.log('   3. Tap Menu (⋮) > Linked Devices');
  console.log('   4. Tap "Link a Device"');
  console.log('   5. Scan QR code dari gambar');
  console.log('');
});

// Client ready
client.on('ready', () => {
  console.log('✅ Bot WhatsApp KUA siap digunakan!');
  console.log('📞 Bot sekarang dapat menerima dan membalas pesan.');
  console.log('🤖 Mode Bot:', getAIMode().toUpperCase());
  console.log('⏰ Waktu aktif:', new Date().toLocaleString('id-ID'));
  console.log('');
  console.log('🛑 Tekan CTRL+C untuk menghentikan bot');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Authenticating
client.on('authenticated', () => {
  console.log('🔐 Autentikasi berhasil!');
});

// Auth failure
client.on('auth_failure', (msg) => {
  console.error('❌ Autentikasi gagal:', msg);
  console.log('💡 Coba hapus folder .wwebjs_auth dan scan ulang');
});

// Handle disconnection
client.on('disconnected', (reason) => {
  console.log('⚠️  Bot terputus:', reason);
  console.log('🔄 Mencoba reconnect...');
});

// Handle incoming messages
client.on('message', async (msg) => {
  try {
    // Check if we should reply to this message
    if (!shouldReply(msg)) {
      return;
    }

    const incomingMessage = msg.body;
    const from = msg.from;
    const contact = await msg.getContact();
    const name = contact.pushname || contact.name || 'User';

    // Log incoming message
    console.log(`\n📩 Pesan masuk dari ${name} (${from}):`);
    console.log(`   "${incomingMessage}"`);

    // Get response (now async with AI support)
    const response = await handleMessage(incomingMessage, name);

    // Send reply
    await msg.reply(response);

    // Log outgoing message
    console.log(`✅ Balasan terkirim ke ${name}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error handling message:', error);
    
    // Send error message to user
    try {
      await msg.reply('Maaf, terjadi kesalahan. Silakan coba lagi atau ketik *MENU*');
    } catch (replyError) {
      console.error('❌ Error sending error message:', replyError);
    }
  }
});

// Handle message creation (for debugging)
client.on('message_create', (msg) => {
  if (msg.fromMe) {
    // Log bot's own messages
    const preview = msg.body.substring(0, 50);
    console.log(`📤 Bot mengirim: "${preview}${msg.body.length > 50 ? '...' : ''}"`);
  }
});

// Initialize the client
console.log('⚙️  Menginisialisasi client...');
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Menghentikan bot...');
  await client.destroy();
  console.log('✅ Bot dihentikan. Terima kasih!');
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
});

