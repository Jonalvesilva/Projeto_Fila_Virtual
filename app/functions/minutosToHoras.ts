export const converterMinutosParaHoras = (minutos: number): string => {
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  return `${horas}:${minutosRestantes < 10 ? "0" : ""}${minutosRestantes}`;
};
