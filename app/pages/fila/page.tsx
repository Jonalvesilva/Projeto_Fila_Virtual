"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FilaContext } from "../../contexts/FilaProvider";
import { converterMinutosParaHoras } from "../../functions/minutosToHoras";
import { somarTemposDeAtendimento } from "../../functions/somarTempoAtendimento";
import ProgressBar from "@/app/components/ProgressBar";

export default function Fila() {
  const { ticketsDeSuporte, removerFila, senhaContext } =
    useContext(FilaContext);
  const [senha, setSenha] = useState("");
  const [ultimaSenha, setUltimaSenha] = useState("ZYX098");
  const [progresso, setProgresso] = useState(0);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (senhaContext != "") {
      if (ticketsDeSuporte.length > 0) {
        setSenha(ticketsDeSuporte[ticketsDeSuporte.length - 1].senha);
        setTotal(ticketsDeSuporte.length);
        setProgresso(0);
      }
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (senha == ultimaSenha) {
      router.push("/pages/home");
    }
    if (senhaContext == "") {
      router.push("/");
    }

    if (ticketsDeSuporte.length > 0) {
      const { senha, tempoDeAtendimento } = ticketsDeSuporte[0];
      const tempo = tempoDeAtendimento * 100;
      const valor =
        total != 0 ? 100 - (ticketsDeSuporte.length / total) * 100 : 0;
      setUltimaSenha(senha);
      setProgresso(valor);
      console.log(valor, ticketsDeSuporte.length, total);

      const timer = setTimeout(() => {
        removerFila();
      }, tempo);

      return () => clearTimeout(timer);
    }
  }, [ticketsDeSuporte]);

  return (
    <main className="h-screen min-h-[700px] w-full flex items-center justify-center bg-gradient-radial from-green-700 to-green-900">
      <div className="h-[480px] md:h-[450px] w-[90%] flex flex-col gap-y-10 items-center max-w-screen-sm rounded-xl bg-white p-4">
        <div className="w-[200px]">
          <img src="/fluminense.svg" alt="fluminense" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-center">
            Atendimento Central Tricolor
          </h2>
        </div>
        <div className="w-[95%] max-w-screen-sm flex flex-col p-6 border rounded-xl border-gray-300">
          <div className="flex justify-between pb-2">
            <h2>
              Senha:{" "}
              <span className="font-semibold text-green-700">{`${senha}`}</span>
            </h2>
            <h2>{Math.ceil(progresso)}%</h2>
          </div>
          <ProgressBar progresso={progresso} fila={ticketsDeSuporte} />
          <div className="flex justify-end pt-1">
            <h2 className="text-xs text-gray-700">
              Tempo estimado:
              {converterMinutosParaHoras(
                somarTemposDeAtendimento(ticketsDeSuporte)
              )}
            </h2>
          </div>
        </div>
        <div>
          <h2>
            Ultima senha chamada:{" "}
            <span className="text-red-600 font-semibold ">{ultimaSenha}</span>
          </h2>
        </div>
      </div>
    </main>
  );
}
