import { spawn } from "child_process";
import * as http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_HOST = "localhost";
const TARGET_PORT = 3000;

const REPORT_DIR = path.join(__dirname, "report");

// Create report directory if not exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// Generate timestamped report filename
const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, "-");

const REPORT_FILE = path.join(
  REPORT_DIR,
  `security-report-${timestamp}.txt`
);

let reportContent = "";

function log(message = "") {
  console.log(message);
  reportContent += message + "\n";
}

function saveReport() {
  fs.writeFileSync(REPORT_FILE, reportContent, "utf8");
  console.log(`\n📄 Report saved to:\n${REPORT_FILE}\n`);
}

function checkServer() {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: TARGET_HOST,
        port: TARGET_PORT,
        path: "/api/articles",
        method: "GET",
      },
      (res) => {
        log(`✅ Server is running on http://${TARGET_HOST}:${TARGET_PORT}`);
        log(`Server Status Code: ${res.statusCode}\n`);
        resolve(true);
      }
    );

    req.on("error", () => {
      log(`❌ Server not running on http://${TARGET_HOST}:${TARGET_PORT}`);
      log("Please start the server with: npm run dev\n");

      saveReport();
      process.exit(1);
    });

    req.end();
  });
}

const tests = [
  {
    name: "Brute Force Attack",
    file: "brute-force.js",
    description: "Simulates multiple failed login attempts",
  },
  {
    name: "SQL Injection",
    file: "sql-injection.js",
    description: "Tests SQL injection payload detection",
  },
  {
    name: "XSS Attack",
    file: "xss-attack.js",
    description: "Tests cross-site scripting detection",
  },
  {
    name: "DDoS Simulation",
    file: "ddos-simulation.js",
    description: "Simulates high-volume attack",
  },
  {
    name: "Credential Stuffing",
    file: "credential-stuffing.js",
    description: "Tests leaked credentials against login",
  },
  {
    name: "Session Hijacking",
    file: "session-hijack.js",
    description: "Tests stolen session token usage",
  },
  {
    name: "Bot Detection",
    file: "bot-detection.js",
    description: "Tests automated bot detection",
  },
];

function runTest(test) {
  return new Promise((resolve) => {
    log(`\n${"=".repeat(60)}`);
    log(`RUNNING: ${test.name}`);
    log(`DESCRIPTION: ${test.description}`);
    log(`${"=".repeat(60)}\n`);

    const child = spawn(
      "node",
      [path.join(__dirname, "tests", test.file)],
      {
        stdio: ["inherit", "pipe", "pipe"],
      }
    );

    child.stdout.on("data", (data) => {
      const output = data.toString();
      process.stdout.write(output);
      reportContent += output;
    });

    child.stderr.on("data", (data) => {
      const error = data.toString();
      process.stderr.write(error);
      reportContent += error;
    });

    child.on("close", (code) => {
      log(`\nTest Exit Code: ${code}`);
      log(
        code === 0
          ? `✅ ${test.name} COMPLETED`
          : `❌ ${test.name} FAILED`
      );

      resolve(code);
    });
  });
}

async function runAllTests() {
  log("\n");
  log("╔════════════════════════════════════════════════════════════╗");
  log("║       SECURITY ATTACK SIMULATION TEST SUITE                ║");
  log("║                                                            ║");
  log("║  This suite tests security monitoring capabilities         ║");
  log("║  WITHOUT causing actual harm to the system                 ║");
  log("╚════════════════════════════════════════════════════════════╝");

  log(`\n🕒 Started At: ${new Date().toLocaleString()}\n`);

  await checkServer();

  log("\n📋 Available Tests:");

  tests.forEach((test, i) => {
    log(`  ${i + 1}. ${test.name} - ${test.description}`);
  });

  const args = process.argv.slice(2);

  if (args.length > 0 && args[0] === "--list") {
    log("\n✅ Use: node index.js [test-number|all]");
    saveReport();
    process.exit(0);
  }

  if (args.length > 0 && args[0] !== "all") {
    const testNum = parseInt(args[0]);

    if (testNum >= 1 && testNum <= tests.length) {
      await runTest(tests[testNum - 1]);
    } else {
      log(`Invalid test number. Choose 1-${tests.length}`);
    }
  } else {
    log("\n⚠️ Running all tests sequentially...\n");
    await runAllSequentially();
  }

  saveReport();
}

async function runAllSequentially() {
  for (let i = 0; i < tests.length; i++) {
    await runTest(tests[i]);

    await new Promise((r) => setTimeout(r, 1000));
  }

  log("\n");
  log("╔════════════════════════════════════════════════════════════╗");
  log("║                    ALL TESTS COMPLETE                      ║");
  log("╚════════════════════════════════════════════════════════════╝");

  log("\n📊 After running tests, verify security monitoring:");
  log("   1. Go to /security/threat_analysis");
  log("   2. Check /security/rate-limiting");
  log("   3. Review /security/auth-logs");
  log("   4. Check /security/fraud-monitoring");

  log(`\n🕒 Completed At: ${new Date().toLocaleString()}`);
}

runAllTests().catch((err) => {
  console.error(err);
  reportContent += `\nERROR:\n${err.stack}\n`;

  saveReport();
});