export const validateSearchInput = (
  input: string,
  setError: (error: string) => void
): void => {
  const trimmedInput = input.trim();

  if (trimmedInput === "") {
    return setError("O campo não pode estar vazio.");
  }

  const validInputRegex = /^[a-zA-Z]+$|^\d+$/;
  if (!validInputRegex.test(trimmedInput)) {
    return setError("Digite apenas letras OU apenas números.");
  }

  setError("");
};
