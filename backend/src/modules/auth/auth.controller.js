const asyncHandler = require('../../utils/asyncHandler');
const service = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const usuario = await service.register(req.body);
  res.status(201).json(usuario);
});

const login = asyncHandler(async (req, res) => {
  const resultado = await service.login(req.body);
  res.status(200).json(resultado);
});

const me = asyncHandler(async (req, res) => {
  const usuario = await service.me(req.user.id_usuario);
  res.status(200).json(usuario);
});

module.exports = { register, login, me };
