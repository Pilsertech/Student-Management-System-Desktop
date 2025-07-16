const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const CONFIG_FILE = path.join(__dirname, '../config/config.php');
const SQL_FILE = path.join(__dirname, '../sql/install.sql');

async function handleInstall(req, res) {
    const { hostname, db_user, db_pass, db_name } = req.body;
    if (!hostname || !db_user || !db_name) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    let connection;
    try {
        connection = await mysql.createConnection({
            host: hostname,
            user: db_user,
            password: db_pass,
            database: db_name,
            multipleStatements: true
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Unable to connect to database.', error: err.message });
    }

    const dbConfig = `
<?php
define('db_host', '${hostname}');
define('db_user', '${db_user}');
define('db_pass', '${db_pass}');
define('db_name', '${db_name}');
?>
`;
    try {
        fs.writeFileSync(CONFIG_FILE, dbConfig, { encoding: 'utf8' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to write config file.', error: err.message });
    }

    try {
        const sql = fs.readFileSync(SQL_FILE, 'utf8');
        const statements = sql.split(/;\s*[\r\n]+/).map(s => s.trim()).filter(s => s.length > 0);
        for (const stmt of statements) {
            await connection.query(stmt);
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to import SQL schema.', error: err.message });
    } finally {
        await connection.end();
    }

    return res.json({ success: true, admin_user: "admin", admin_pass: "admin" });
}

module.exports = { handleInstall };