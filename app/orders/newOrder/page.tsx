"use client";

import { useState } from "react";
import { Card, Button, Input, Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EnviarDemanda() {
  const router = useRouter();
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState<string | null>(null); // Base64 do PDF

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const novaDemanda = {
      userId: localStorage.getItem("user"),
      type: tipo,
      description: descricao,
      pdf_base64: arquivo,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaDemanda),
    });

    if (response.ok) {
      toast.success("Demanda enviada com sucesso!");
      router.push("/orders");
    } else {
      toast.error("Erro ao enviar a demanda");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setArquivo(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-full p-4">
      <Card className="max-w-3xl w-full p-8 shadow-lg bg-white rounded-2xl">
        <p className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Enviar Nova Solicitação
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            fullWidth
            label="Tipo de Demanda"
            placeholder="Ex: Credenciamento"
            value={tipo}
            onChange={(e: any) => setTipo(e.target.value)}
            required
          />
          <Textarea
            fullWidth
            label="Descrição"
            placeholder="Descreva a demanda"
            value={descricao}
            onChange={(e: any) => setDescricao(e.target.value)}
            required
          />
          <div className="py-4 px-3 bg-gray-100 rounded-lg text-gray-700 text-small">
            <p className="py-2 font-semibold">Anexar PDF</p>
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <Button type="submit" color="primary" className="w-full">
            Enviar Demanda
          </Button>
        </form>
      </Card>
    </div>
  );
}
