import { createContext } from "react";

export interface Fila {
  senha: string;
  tempoDeAtendimento: number;
}

export interface FilaContextType {
  ticketsDeSuporte: Fila[];
  adicionarFila: (fila: Fila) => void;
  removerFila: () => void;
  senhaContext: string;
  removerSenha: () => void;
}

export const FilaContext = createContext<FilaContextType>({
  ticketsDeSuporte: [],
  adicionarFila: () => {},
  removerFila: () => {},
  senhaContext: "",
  removerSenha: () => {},
});
