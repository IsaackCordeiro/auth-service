const authService = require('../services/authService');
const authDao = require('../dao/authDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mocks
jest.mock('../dao/authDao');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe ('Auth Service - Testes Unitários de Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test ('Deve retornar um JWT Token quando e-mail e senha estivere corretos', async () => {
    const mockUsuario = {
      id: 1, 
      email: 'admin@email.com',
      senha: 'senha_com_hash'
    };

    authDao.findByEmail.mockResolvedValue(mockUsuario);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockResolvedValue('jwt_falso');

    const token = await authService.login('admin@email.com', 'senha');

    expect(token).toBe('jwt_falso');
    expect(authDao.findByEmail).toHaveBeenCalledWith('admin@email.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('senha', 'senha_com_hash');
    expect(jwt.sign).toHaveBeenCalled();
  });

  test('Deve estourar erro se a senha estiver incorreta', async () => {
    const mockUsuario = {
      id: 1, 
      email: 'admin@email.com',
      senha: 'senha_com_hash'
    };

    authDao.findByEmail.mockResolvedValue(mockUsuario);

    bcrypt.compare.mockResolvedValue(false);

    await expect (authService.login('admin@email.com', 'senhaErrada'))
      .rejects.toThrow('Credenciais inválidas');
    
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});