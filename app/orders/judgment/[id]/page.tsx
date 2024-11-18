"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Textarea,
  Spacer,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IUser, IOrder } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DetalhesParecer() {
  const router = useRouter();
  const [order, setOrder] = useState<IOrder>();
  const [review, setReview] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [secretaries, setSecretaries] = useState<IUser[]>([]);
  const [secretary, setSecretary] = useState<number>();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setOrder(data);
      setReview(data.review);
    };
    const fetchSecretarsecretaries = async () => {
      const response = await fetch("/api/employees/secretaries", {
        method: "GET",
      });
      const data = await response.json();
      setSecretaries(data);
    };

    fetchSecretarsecretaries();
    fetchOrder();
  }, []);

  const handleReviewSubmission = async () => {
    const reviewer = localStorage.getItem("user");
    const response = await fetch(`/api/orders/review/${order?.id}`, {
      method: "POST",
      body: JSON.stringify({ review: review, status: status, reviewer: reviewer}),
    });

    if (response.ok) {
      toast.success("Demanda salva com sucesso");
    } else {
      toast.error("Erro ao salva a demanda");
    }
  };

  const handleSecretarySubmission = async () => {
    const response = await fetch(`/api/orders/${id}/${secretary}`, {
      method: "POST",
    });

    if (response.ok) {
      toast.success("Demanda encaminhada com sucesso");
      router.push("/orders/judgment");
    } else {
      toast.error("Erro ao encaminhar a demanda");
    }
  };

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
          Detalhes da Demanda
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
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">ID:</p>
            <p className="text-gray-900">{order?.id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Tipo:</p>
            <p className="text-gray-900">{order?.type}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Status:</p>
            <p className="text-gray-900">{order?.status}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Nome do Solicitante:</p>
            <p className="text-gray-900">{order?.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Email do Solicitante:</p>
            <p className="text-gray-900">{order?.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Descrição:</p>
            <p className="text-gray-900">{order?.description}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Data de Recebimento:</p>
            <p className="text-gray-900">{order?.receptionDate}</p>
          </div>
        </div>
        <div className="justify-center row ">
          <Textarea
            fullWidth
            label="Parecer"
            placeholder="Digite aqui o  parecer"
            value={review}
            onValueChange={setReview}
            
          />
          <Select className="mt-2" placeholder="Selecione o status do parecer">
            <SelectItem key={1} onClick={() => setStatus("Parecer Aceito")}>
              Parecer Aceito
            </SelectItem>
            <SelectItem key={2} onClick={() => setStatus("Parecer Recusado")}>
              Parecer Recusado
            </SelectItem>
          </Select>
          <Button
            color="primary"
            className="w-full mt-2"
            onClick={() => {
              handleReviewSubmission();
            }}
          >
            Salvar Parecer
          </Button>
          <div className="mt-10">
            <Select placeholder="Selecione o secretário">
              {secretaries.map((emp) => (
                <SelectItem key={emp.name} onClick={() => setSecretary(emp.id)}>
                  {emp.name}
                </SelectItem>
              ))}
            </Select>
            <Button
              color="success"
              className="w-full mt-2"
              onClick={() => {
                handleSecretarySubmission();
              }}
            >
              Encaminhar para Secretário
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
