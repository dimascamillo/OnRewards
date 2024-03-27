"use client";

import Image from "next/image";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { api } from "../lib/axios";

import { decodeToken, JwtPayload } from "../../middleware";

import logo from "@public/logo.svg";

import {
  User,
  LockKeyOpen,
  EyeSlash,
  Eye,
} from "@phosphor-icons/react/dist/ssr";

const signinFormSchema = z.object({
  email: z.string().email({ message: "Por favor insira um e-mail válido." }),
  password: z.string(),
});

type SigninFormSchema = z.infer<typeof signinFormSchema>;

export default function Signin() {
  const [passwordType, setPasswordType] = useState("password");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [passwordLengthInvalid, setPasswordLengthInvalid] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
  });

  function handleTypePasswordToText() {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowPasswordIcon(true);
    } else {
      setPasswordType("password");
      setShowPasswordIcon(false);
    }
  }

  const router = useRouter();

  async function handleSigninUser(data: SigninFormSchema) {
    const { email, password } = data;

    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      setCookie(null, "token", response.data.access_token, {
        maxAge: 24 * 60 * 60,
        path: "/",
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      const decodedTokens = decodeToken(
        response.data.access_token
      ) as JwtPayload | null;

      if (decodedTokens) {
        switch (decodedTokens.type) {
          case "2":
            router.push("/auth/manager-dashboard");
            break;
          case "1":
            router.push("/auth/client-dashboard");
            break;
          case "0":
            router.push("/auth/admin-dashboard");
            break;
          default:
            console.error("Invalid token type");
            break;
        }
      } else {
        console.error("Token is null");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setPasswordLengthInvalid("Usuário ou senha incorreto.");
      } else {
        console.error(err.message);
      }
    }
  }

  return (
    <main className="max-w-screen-sm w-full p-4 mx-auto my-8">
      <form onSubmit={handleSubmit(handleSigninUser)} className="flex flex-col">
        <figure className="w-full h-16 mb-8">
          <Image src={logo} alt="" className="w-full h-full object-contain" />
        </figure>
        <div className="flex flex-col gap-2 relative">
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="h-16 bg-white text-brand-600 border-none outline-none rounded-md pl-10"
            placeholder="Insira o seu e-mail"
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
            placeholder="Insira a sua senha"
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
        <div className="flex justify-between items-center">
          <span className="text-red-500">{passwordLengthInvalid}</span>
          <a className="text-yellow-brand-400 text-right hover:text-yellow-brand-500 transition-all my-5">
            Esqueceu a senha?
          </a>
        </div>

        <button
          type="submit"
          className="h-16 bg-yellow-brand-400 text-center text-white hover:bg-yellow-brand-500 transition-all mt-2 p-1 rounded-md uppercase"
        >
          Entrar
        </button>
        <span className="mt-4 text-center">
          Ainda não possui uma conta?{" "}
          <a
            href="/sign-up"
            className="text-yellow-brand-400 text-right hover:text-yellow-brand-500 transition-all my-5"
          >
            Registrar-se
          </a>
        </span>
      </form>
    </main>
  );
}
