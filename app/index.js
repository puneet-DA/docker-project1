const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

let isHealthy = true;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.send(`Application response. Database time: ${dbRes.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Application running, but database connection failed.');
  }
});

app.get('/health', (req, res) => {
  if (isHealthy) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('UNHEALTHY');
  }
});

app.get('/version', (req, res) => {
  res.send({ version: process.env.APP_VERSION || 'unknown' });
});

app.post('/break', (req, res) => {
  isHealthy = false;
  res.send('Application health set to UNHEALTHY');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});