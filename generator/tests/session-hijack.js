import http from "http";

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

const stolenSessionTokens = [
  'session_abc123def456',
  'session_xyz789uvw012',
  'session_invalid_token_1',
  'session_tampered_abc123',
  'session_expired_20240101',
  'session_forged_session_key',
  'session_hijacked_token_xyz',
  'random_invalid_session_123'
];

async function makeRequest(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: path,
      method: 'GET',
      headers: {
        'X-Test-Attack': 'session-hijacking',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });

    req.on('error', (err) => {
      reject(new Error(err.code || 'Connection failed'));
    });
    req.end();
  });
}

async function trackAttack(attackType, payload, ip = null) {
  try {
    await makeRequest('/api/security/track', 'POST', {
      attackType,
      payload,
      ipAddress: ip || `192.168.70.${Math.floor(Math.random() * 255)}`,
      userAgent: 'TestBot/1.0',
      endpoint: '/api/auth/profile'
    }, { 'Content-Type': 'application/json' });
  } catch (e) {
    console.log(`  Track error: ${e.message}`);
  }
}

async function simulateSessionHijacking() {
  console.log('\n🟢 Testing Session Hijacking Attack Simulation...\n');
  console.log('Attempting requests with stolen/tampered session tokens...\n');

  const results = [];
  const protectedPaths = [
    '/api/auth/profile',
    '/api/auth/login',
    '/api/user/analytics',
    '/api/parts'
  ];

  for (let i = 0; i < stolenSessionTokens.length; i++) {
    const token = stolenSessionTokens[i];
    const path = protectedPaths[i % protectedPaths.length];
    const ip = `192.168.70.${i + 1}`;
    
    try {
      const result = await makeRequest(path, {
        'Cookie': `sessionToken=${token}`,
        'X-Session-Token': token,
        'X-Client-IP': ip
      });
      
      results.push({ token: token.substring(0, 20) + '...', status: result.status });
      console.log(`  Attempt with token: ${token.substring(0, 20)}... → Status ${result.status}`);
      
    } catch (e) {
      console.log(`  Error: ${e.message}`);
      results.push({ token: token.substring(0, 20) + '...', error: e.message });
    }
    
    await new Promise(r => setTimeout(r, 100));
  }

  await trackAttack('session-hijack', `${stolenSessionTokens.length} stolen session tokens tested`, '192.168.70.255');
  
  console.log('\n✅ Session Hijacking Test Complete');
  console.log('   Check Security Dashboard > Auth Logs for suspicious session activity');
  console.log('   Check Security Dashboard > Threat Analysis for detected hijacking attempts\n');
  
  return results;
}

simulateSessionHijacking().catch(console.error);