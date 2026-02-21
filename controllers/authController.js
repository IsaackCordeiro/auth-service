const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const {email, senha} = req.body;

    if (!email || !senha) {
      return res.status(400).json({mensagem: 'E-mail e senha são obrigatórios'});
    }

    const token = await authService.login(email, senha);

    res.status(200).json({
      mensagem: 'Autenticação bem-sucedida',
      token: token
    });
  } catch (error) {
    if (error.message === 'Credenciais inválidas') {
            return res.status(401).json({ mensagem: error.message });
        }
        res.status(500).json({ erro: error.message });
  }
};