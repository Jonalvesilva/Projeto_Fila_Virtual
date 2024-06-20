"use client";
import { FilaContext } from "../../contexts/FilaProvider";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { ticketsDeSuporte, senhaContext, removerSenha } =
    useContext(FilaContext);
  const router = useRouter();

  useEffect(() => {
    if (senhaContext != "" && ticketsDeSuporte.length == 0) {
      removerSenha();
    } else {
      router.push("/");
    }
  }, []);

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
        <div>
          <h2 className="text-center">Sua vez chegou</h2>
          <img src="/cano.png" className="w-[250px]" />
        </div>
      </div>
    </main>
  );
}
