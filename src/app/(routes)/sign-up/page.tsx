"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/axios";
import { useState } from "react";

import {
  User,
  LockKeyOpen,
  EyeSlash,
  Eye,
} from "@phosphor-icons/react/dist/ssr";

import logo from "@public/logo.svg";

const claimNewClientFormSchema = z.object({
  cnpj: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type ClaimNewClientFormSchema = z.infer<typeof claimNewClientFormSchema>;

export default function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [passwordLengthInvalid, setPasswordLengthInvalid] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimNewClientFormSchema>({
    resolver: zodResolver(claimNewClientFormSchema),
  });

  const router = useRouter();

  async function handleClaimClient(data: ClaimNewClientFormSchema) {
    const { cnpj, name, email, password } = data;

    try {
      const response = await api.post("/clients", {
        cnpj,
        name,
        email,
        password,
      });

      router.push("/sign-in");
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setPasswordLengthInvalid("E=mail ou CNPJ já cadastrado.");
      } else if (err.response && err.response.status === 400) {
        setPasswordLengthInvalid("Todos os campos são obrigatórios");
      } else if (err.response && err.response.status === 400) {
        setPasswordLengthInvalid("A senha deve ter pelo menos 8 caracteres.");
      } else {
        console.error(err.message);
      }
    }
  }

  function handleTypePasswordToText() {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowPasswordIcon(true);
    } else {
      setPasswordType("password");
      setShowPasswordIcon(false);
    }
  }

  function formatCNPJ(cnpj: string): string {
    const numericCNPJ = cnpj.replace(/\D/g, "");
    return numericCNPJ.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }
  return (
    <main className="max-w-screen-sm w-full p-4 mx-auto my-8">
      <form
        onSubmit={handleSubmit(handleClaimClient)}
        className="flex flex-col"
      >
        <figure className="w-full h-16 mb-8">
          <Image src={logo} alt="" className="w-full h-full object-contain" />
        </figure>
        <div className="flex flex-col gap-2 relative">
          <label className="text-white" htmlFor="email">
            CNPJ - apenas números
          </label>
          <input
            type="text"
            className="h-16 bg-white text-brand-600 border-none outline-none rounded-md pl-10"
            placeholder="Insira o seu CNPJ"
            maxLength={18}
            {...register("cnpj")}
            onChange={(e) => {
              const formattedCNPJ = formatCNPJ(e.target.value);
              setValue("cnpj", formattedCNPJ);
            }}
          />
          <User size={22} className="absolute text-black left-3 top-14" />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-white" htmlFor="email">
            Nome da Empresa
          </label>
          <input
            type="text"
            className="h-16 bg-white text-brand-600 border-none outline-none rounded-md pl-10"
            placeholder="Insira o nome da Empresa"
            {...register("name")}
          />
          <User size={22} className="absolute text-black left-3 top-14" />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-white" htmlFor="email">
            E-mail
          </label>
          <input
            type="e-mail"
            className="h-16 bg-white text-brand-600 border-none outline-none rounded-md pl-10"
            placeholder="Insira o o e-mail"
            {...register("email")}
          />
          <User size={22} className="absolute text-black left-3 top-14" />
        </div>

        <div className="flex flex-col gap-2 mt-4 relative">
          <label className="text-white" htmlFor="password">
            Password
          </label>
          <input
            type={passwordType}
            className="h-16 bg-white text-brand-600 border-none outline-none rounded-md pl-10"
            placeholder="Insira a senha"
            {...register("password")}
          />
          <LockKeyOpen
            size={22}
            className="absolute text-black left-3 top-14"
          />
          <button type="button" onClick={handleTypePasswordToText}>
            {showPasswordIcon ? (
              <Eye size={22} className="absolute text-black right-3 top-14" />
            ) : (
              <EyeSlash
                size={22}
                className="absolute text-black right-3 top-14"
              />
            )}
          </button>
        </div>

        <span className="text-red-600">{passwordLengthInvalid}</span>

        <button
          className="h-16 bg-yellow-brand-400 text-center text-white hover:bg-yellow-brand-500 transition-all mt-10 p-1 rounded-md uppercase"
          type="submit"
          disabled={isSubmitting}
        >
          Registrar
        </button>
      </form>
    </main>
  );
}
