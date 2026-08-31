function generarCodigo(siguienteNumero) {
  return `EMG-${String(siguienteNumero).padStart(4, '0')}`;
}

module.exports = generarCodigo;
