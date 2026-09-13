import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'srv1641.hstgr.io',
  user: process.env.DB_USER || 'u872793003_matirmony',
  password: process.env.DB_PASSWORD || 'Admin@data2050#',
  database: process.env.DB_NAME || 'u872793003_matirmonytaj',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  connectTimeout: 20000,
});

export default pool;
