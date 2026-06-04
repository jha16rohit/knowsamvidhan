import http from "http";

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

const botUserAgents = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
  'Python-urllib/3.11',
  'curl/7.88.1',
  'Wget/1.21.3',
  'Apache-HttpClient/4.5.14 (Java/17)',
  'Scrapy/2.7.0',
  'Bot/0.1 (Bot for GSC)',
  'python-requests/2.28.0'
];

async function makeRequest(path, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: path,
      method: 'GET',
      headers: {
        'X-Test-Attack': 'bot-swarm',
        'X-Request-Type': 'automated',
        ...extraHeaders
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode }));
    });

    req.on('error', (err) => {
      reject(new Error(err.code || 'Connection failed'));
    });
    req.end();
  });
}

async function trackAttack(attackType, payload, ip = null, userAgent = null) {
  try {
    await makeRequest('/api/security/track', 'POST', {
      attackType,
      payload,
      ipAddress: ip || `10.200.0.1`,
      userAgent: userAgent || 'BotDetector/1.0',
      endpoint: '/api/articles'
    }, { 'Content-Type': 'application/json' });
  } catch (e) {
    console.log(`  Track error: ${e.message}`);
  }
}

async function simulateBotSwarm() {
  console.log('\n⚫ Testing Bot Swarm Detection Simulation...\n');
  console.log('Sending requests with various bot user agents...\n');

  const results = [];
  const paths = [
    '/api/articles',
    '/api/parts',
    '/api/amendments',
    '/api/schedules',
    '/api/preamble',
    '/api/auth/login',
    '/api/feedback',
    '/api/user/analytics',
    '/api/admin/users',
    '/api/admin/analytics'
  ];

  for (let i = 0; i < botUserAgents.length; i++) {
    const userAgent = botUserAgents[i];
    const path = paths[i % paths.length];
    const ip = `10.200.0.${i + 1}`;
    
    try {
      const result = await makeRequest(path, {
        'User-Agent': userAgent,
        'X-Client-IP': ip
      });
      
      results.push({ 
        bot: userAgent.split('/')[0] || userAgent.split(' ')[0], 
        status: result.status 
      });
      
      console.log(`  Bot: ${userAgent.split('/')[0].substring(0, 30)} → ${path} → Status ${result.status}`);
      
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
    
    if (i % 3 === 0) {
      await trackAttack('bot-detection', `Bot detected: ${userAgent.split('/')[0]}`, ip, userAgent);
    }
    
    await new Promise(r => setTimeout(r, 100));
  }

  await trackAttack('bot-detection', `${botUserAgents.length} bot user agents tested`, '10.200.0.255', 'BotDetector/1.0');
  
  console.log('\n✅ Bot Swarm Detection Test Complete');
  console.log('   Check Security Dashboard > Threat Analysis for bot detection logs');
  console.log('   Check Security Dashboard > Rate Limiting for blocked bot traffic\n');
  
  return results;
}

simulateBotSwarm().catch(console.error);