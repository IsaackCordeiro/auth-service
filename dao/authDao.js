const db = require('../config/db');

exports.findByEmail = async (email) => {
  sql = 'SELECT id, nome, email, senha, role FROM usuarios WHERE email = ? AND vldAtivo = true';
  const [rows] = await db.query(sql, [email]);

  return rows[0] || null;
};