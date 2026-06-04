import http from "http";

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

const leakedCredentials = [
  { email: 'john.doe@gmail.com', password: 'password123' },
  { email: 'admin@admin.com', password: 'admin123' },
  { email: 'test@test.com', password: 'test123' },
  { email: 'user@user.com', password: 'password' },
  { email: 'demo@demo.com', password: 'demo123' },
  { email: 'admin@gmail.com', password: '123456' },
  { email: 'testuser@yahoo.com', password: 'qwerty' },
  { email: 'admin123@company.com', password: 'admin123' }
];

async function makeRequest(path, method = 'GET', body = null, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Attack': 'credential-stuffing',
        ...extraHeaders
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
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function trackAttack(attackType, payload, ip = null) {
  try {
    await makeRequest('/api/security/track', 'POST', {
      attackType,
      payload,
      ipAddress: ip || `192.168.50.${Math.floor(Math.random() * 255)}`,
      userAgent: 'TestBot/1.0',
      endpoint: '/api/auth/login'
    }, { 'Content-Type': 'application/json' });
  } catch (e) {
    console.log(`  Track error: ${e.message}`);
  }
}

async function simulateCredentialStuffing() {
  console.log('\n🟣 Testing Credential Stuffing Attack Simulation...\n');
  console.log('Testing leaked credentials against login endpoint...\n');

  const results = [];
  
  for (let i = 0; i < leakedCredentials.length; i++) {
    const cred = leakedCredentials[i];
    const ip = `192.168.50.${i + 10}`;
    
    try {
      const result = await makeRequest('/api/auth/login', 'POST', {
        email: cred.email,
        password: cred.password
      }, { 'X-Client-IP': ip });
      
      results.push({ 
        email: cred.email, 
        status: result.status,
        success: result.status === 200 
      });
      
      const statusIcon = result.status === 200 ? '✓' : '✗';
      console.log(`  ${statusIcon} ${cred.email} → Status ${result.status}`);
      
    } catch (e) {
      console.log(`  ✗ ${cred.email} → Error: ${e.message}`);
      results.push({ email: cred.email, error: e.message });
    }
    
    await new Promise(r => setTimeout(r, 200));
  }

  const successful = results.filter(r => r.success).length;
  
  await trackAttack('credential-stuffing', `${leakedCredentials.length} leaked credentials tested`, '192.168.50.255');
  
  console.log('\n✅ Credential Stuffing Test Complete');
  console.log(`   Credentials Tested: ${leakedCredentials.length}`);
  console.log(`   Successful Logins: ${successful}`);
  console.log('   Check Security Dashboard > Fraud Monitoring for detected attacks');
  console.log('   Check Security Dashboard > Threat Analysis\n');
  
  return results;
}

simulateCredentialStuffing().catch(console.error);