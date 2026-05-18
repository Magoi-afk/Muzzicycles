"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  db,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  handleFirestoreError,
  OperationType
} from "../firebase";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "signup";

export function LoginForm({ isOpen, onClose }: LoginFormProps) {
  const { t } = useTranslation();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        const displayName = `${formData.firstname} ${formData.lastname}`.trim();
        
        if (displayName) {
          await updateProfile(user, {
            displayName: displayName,
          });
        }

        // Save user profile to Firestore
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: displayName || user.email?.split('@')[0],
            role: "user", // Default role
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, "users");
        }
      }
      onClose();
    } catch (err: any) {
      console.error("Erro na autenticação:", err);
      let message = t('auth.login.errors.generic');
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        message = t('auth.login.errors.invalid');
      } else if (err.code === "auth/email-already-in-use") {
        message = t('auth.signup.errors.exists');
      } else if (err.code === "auth/operation-not-allowed") {
        message = "O login por e-mail ainda não foi habilitado no Console do Firebase. Por favor, habilite o provedor 'Email/Password'.";
      } else if (err.code === "auth/weak-password") {
        message = t('auth.signup.errors.weak');
      } else if (err.code === "auth/invalid-email") {
        message = t('auth.signup.errors.invalid_email');
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if profile exists, if not create it
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: "user",
            createdAt: serverTimestamp(),
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, "users");
      }

      onClose();
    } catch (err: any) {
      console.error("Erro ao fazer login com Google:", err);
      let message = t('auth.google.errors.failed');
      
      if (err.code === "auth/operation-not-allowed") {
        message = "O login com Google não está ativado no Console do Firebase. Ative-o em 'Authentication > Sign-in method'.";
      } else if (err.code === "auth/unauthorized-domain") {
        message = `Domínio não autorizado. Adicione '${window.location.hostname}' aos domínios autorizados no Console do Firebase (Autenticação > Configurações).`;
      } else if (err.code === "auth/popup-blocked") {
        message = t('auth.google.errors.blocked');
      } else if (err.code === "auth/popup-closed-by-user") {
        message = t('auth.google.errors.closed');
      } else if (err.code === "auth/network-request-failed") {
        message = t('auth.google.errors.network');
      } else if (err.code === "auth/internal-error") {
        message = "Erro interno do Firebase. Tente novamente mais tarde.";
      } else {
        // Exibir o código do erro para ajudar no diagnóstico
        message += ` (${err.code || err.message || "Erro desconhecido"})`;
      }
      
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
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
              {authMode === "login" ? t('auth.login.title') : t('auth.signup.title')}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
              {authMode === "login" 
                ? t('auth.login.desc') 
                : t('auth.signup.desc')}
            </p>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-[14px] leading-[18px] font-medium border border-red-100">
                {error}
              </div>
            )}

            <form className="my-8" onSubmit={handleSubmit}>
              {authMode === "signup" && (
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">{t('auth.labels.firstname')}</Label>
                    <Input 
                      id="firstname" 
                      placeholder={t('auth.placeholders.firstname')} 
                      type="text" 
                      className="bg-gray-50 border-black/5" 
                      disabled={isLoading}
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">{t('auth.labels.lastname')}</Label>
                    <Input 
                      id="lastname" 
                      placeholder={t('auth.placeholders.lastname')} 
                      type="text" 
                      className="bg-gray-50 border-black/5" 
                      disabled={isLoading}
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </LabelInputContainer>
                </div>
              )}
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">{t('auth.labels.email')}</Label>
                <Input 
                  id="email" 
                  placeholder={t('auth.placeholders.email')} 
                  type="email" 
                  required
                  className="bg-gray-50 border-black/5" 
                  disabled={isLoading}
                  value={formData.email}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">{t('auth.labels.password')}</Label>
                <Input 
                  id="password" 
                  placeholder={t('auth.placeholders.password')} 
                  type="password" 
                  required
                  className="bg-gray-50 border-black/5" 
                  disabled={isLoading}
                  value={formData.password}
                  onChange={handleChange}
                />
              </LabelInputContainer>

              <button
                className="group/btn relative block h-10 w-full rounded-md bg-brand-blue font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:bg-brand-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {authMode === "login" ? t('auth.login.loading') : t('auth.signup.loading')}
                  </div>
                ) : (
                  <>{authMode === "login" ? t('auth.login.button') : t('auth.signup.button')} &rarr;</>
                )}
                <BottomGradient />
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                  className="text-xs text-neutral-600 hover:text-brand-blue transition-colors"
                  disabled={isLoading}
                >
                  {authMode === "login" 
                    ? t('auth.login.toggle') 
                    : t('auth.signup.toggle')}
                </button>
              </div>

              <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

              <div className="flex flex-col space-y-4">
                <button
                  className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black hover:bg-brand-blue hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin group-hover:text-white" />
                  ) : (
                    <IconBrandGoogle className="h-4 w-4 group-hover:text-white" />
                  )}
                  <span className="text-sm group-hover:text-white">
                    {isLoading ? t('auth.google.loading') : t('auth.google.button')}
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
