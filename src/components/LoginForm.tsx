"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { auth, googleProvider, signInWithPopup } from "../firebase";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginForm({ isOpen, onClose }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, we'll just show a loading state for the email/password form
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError("O login por email ainda não está disponível. Use o Google para entrar.");
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      console.error("Erro ao fazer login com Google:", err);
      setError("Falha ao entrar com o Google. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-4 md:p-8 shadow-2xl dark:bg-black overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/5 flex items-center justify-center text-black/50 hover:bg-black/10 hover:text-black transition-all"
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Bem-vindo à Muzzicycles
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
              Entre na sua conta para acompanhar seus pedidos e gerenciar seus favoritos.
            </p>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100">
                {error}
              </div>
            )}

            <form className="my-8" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label htmlFor="firstname">Nome</Label>
                  <Input id="firstname" placeholder="João" type="text" className="bg-gray-50 border-black/5 focus:ring-brand-blue/20 focus:border-brand-blue" disabled={isLoading} />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Sobrenome</Label>
                  <Input id="lastname" placeholder="Silva" type="text" className="bg-gray-50 border-black/5 focus:ring-brand-blue/20 focus:border-brand-blue" disabled={isLoading} />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Endereço de Email</Label>
                <Input id="email" placeholder="joao@exemplo.com" type="email" className="bg-gray-50 border-black/5 focus:ring-brand-blue/20 focus:border-brand-blue" disabled={isLoading} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" placeholder="••••••••" type="password" className="bg-gray-50 border-black/5 focus:ring-brand-blue/20 focus:border-brand-blue" disabled={isLoading} />
              </LabelInputContainer>

              <button
                className="group/btn relative block h-10 w-full rounded-md bg-brand-blue font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:bg-brand-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  <>Entrar &rarr;</>
                )}
                <BottomGradient />
              </button>

              <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

              <div className="flex flex-col space-y-4">
                <button
                  className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-neutral-800 dark:text-neutral-300 group-hover:text-white" />
                  ) : (
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300 group-hover:text-white" />
                  )}
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-white">
                    {isLoading ? "Conectando..." : "Continuar com o Google"}
                  </span>
                  <BottomGradient />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
