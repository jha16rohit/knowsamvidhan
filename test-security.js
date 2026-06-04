import http from "http";

const testEndpoint = (path, headers = {}) => {
  return new Promise((resolve) => {
    const url = new URL(path, 'http://localhost:3000');
    const req = http.request(url, { method: 'GET', headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', (e) => resolve({ status: 0, body: e.message }));
    req.end();
  });
};

(async () => {
  console.log('Testing security fixes...\n');
  
  const sql = await testEndpoint('/api/articles?search=%27%20OR%20%271%27%3D%271');
  console.log('SQL Injection: Status ' + sql.status);
  console.log('Body: ' + sql.body.substring(0, 200));
  
  console.log('\n---\n');
  
  const xss = await testEndpoint('/api/articles?title=%3Cscript%3Ealert%281%29%3C%2Fscript%3E');
  console.log('XSS: Status ' + xss.status);
  console.log('Body: ' + xss.body.substring(0, 200));
  
  console.log('\n---\n');
  
  const session = await testEndpoint('/api/articles', { 'Cookie': 'user_access_token=session_tampered_abc123xyz789' });
  console.log('Session Hijack: Status ' + session.status);
  console.log('Body: ' + session.body.substring(0, 200));
})();