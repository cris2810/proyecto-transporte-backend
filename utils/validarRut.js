function validarRut(rut) {
    if (!rut || typeof rut !== 'string') return false;
    const rutClean = rut.replace(/[^0-9kK]/g, '');
    if (rutClean.length < 8) return false;
  
    let rutBody = rutClean.slice(0, -1);
    let rutDv = rutClean.slice(-1).toUpperCase();
  
    let sum = 0;
    let multiplier = 2;
  
    for (let i = rutBody.length - 1; i >= 0; i--) {
      sum += rutBody.charAt(i) * multiplier;
      multiplier = (multiplier + 1) % 8 || 2;
    }
  
    let dvExpected = 11 - (sum % 11);
    if (dvExpected === 11) dvExpected = '0';
    else if (dvExpected === 10) dvExpected = 'K';
    else dvExpected = dvExpected.toString();
  
    return dvExpected === rutDv;
  }
  
  module.exports = validarRut;
  