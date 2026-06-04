import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const client = await pool.connect();
    console.log('Database connection successful!');
    
    // Test a simple query
    const result = await client.query('SELECT NOW() as now');
    console.log('Current time from database:', result.rows[0].now);
    
    client.release();
    await pool.end();
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testConnection();