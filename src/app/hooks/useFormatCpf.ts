export default function useFormatCPF() {
  const formatCPF = (cpf: string): string => {
    const numericCPF = cpf.replace(/\D/g, "");
    return numericCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  return formatCPF;
}
