import { UserCirclePlus } from "@phosphor-icons/react/dist/ssr";
import NewClientModal from "./newClientModal";
import { useState } from "react";

export default function CreateNewClientForm() {
  const [modalIsOpenClient, setModalIsOpenClient] = useState(false);

  function openModalClient() {
    setModalIsOpenClient(true);
  }

  function closeModalClient() {
    setModalIsOpenClient(false);
  }

  return (
    <div>
      <button
        onClick={openModalClient}
        className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-green-500 border-green-500 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white my-10"
      >
        <UserCirclePlus size={40} />
        <span>Cadastrar Novo Cliente</span>
      </button>

      <NewClientModal
        modalIsOpenClient={modalIsOpenClient}
        closeModalClient={closeModalClient}
      />
    </div>
  );
}
