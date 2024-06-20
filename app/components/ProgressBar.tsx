import React from "react";
import { Fila } from "../types/types";

interface ProgressBarProps {
  progresso: number;
  fila: Fila[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progresso, fila }) => {
  return (
    <>
      <div className="w-full h-8 rounded-md overflow-hidden  bg-gray-200">
        <div
          className="h-full bg-green-500 flex items-center justify-end"
          style={{ width: `${progresso}%` }}
        >
          {progresso > 0 ? (
            <span className="animate-pulse text-white pr-2 font-semibold">
              {">>>"}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
