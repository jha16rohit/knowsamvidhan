import http from "http";

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

const sqlInjectionPayloads = [
  "' OR '1'='1",
  "' OR '1'='1' --",
  "admin' --",
  "1; DROP TABLE users;",
  "1' UNION SELECT * FROM users--",
  "'; EXEC xp_cmdshell('dir'); --",
  "' OR 1=1--",
  "1' AND '1'='1",
  "1' OR '1'='1' /*",
  "'; WAITFOR DELAY '00:00:05'--"
];

async function makeRequest(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: path,
      method: 'GET',
      headers: {
        'X-Test-Attack': 'sql-injection',
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
      ipAddress: ip || `192.168.1.${Math.floor(Math.random() * 255)}`,
      userAgent: 'TestBot/1.0',
      endpoint: '/api/articles'
    }, { 'Content-Type': 'application/json' });
  } catch (e) {
    console.log(`  Track error: ${e.message}`);
  }
}

async function simulateSQLInjection() {
  console.log('\n🟠 Testing SQL Injection Attack Simulation...\n');
  console.log('Sending various SQL injection payloads...\n');

  const results = [];
  
  for (let i = 0; i < sqlInjectionPayloads.length; i++) {
    const payload = sqlInjectionPayloads[i];
    const ip = `172.16.0.${i + 1}`;
    const testPaths = [
      `/api/articles?search=${encodeURIComponent(payload)}`,
      `/api/parts?filter=${encodeURIComponent(payload)}`,
      `/api/amendments?q=${encodeURIComponent(payload)}`
    ];

    for (const path of testPaths) {
      try {
        const result = await makeRequest(path, {
          'X-Attack-Payload': payload
        });
        results.push({ payload, path, status: result.status });
        console.log(`  Payload: "${payload.substring(0, 30)}..." on ${path} → Status ${result.status}`);
      } catch (e) {
        console.log(`  Error with payload: ${e.message}`);
      }
      
      await new Promise(r => setTimeout(r, 50));
    }
    
    if (i % 3 === 0) {
      await trackAttack('sql-injection', payload, ip);
    }
  }

  await trackAttack('sql-injection', '30 SQL injection payloads tested', '172.16.0.255');
  
  console.log('\n✅ SQL Injection Test Complete');
  console.log('   Check Security Dashboard > Threat Analysis for detected threats');
  console.log('   Check Security Dashboard > Auth Logs for suspicious requests\n');
  
  return results;
}

simulateSQLInjection().catch(console.error);