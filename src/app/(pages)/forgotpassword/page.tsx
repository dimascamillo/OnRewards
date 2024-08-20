"use client";

import InputGeneric from "@/app/components/Form/Input";
import YellowButton from "@/app/components/Form/YellowButton";
import Header from "@/app/components/Header";
import Transparent from "@/app/components/Links/Transparent";
import YellowPrimary from "@/app/components/Links/YellowPrimary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signinShcema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(8),
});

type SigninShcema = z.infer<typeof signinShcema>;

export default function ForgotPassword() {
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
          <YellowPrimary content="Entrar" url="/signin" />
        </li>

        <li>
          <Transparent content="Cadastrar" url="/pages/signup" />
        </li>
      </Header>
      <main className="relative z-10 text-center">
        <h1 className="text-6xl font-bold">Resetar sua senha!</h1>

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

          <YellowButton
            content="Resetar"
            type="submit"
            className="w-full mt-6 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
        </form>
      </main>
    </>
  );
}
