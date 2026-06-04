# Security Attack Simulation Generator

This folder contains simulated attack tests to verify that security monitoring features are working correctly without causing actual harm to the system.

## ⚠️ Important Safety Notes

- **All attacks are SIMULATED** - No actual harm is caused
- Tests use safe, artificial data
- Endpoints include `X-Test-Attack` header for identification
- System should log and monitor without disruption

## 📁 Structure

```
generator/
├── index.js              # Main runner script
├── README.md             # This file
└── tests/
    ├── brute-force.js    # Brute force login attempts
    ├── sql-injection.js # SQL injection payload testing
    ├── xss-attack.js    # Cross-site scripting testing
    ├── ddos-simulation.js # High-volume request simulation
    ├── credential-stuffing.js # Leaked credentials testing
    ├── session-hijack.js # Stolen session tokens testing
    └── bot-detection.js # Bot swarm detection testing
```

## 🚀 Usage

### Prerequisites
```bash
# Ensure Node.js is installed and server is running on port 3000
npm run dev

# In a separate terminal, run the tests
node generator/index.js all
```

### Run All Tests
```bash
node generator/index.js all
```

### Run Specific Test
```bash
# Run test #1 (Brute Force)
node generator/index.js 1

# Run test #2 (SQL Injection)
node generator/index.js 2

# Available tests:
# 1. Brute Force Attack
# 2. SQL Injection
# 3. XSS Attack
# 4. DDoS Simulation
# 5. Credential Stuffing
# 6. Session Hijacking
# 7. Bot Detection
```

### List Available Tests
```bash
node generator/index.js --list
```

## 🔍 Verification

After running tests, verify security monitoring at:

1. **Threat Analysis**: `/security/threat_analysis`
2. **Rate Limiting**: `/security/rate-limiting`
3. **Auth Logs**: `/security/auth-logs`
4. **Fraud Monitoring**: `/security/fraud-monitoring`

## 🛡️ What Each Test Does

| Test | Simulates | Expected Monitoring |
|------|-----------|---------------------|
| Brute Force | 20 failed login attempts | Rate limiting blocks, auth logs recorded |
| SQL Injection | 30 malicious SQL payloads | Threat detection alerts |
| XSS Attack | 30 XSS payloads | Threat detection, input sanitization logs |
| DDoS | 150 requests from multiple sources | Rate limiting triggered, traffic logged |
| Credential Stuffing | 8 leaked credentials tested | Fraud monitoring alerts |
| Session Hijacking | 8 stolen session tokens used | Auth anomalies detected |
| Bot Detection | 10 automated bot user agents | Bot swarm detection alerts |

## 🔧 Customization

Edit individual test files to:
- Adjust number of requests
- Modify payloads
- Change target endpoints
- Add new attack vectors

## ✅ Verification Checklist

- [ ] Server remains responsive during tests
- [ ] Security dashboard shows detected attacks
- [ ] Auth logs capture suspicious activities
- [ ] Rate limiting triggers for excessive requests
- [ ] No actual data corruption or unauthorized access
- [ ] System recovers to normal after tests complete