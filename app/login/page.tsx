"use client";
import { Input, Button, Card, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, password: password }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        if (data.id) {
          localStorage.setItem("user", data.id);
          localStorage.setItem("role", data.role);
          router.push("/orders");
        } else {
          toast.error("Resposta da API está faltando o ID do usuário.");
        }
      } else {
        toast.error("Usuário ou senha inválidos");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
        <Card className="max-w-md w-full p-8 shadow-xl bg-white rounded-2xl">
          <p className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Login
          </p>
          <Spacer />
          <Input
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            type="email"
            className="mb-4"
            onChange={(e: any) => setUser(e.target.value)}
          />
          <Input
            fullWidth
            color="primary"
            size="lg"
            placeholder="Senha"
            type="password"
            className="mb-6"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Button
            color="primary"
            className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
            onClick={() => {
              handleSubmit();
            }}
          >
            Entrar
          </Button>
          <p className="text-center text-gray-600">
            Esqueceu sua senha?{" "}
            <a href="#" className="text-blue-600">
              Clique aqui
            </a>
          </p>
        </Card>
      </div>
  );
}
