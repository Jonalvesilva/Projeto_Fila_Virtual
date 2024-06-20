export const somarTemposDeAtendimento = (
  tickets: { tempoDeAtendimento: number }[]
): number => {
  const totalMinutos = tickets.reduce(
    (total, ticket) => total + ticket.tempoDeAtendimento,
    0
  );
  return totalMinutos;
};
