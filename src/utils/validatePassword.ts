import zxcvbn from "zxcvbn";

// returns error msg (string) or null (valid passoword)
export function validatePassword(password: string): string | null {
  const score = zxcvbn(password).score;

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must include a lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include an uppercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must include a number.";
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must include a special character.";
  }

  if (/\s/.test(password)) {
    return "Password must not contain spaces.";
  }

  if (score < 3) {
    return "Password is too weak — try making it longer or more complex.";
  }

  return null;
}

export function getPasswordChecks(password: string) {
  const score = zxcvbn(password).score;

  return {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
    noSpaces: !/\s/.test(password),
    strongEnough: score >= 3,
  };
}

export function isPasswordValid(password: string): boolean {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,128}$/;
  return strongRegex.test(password);
}
