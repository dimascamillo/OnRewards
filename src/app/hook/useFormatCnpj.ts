import { useState } from "react";

export default function useFormatCNPJ() {
  const formatCNPJ = (cnpj: string): string => {
    const numericCNPJ = cnpj.replace(/\D/g, "");
    return numericCNPJ.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  };

  return formatCNPJ;
}
