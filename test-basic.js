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
  // Test without any params to see if server is working
  const basic = await testEndpoint('/api/articles');
  console.log('Basic /api/articles: ' + basic.status);
  console.log('Body: ' + basic.body.substring(0, 100));
})();