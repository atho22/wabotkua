const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const QRCode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { handleMessage, shouldReply } = require('./utils/messageHandler');
const { initializeAI, getAIMode } = require('./utils/aiService');

console.log('🤖 Memulai Bot WhatsApp KUA...\n');

// Initialize AI
const aiInitialized = initializeAI();
if (!aiInitialized) {
  console.log('ℹ️  Bot berjalan dalam mode FAQ only (tanpa AI)');
}

// Setup Express server untuk serve QR code
const app = express();
const PORT = process.env.PORT || 3000;

let currentQR = null;
let qrDataURL = null;

// Serve QR code page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bot WhatsApp KUA - QR Code</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .container {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        h1 { margin: 0 0 10px 0; font-size: 28px; }
        .subtitle { margin: 0 0 20px 0; opacity: 0.9; font-size: 14px; }
        .status {
          padding: 10px 20px;
          border-radius: 10px;
          margin: 20px 0;
          font-weight: bold;
        }
        .status.waiting { background: rgba(255, 193, 7, 0.3); }
        .status.ready { background: rgba(76, 175, 80, 0.3); }
        .status.connected { background: rgba(33, 150, 243, 0.3); }
        #qr-container {
          background: white;
          padding: 20px;
          border-radius: 15px;
          display: inline-block;
          margin: 20px 0;
        }
        #qr-image { max-width: 300px; height: auto; display: block; }
        .instructions {
          text-align: left;
          margin: 20px 0;
          padding: 15px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          font-size: 14px;
        }
        .instructions li { margin: 8px 0; }
        .refresh-btn {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 15px;
          transition: all 0.3s;
        }
        .refresh-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🕌 Bot WhatsApp KUA</h1>
        <p class="subtitle">Scan QR Code untuk Login</p>
        
        <div id="status" class="status waiting">⏳ Menunggu QR Code...</div>
        
        <div id="qr-container" style="display: none;">
          <img id="qr-image" src="/qr" alt="QR Code">
        </div>
        
        <div class="instructions">
          <strong>📱 Cara Scan:</strong>
          <ol>
            <li>Buka WhatsApp di HP <strong>083879305916</strong></li>
            <li>Tap Menu (⋮) > <strong>Linked Devices</strong></li>
            <li>Tap <strong>"Link a Device"</strong></li>
            <li>Scan QR code di atas</li>
          </ol>
        </div>
        
        <button class="refresh-btn" onclick="location.reload()">🔄 Refresh Page</button>
        
        <p class="footer">Bot akan auto-refresh setiap 5 detik</p>
      </div>
      
      <script>
        function checkQR() {
          fetch('/qr-status')
            .then(r => r.json())
            .then(data => {
              const status = document.getElementById('status');
              const qrContainer = document.getElementById('qr-container');
              const qrImage = document.getElementById('qr-image');
              
              if (data.hasQR) {
                status.className = 'status ready';
                status.textContent = '✅ QR Code Siap! Scan Sekarang!';
                qrContainer.style.display = 'inline-block';
                qrImage.src = '/qr?' + Date.now(); // Force refresh
              } else if (data.connected) {
                status.className = 'status connected';
                status.textContent = '🎉 Bot Sudah Terhubung!';
                qrContainer.style.display = 'none';
              } else {
                status.className = 'status waiting';
                status.textContent = '⏳ Menunggu QR Code...';
                qrContainer.style.display = 'none';
              }
            })
            .catch(err => console.error('Error:', err));
        }
        
        // Check immediately
        checkQR();
        
        // Auto-refresh every 5 seconds
        setInterval(checkQR, 5000);
      </script>
    </body>
    </html>
  `);
});

// Serve QR code image
app.get('/qr', (req, res) => {
  if (qrDataURL) {
    const img = Buffer.from(qrDataURL.split(',')[1], 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
  } else {
    res.status(404).send('QR code not available yet');
  }
});

// QR status endpoint
app.get('/qr-status', (req, res) => {
  res.json({
    hasQR: qrDataURL !== null,
    connected: client && client.info !== null
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    bot: client ? 'initialized' : 'not initialized',
    ai: getAIMode()
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🌐 QR Code web server berjalan di port ${PORT}`);
  console.log(`📱 Buka browser: http://localhost:${PORT}`);
  console.log('');
});

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
  
  // Save current QR
  currentQR = qr;
  
  // Display QR in terminal
  try {
    qrcodeTerminal.generate(qr, { small: true });
  } catch (error) {
    console.log('⚠️  QR code tidak bisa ditampilkan di terminal');
  }
  
  // Generate QR Code as Data URL (for web)
  try {
    qrDataURL = await QRCode.toDataURL(qr, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    console.log('');
    console.log('✅ QR Code berhasil di-generate!');
    console.log('');
    console.log('🌐 BUKA BROWSER DAN AKSES:');
    if (process.env.RAILWAY_STATIC_URL) {
      console.log(`   🔗 https://${process.env.RAILWAY_STATIC_URL}`);
    } else if (process.env.RENDER_EXTERNAL_URL) {
      console.log(`   🔗 ${process.env.RENDER_EXTERNAL_URL}`);
    } else {
      console.log(`   🔗 http://localhost:${PORT}`);
    }
    console.log('');
    console.log('📱 Atau scan QR code di terminal (jika terlihat jelas)');
  } catch (error) {
    console.error('❌ Error generating QR code:', error.message);
  }
  
  // Also save as file (backup)
  try {
    await QRCode.toFile('qr-code.png', qr, {
      width: 400,
      margin: 2
    });
    fs.writeFileSync('qr-code.txt', qr);
  } catch (error) {
    // Ignore file save errors in ephemeral environments
  }
  
  console.log('');
  console.log('💡 Cara scan:');
  console.log('   1. Buka URL di atas di browser');
  console.log('   2. Buka WhatsApp di HP (083879305916)');
  console.log('   3. Tap Menu (⋮) > Linked Devices');
  console.log('   4. Tap "Link a Device"');
  console.log('   5. Scan QR code dari browser');
  console.log('');
});

// Client ready
client.on('ready', () => {
  // Clear QR code after connection
  currentQR = null;
  qrDataURL = null;
  
  console.log('✅ Bot WhatsApp KUA siap digunakan!');
  console.log('📞 Bot sekarang dapat menerima dan membalas pesan.');
  console.log('🤖 Mode Bot:', getAIMode().toUpperCase());
  console.log('⏰ Waktu aktif:', new Date().toLocaleString('id-ID'));
  console.log('');
  console.log('🌐 Web interface tetap aktif di port', PORT);
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

