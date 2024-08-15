"use client";

import Transparent from "@/app/components/Buttons/Transparent";
import InputGeneric from "@/app/components/Form/Input";
import YellowButton from "@/app/components/Form/YellowButton";
import Header from "@/app/components/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signinShcema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(8),
});

type SigninShcema = z.infer<typeof signinShcema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SigninShcema>({
    resolver: zodResolver(signinShcema),
  });

  function handleSignin(data: SigninShcema) {
    console.log(data);
  }

  return (
    <>
      <Header>
        <li>
          <Transparent content="Cadastrar" url="/pages/signup" />
        </li>
      </Header>
      <main className="relative z-10 text-center">
        <h1 className="text-6xl font-bold">Seja bem vindo!</h1>

        <form
          onSubmit={handleSubmit(handleSignin)}
          className="w-1/4 m-auto mt-32"
        >
          <div className="flex flex-col gap-5">
            <label className="text-left text-2xl font-medium" htmlFor="email">
              E-mail
            </label>
            <InputGeneric
              name="email"
              placeholder="Insira o seu e-mail"
              register={register}
              type="email"
            />
          </div>

          <div className="flex flex-col gap-5 mt-6">
            <label className="text-left text-2xl font-medium" htmlFor="email">
              Senha
            </label>
            <InputGeneric
              name="password"
              placeholder="Insira sua senha"
              register={register}
              type="password"
            />
          </div>
          <p className="text-sm mt-6 text-right">
            Esqueceu a senha{" "}
            <Link
              className="text-yellow-primary-400 font-bold transition-all hover:text-yellow-300"
              href="/pages/resetPassword"
            >
              Clique aqui.
            </Link>
          </p>
          <YellowButton
            content="Entrar"
            type="submit"
            className="w-full mt-6 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          <p className="text-2xl mt-6">
            Ainda não possui conta?{" "}
            <Link
              className="text-yellow-primary-400 font-bold transition-all hover:text-yellow-300"
              href="/pages/signup"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
