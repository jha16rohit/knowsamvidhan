import http from "http";

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

async function makeRequest(path, extraHeaders = {}) {
  return new Promise((resolve) => {
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: path,
      method: 'GET',
      headers: {
        'X-Test-Attack': 'ddos',
        'X-Request-ID': Math.random().toString(36).substring(7),
        ...extraHeaders
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode }));
    });

    req.on('error', (e) => resolve({ error: e.code || 'Connection failed' }));
    req.end();
  });
}

async function trackAttack(attackType, payload, ip = null) {
  try {
    await makeRequest('/api/security/track', {
      'X-Track-Attack': attackType,
      'Content-Type': 'application/json'
    });
    const data = JSON.stringify({
      attackType,
      payload,
      ipAddress: ip || '10.100.0.1',
      userAgent: 'DDoS-Simulator/1.0',
      endpoint: '/api/articles'
    });
    await makeRequest('/api/security/track', {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    });
  } catch (e) {
    console.log(`  Track error: ${e.message}`);
  }
}

async function simulateDDoS() {
  console.log('\n🔵 Testing DDoS (Distributed Denial of Service) Simulation...\n');
  console.log('Simulating high-volume requests from multiple sources...\n');

  const REQUESTS_PER_BATCH = 50;
  const BATCHES = 3;
  const paths = [
    '/api/articles',
    '/api/parts',
    '/api/amendments',
    '/api/schedules',
    '/api/preamble'
  ];

  let totalRequests = 0;
  let successfulRequests = 0;
  let failedRequests = 0;

  for (let batch = 1; batch <= BATCHES; batch++) {
    console.log(`  Batch ${batch}/${BATCHES}: Sending ${REQUESTS_PER_BATCH} requests...`);
    
    const promises = [];
    for (let i = 0; i < REQUESTS_PER_BATCH; i++) {
      const path = paths[Math.floor(Math.random() * paths.length)];
      const ip = `10.100.${Math.floor(batch)}.${i + 1}`;
      promises.push(makeRequest(path, { 'X-Client-IP': ip }));
    }

    const results = await Promise.all(promises);
    
    results.forEach(r => {
      totalRequests++;
      if (r.error) {
        failedRequests++;
      } else {
        successfulRequests++;
      }
    });

    console.log(`    Completed: ${successfulRequests} success, ${failedRequests} failed`);
    await new Promise(r => setTimeout(r, 500));
  }

  await trackAttack('ddos', `150 requests from 3 source subnets`, '10.100.3.255');
  
  console.log('\n✅ DDoS Simulation Complete');
  console.log(`   Total Requests: ${totalRequests}`);
  console.log(`   Successful: ${successfulRequests}`);
  console.log(`   Failed: ${failedRequests}`);
  console.log('   Check Security Dashboard > Rate Limiting for blocked requests');
  console.log('   Check Security Dashboard > Threat Analysis for DDoS detection\n');
  
  return { totalRequests, successfulRequests, failedRequests };
}

simulateDDoS().catch(console.error);