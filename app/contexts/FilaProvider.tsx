"use client";
import React, { createContext, FC, useState } from "react";
import { Fila, FilaContextType } from "../types/types";

const initialFila: Fila[] = [
  { senha: "ABC123", tempoDeAtendimento: 30 },
  { senha: "DEF456", tempoDeAtendimento: 45 },
  { senha: "GHI789", tempoDeAtendimento: 60 },
  { senha: "JKL012", tempoDeAtendimento: 70 },
  { senha: "MNZ456", tempoDeAtendimento: 80 },
  { senha: "JTV345", tempoDeAtendimento: 90 },
  { senha: "ZPX444", tempoDeAtendimento: 40 },
  { senha: "SDA234", tempoDeAtendimento: 50 },
];

export const FilaContext = createContext<FilaContextType>({
  ticketsDeSuporte: initialFila,
  adicionarFila: () => {},
  removerFila: () => {},
  senhaContext: "",
  removerSenha: () => {},
});

export const FilaProvider = ({ children }: any) => {
  const [ticketsDeSuporte, setTicketsDeSuporte] = useState<Fila[]>(initialFila);
  const [senhaContext, setSenha] = useState("");

  const adicionarFila = (novaEntrada: Fila) => {
    setTicketsDeSuporte([...ticketsDeSuporte, novaEntrada]);
    setSenha(novaEntrada.senha);
  };

  const removerFila = () => {
    ticketsDeSuporte.splice(0, 1);
    setTicketsDeSuporte([...ticketsDeSuporte]);
  };

  const removerSenha = () => {
    setSenha("");
  };

  return (
    <FilaContext.Provider
      value={{
        ticketsDeSuporte,
        senhaContext,
        adicionarFila,
        removerFila,
        removerSenha,
      }}
    >
      {children}
    </FilaContext.Provider>
  );
};
