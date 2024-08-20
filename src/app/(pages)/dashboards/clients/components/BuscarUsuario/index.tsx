"use client";
import YellowButton from "@/app/components/Form/YellowButton";

export default function BuscarUsuario() {
  return (
    <div className={`flex flex-col items-center h-full w-full`}>
      <h1 className="text-yellow-primary-400 text-4xl w-full text-center mb-4">
        Escanear QR Code
      </h1>
      <p className="text-gray-300 text-xl w-1/2 text-center mb-4">
        Certifique-se se o pedido e o pagamento já foram realizados.
      </p>
      <YellowButton content="Escanear QR Code" type="button" />
      <section></section>
    </div>
  );
}
