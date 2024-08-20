"use client";

import InputGeneric from "@/app/components/Form/Input";
import YellowButton from "@/app/components/Form/YellowButton";
import Header from "@/app/components/Header";
import Transparent from "@/app/components/Links/Transparent";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signinShcema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(8),
});

type SigninShcema = z.infer<typeof signinShcema>;

export default function SignUp() {
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
          <Transparent content="Entrar" url="/pages/signin" />
        </li>
      </Header>
      <main className="relative z-10 text-center">
        <h1 className="text-6xl font-bold">Crie sua conta gratuitamente!</h1>

        <form
          onSubmit={handleSubmit(handleSignin)}
          className="w-1/4 m-auto mt-32"
        >
          <div className="flex flex-col gap-5">
            <label className="text-left text-2xl font-medium" htmlFor="email">
              Nome completo
            </label>
            <InputGeneric
              name="nome"
              placeholder="Insira o seu e-mail"
              register={register}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-5 mt-6">
            <label className="text-left text-2xl font-medium" htmlFor="email">
              Celular
            </label>
            <InputGeneric
              name="tel"
              placeholder="Insira o seu e-mail"
              register={register}
              type="celular"
            />
          </div>
          <div className="flex flex-col gap-5 mt-6">
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

          <div className="flex flex-col gap-5 mt-6">
            <label className="text-left text-2xl font-medium" htmlFor="email">
              Confirme sua senha
            </label>
            <InputGeneric
              name="repeatPassword"
              placeholder="Repita sua senha"
              register={register}
              type="password"
            />
          </div>

          <YellowButton
            content="Cadastrar"
            type="submit"
            className="w-full mt-6 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          <p className="text-2xl mt-6">
            Já possui uma conta?{" "}
            <Link
              className="text-yellow-primary-400 font-bold transition-all hover:text-yellow-300"
              href="/pages/signin"
            >
              Entrar
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
