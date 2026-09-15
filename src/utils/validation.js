// Reglas de contraseña: 8-16 caracteres, mayúscula, minúscula, número y símbolo.
export function validatePassword(pass) {
  const minLength = 8;
  const maxLength = 16;
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

  return (
    pass.length >= minLength &&
    pass.length <= maxLength &&
    hasUpper &&
    hasLower &&
    hasNumber &&
    hasSpecial
  );
}

export function generateCaptcha() {
  return {
    num1: Math.floor(Math.random() * 10),
    num2: Math.floor(Math.random() * 10),
  };
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
