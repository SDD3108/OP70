export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function validateAuthForm(values, mode = "login") {
  const errors = {};
  if (mode == "register" && !values.name?.trim()) errors.name = "Введите имя";
  if (!isValidEmail(values.email)) errors.email = "Введите корректный email";
  if (!values.password) errors.password = "Введите пароль";
  else if (mode == "register" && values.password.length < 8) {
    errors.password = "Пароль должен содержать минимум 8 символов";
  }
  return errors;
}
