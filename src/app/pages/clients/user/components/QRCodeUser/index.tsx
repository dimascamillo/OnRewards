"use client";

import QRCode from "react-qr-code";
import styles from "./QRCodeUser.module.css";

interface UserInfo {
  iduser: number;
}

const QRCodeUser: React.FC<{ value: number }> = ({ value }) => {
  const qrCodeValue = JSON.stringify({ iduser: value });

  return (
    <div className={`${styles.qrCodeWrapper} flex flex-wrap h-full w-full`}>
      <h1 className="text-yellow-primary-400 text-4xl w-full text-center mb-4">
        Faça já o seu pedido!
      </h1>
      <p className="text-gray-300 text-xl w-1/2 text-center mb-4">
        Mostre este QRCode para uma de nossas lojas credenciadas. Faça o seu
        pedido e comece a acumular pontos e ganhe cupons de desconto.
      </p>
      <QRCode
        value={qrCodeValue}
        bgColor="#171E26"
        fgColor="#F4BC1D"
        level="H"
      />
    </div>
  );
};

export default QRCodeUser;
