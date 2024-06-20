"use client";
import { IoMdTime } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FilaContext } from "./contexts/FilaProvider";
import { gerarSenha } from "./functions/gerarSenha";
import { converterMinutosParaHoras } from "./functions/minutosToHoras";
import { somarTemposDeAtendimento } from "./functions/somarTempoAtendimento";

export default function Home() {
  const { ticketsDeSuporte, adicionarFila, removerFila } =
    useContext(FilaContext);

  const adicionar = (entrada?: number) => {
    const tempo = entrada ?? Math.floor(Math.random() * 60) + 1;
    const novo = {
      senha: gerarSenha(6),
      tempoDeAtendimento: tempo,
    };
    adicionarFila(novo);
  };

  useEffect(() => {
    const index = Math.floor(Math.random() * 2); // Gera 0 ou 1 aleatoriamente

    if (index === 0) {
      const adicionarTimer = setTimeout(() => {
        adicionar();
      }, 6000);

      return () => clearTimeout(adicionarTimer);
    } else {
      const removerTimer = setTimeout(() => {
        removerFila();
      }, 6000);

      return () => clearTimeout(removerTimer);
    }
  }, [ticketsDeSuporte]);

  return (
    <main className="h-screen min-h-[700px] w-full flex items-center justify-center bg-gradient-radial from-green-700 to-green-900">
      <div className="h-[600px] md:h-[450px] w-[90%] flex flex-col gap-y-10 items-center max-w-screen-sm rounded-xl bg-white p-4">
        <div className="w-[200px]">
          <img src="/fluminense.svg" alt="fluminense" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-center">
            Atendimento Central Tricolor
          </h2>
        </div>
        <div className="w-full flex flex-col gap-y-4 md:flex-row ">
          <div className="w-[90%] mx-auto h-[100px] flex items-center justify-center gap-x-10 shadow-sm shadow-gray-600 md:w-[200px]">
            <IoMdTime size={50} className="text-green-600" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium">
                {converterMinutosParaHoras(
                  somarTemposDeAtendimento(ticketsDeSuporte)
                )}
              </h2>
              <h3 className="text-md">minutos</h3>
              <p className="text-sm text-center text-gray-600">estimados</p>
            </div>
          </div>
          <div className="w-[90%] mx-auto h-[100px] flex items-center justify-center gap-x-10 shadow-sm shadow-gray-600 md:w-[200px]">
            <FaUserGroup size={50} className="text-green-600" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium">{ticketsDeSuporte.length}</h2>
              <h3 className="text-md">pessoas</h3>
              <p className="text-sm text-center text-gray-600">esperando</p>
            </div>
          </div>
        </div>
        <Link
          href="/pages/fila"
          onClick={() => adicionar(0)}
          className="p-2 bg-green-800 w-[90%] md:w-[85%] text-white rounded-xl flex items-center justify-center gap-x-4"
        >
          Entrar na Fila{" "}
          {<PiPaperPlaneRightBold size={20} className="text-white" />}
        </Link>
      </div>
    </main>
  );
}
