import create from "zustand";

interface SearchState {
  input: string;
  error: string;
  setInput: (input: string) => void;
  setError: (error: string) => void;
  validateInput: (input: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  input: "",
  error: "",
  setInput: (input) => set({ input }),
  setError: (error) => set({ error }),
  validateInput: (input) => {
    if (input === "") {
      set({ error: "O campo não pode buscar vazio." });
    } else if (/^[a-zA-Z]+$/.test(input) || /^\d+$/.test(input)) {
      set({ error: "" });
    } else {
      set({ error: "Digite apenas letras OU apenas números." });
    }
  },
}));

export default useSearchStore;
