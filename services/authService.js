const authDao = require('../dao/authDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (email, senha) => {
  const user = await authDao.findByEmail(email);

  if (!user){
    throw new Error ('Credenciais inválidas');
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);

  if(!senhaValida){
    throw new Error ('Credenciais inválidas');
  }

  const payload = {
    id: user.id,
    role: user.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });

  return token;
};