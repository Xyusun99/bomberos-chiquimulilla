const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../../utils/ApiError');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/env');
const repository = require('./auth.repository');

const SALT_ROUNDS = 10;
const ROL_POR_DEFECTO = 'Solicitante';

async function register({ nombre, correo, telefono, password }) {
  const rol = await repository.obtenerRolPorNombre(ROL_POR_DEFECTO);
  if (!rol) {
    throw new ApiError(500, 'no se pudo registrar el usuario');
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    return await repository.crearUsuario({
      nombre,
      correo,
      telefono,
      password_hash,
      id_rol: rol.id_rol,
    });
  } catch (err) {
    if (err.code === '23505') {
      throw new ApiError(409, 'correo ya registrado');
    }
    throw err;
  }
}

async function login({ correo, password }) {
  const usuario = await repository.obtenerUsuarioPorCorreo(correo);
  if (!usuario) {
    throw new ApiError(401, 'credenciales inválidas');
  }

  if (usuario.estado === false) {
    throw new ApiError(403, 'cuenta desactivada');
  }

  const passwordValido = await bcrypt.compare(password, usuario.password_hash);
  if (!passwordValido) {
    throw new ApiError(401, 'credenciales inválidas');
  }

  const accessToken = jwt.sign(
    { id_usuario: usuario.id_usuario, id_rol: usuario.id_rol },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    accessToken,
    usuario: {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      id_rol: usuario.id_rol,
    },
  };
}

async function me(id_usuario) {
  const usuario = await repository.obtenerUsuarioPorId(id_usuario);
  if (!usuario) {
    throw new ApiError(401, 'token inválido');
  }
  return usuario;
}

module.exports = { register, login, me };
