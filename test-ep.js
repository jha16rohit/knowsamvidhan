import http from "http";

const testEndpoint = (path) => {
  return new Promise((resolve) => {
    const url = new URL(path, 'http://localhost:3000');
    const req = http.request(url, { method: 'GET' }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', (e) => resolve({ status: 0, body: e.message }));
    req.end();
  });
};

(async () => {
  const endpoints = [
    '/api/amendments',
    '/api/preamble', 
    '/api/schedules',
    '/'
  ];
  
  for (const ep of endpoints) {
    const result = await testEndpoint(ep);
    console.log(`${ep}: ${result.status}`);
  }
})();