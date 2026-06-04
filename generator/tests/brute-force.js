import http from "http";

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

async function makeRequest(path, method = 'GET', body = null, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Attack': 'brute-force',
        ...extraHeaders
      }
    };

    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });

    req.on('error', (err) => {
      reject(new Error(err.code || 'Connection failed'));
    });
    
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function trackAttack(attackType, payload, ip = null) {
  try {
    await makeRequest('/api/security/track', 'POST', {
      attackType,
      payload,
      ipAddress: ip || `192.168.1.${Math.floor(Math.random() * 255)}`,
      userAgent: 'TestBot/1.0',
      endpoint: '/api/auth/login'
    });
  } catch (e) {
    console.log(`  Track error: ${e.message}`);
  }
}

async function simulateBruteForce() {
  console.log('\n🔴 Testing Brute Force Attack Simulation...\n');
  console.log('Simulating 20 failed login attempts...\n');

  const results = [];
  
  for (let i = 1; i <= 20; i++) {
    const email = `attacker${i}@test.com`;
    const ip = `10.0.0.${i}`;
    try {
      const result = await makeRequest('/api/auth/login', 'POST', {
        email: email,
        password: 'wrongpassword'
      });
      results.push({ attempt: i, status: result.status });
      console.log(`  Attempt ${i}: Status ${result.status}`);
      
      if (i % 5 === 0) {
        await trackAttack('brute-force', `email=${email}&attempts=${i}`, ip);
      }
    } catch (e) {
      results.push({ attempt: i, error: e.message });
      console.log(`  Attempt ${i}: Error - ${e.message}`);
    }
    
    await new Promise(r => setTimeout(r, 100));
  }

  await trackAttack('brute-force', '20 failed login attempts from multiple IPs', '10.0.0.255');
  
  console.log('\n✅ Brute Force Test Complete');
  console.log('   Check Security Dashboard > Rate Limiting to see blocked attempts');
  console.log('   Check Security Dashboard > Auth Logs for failed login records\n');
  
  return results;
}

simulateBruteForce().catch(console.error);