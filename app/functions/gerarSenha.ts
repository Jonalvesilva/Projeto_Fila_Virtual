export const gerarSenha = (tamanho: number): string => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let senha = "";

  for (let i = 0; i < tamanho; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    senha += caracteres.charAt(randomIndex);
  }

  return senha;
};
