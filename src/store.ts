import {create} from 'zustand';

interface NameState {
  name: string;
  setName: (name: string) => void;
  loadNameFromStorage: () => void;
}
interface PasStore {
  passwords: string[];
  loadPasswordsFromStorage: () => void;
  addPassword: (password: string) => void;
}

export const useNameStore = create<NameState>(set => ({
  name: '',
  setName: (name: string) => {
    set({name});
    localStorage.setItem('name', name);
  },
  loadNameFromStorage: () => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      set({name: storedName});
    }
  },
}));

export const usePasStore = create<PasStore>(set => ({
  passwords: [],
  addPassword: (password: string) => {
    set(state => {
      const updatedPasswords = [...state.passwords, password];
      localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      return {passwords: updatedPasswords};
    });
  },
  loadPasswordsFromStorage: () => {
    const storedPasswords = localStorage.getItem('passwords');
    if (storedPasswords) {
      set({passwords: JSON.parse(storedPasswords)});
    }
  },
}));
