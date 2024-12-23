"use client";

import { useState, useEffect } from "react";
import { Card, Button, Select, SelectItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { IUser, IOrder, IOrderStatus } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DetalhesDemanda() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<IOrder>();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setOrder(data);
    };

    fetchOrder()
  }, [id]);

  const isBase64 = (str: string) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const handleDownloadPDF = () => {
    if (!order?.pdf_base64) {
      toast.error("Nenhum PDF anexado à demanda.");
      return;
    }
    let base64Data = order.pdf_base64;
    if (base64Data.startsWith("data:application/pdf;base64,")) {
      base64Data = base64Data.replace("data:application/pdf;base64,", "");
    }

    if (!isBase64(base64Data)) {
      toast.error("O arquivo PDF não está codificado corretamente em base64.");
      return;
    }

    try {
      const cleanedBase64 = base64Data.replace(/\s/g, "");

      const byteCharacters = atob(cleanedBase64);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `demanda_${order.id}.pdf`;
      link.click();
    } catch (error) {
      toast.error("Erro ao processar o PDF.");
      console.error("Erro no download do PDF: ", error);
    }
  };

  
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-3xl w-full p-8 shadow-lg bg-white rounded-2xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Detalhes da minha solicitação
        </h1>

        {order?.pdf_base64 && (
          <div className="my-4">
            <Button
              color="success"
              className="w-full"
              onClick={handleDownloadPDF}
            >
              Baixar PDF Anexado
            </Button>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Tipo:</p>
            <p className="text-gray-900">{order?.type}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Status:</p>
            <p className="text-gray-900">{order?.status}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Nome do Solicitante:</p>
            <p className="text-gray-900">{order?.name}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Email do Solicitante:</p>
            <p className="text-gray-900">{order?.email}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Descrição:</p>
            <p className="text-gray-900">{order?.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
