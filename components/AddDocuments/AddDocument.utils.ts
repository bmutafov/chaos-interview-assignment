export function lengthValidator(
  minLength: number
): (value: string) => string | null {
  return (value) =>
    value.length > minLength
      ? null
      : `Documents must be at least ${minLength} characters long`;
}
