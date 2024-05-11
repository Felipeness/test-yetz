export interface SearchState {
  input: string;
  error: string;
  setInput: (input: string) => void;
  setError: (error: string) => void;
  validateInput: (input: string) => void;
}
