// utils/validarRut.js

export const validarRut = (rut) => {
    // Limpiar formato
    rut = rut.replace(/[.-]/g, '');

    // Validar formato general
    if (!/^[0-9]{7,8}[0-9kK]$/.test(rut)) {
        return false;
    }

    // Extraer dígito verificador
    let dv = rut.slice(-1).toLowerCase();
    let num = parseInt(rut.slice(0, -1));

    // Calcular dígito verificador esperado
    let suma = 0;
    let multiplo = 2;

    while (num > 0) {
        suma += (num % 10) * multiplo;
        num = Math.floor(num / 10);
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 10 ? 'k' : dvEsperado === 11 ? 0 : dvEsperado;

    // Comparar dígito verificador
    return dv == dvEsperado;
};
