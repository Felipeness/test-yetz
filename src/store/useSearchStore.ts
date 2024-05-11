import { create } from "zustand";
import { validateSearchInput } from "../utils/validateSearchInput";
import { SearchState } from "../types/searchState";

const useSearchStore = create<SearchState>((set) => ({
  input: "",
  error: "",
  setInput: (input) => set((state) => ({ ...state, input })),
  setError: (error) => set((state) => ({ ...state, error })),
  validateInput: (input) => {
    validateSearchInput(input, (error) => {
      set((state) => ({ ...state, error }));
    });
  },
}));

export default useSearchStore;
