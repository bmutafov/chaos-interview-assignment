export function lengthValidator(
  minLength: number
): (value: string) => string | null {
  return (value) =>
    value.length > minLength
      ? null
      : `Documents must be at least ${minLength} characters long`;
}

export function emailValidator(value: string) {
  return /^\S+@\S+$/.test(value) ? null : "Invalid email";
}
