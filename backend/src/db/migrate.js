const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function migrate() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  try {
    await pool.query(schema);
    console.log('Migración ejecutada correctamente.');
  } catch (err) {
    console.error('Error al ejecutar la migración:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

migrate();
