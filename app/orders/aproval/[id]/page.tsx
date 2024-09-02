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
import { IEmployee, IOrder } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DetalhesParecer() {
  const router = useRouter();
  const [order, setOrder] = useState<IOrder>();
  const [secretaries, setSecretaries] = useState<IEmployee[]>([]);
  const [secretary, setSecretary] = useState<number>(0);
  const [reviewers, setReviewers] = useState<IEmployee[]>([]);
  const [reviewer, setReviewer] = useState<number>(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setOrder(data);
    };
    const fetchSecretarsecretaries = async () => {
      const response = await fetch("/api/employees/secretaries", {
        method: "GET",
      });
      const data = await response.json();
      setSecretaries(data);
    };
    const fetchReviewers = async () => {
      const response = await fetch("/api/employees/reviewers", {
        method: "GET",
      });
      const data = await response.json();
      setReviewers(data);
    };

    fetchReviewers();
    fetchSecretarsecretaries();
    fetchOrder();
  }, []);

  const handleSecretarySubmission = async (status: string) => {
    if (secretary === 0) {
      toast.error("Selecione um secretário");
      return;
    }
    let orderStatus = status;
    if (orderStatus === "Concluído") {
      orderStatus = order?.status === "Parecer Aceito" ? "Concluído Aprovado" : "Concluído Recusado";
    }
    await fetch(`/api/orders/${id}/status/`, {
      method: "POST",
      body: JSON.stringify({ orderStatus }),
    });

    const response = await fetch(`/api/orders/${id}/${secretary}`, {
      method: "POST",
    });

    if (response.ok) {
      toast.success("Demanda encaminhada com sucesso");
      router.push("/orders/aproval");
    } else {
      toast.error("Erro ao encaminhar a demanda");
    }
  };

  const handleReviewerSubmission = async () => {
    if (reviewer === 0) {
      toast.error("Selecione um parecerista");
      return;
    }
    const status = "Revisão Solicitada";
    await fetch(`/api/orders/${id}/status/`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });

    const response = await fetch(`/api/orders/${id}/${reviewer}`, {
      method: "POST",
    });

    if (response.ok) {
      toast.success("Demanda encaminhada com sucesso");
      router.push("/orders/aproval");
    } else {
      toast.error("Erro ao encaminhar a demanda");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-3xl w-full p-8 shadow-lg bg-white rounded-2xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Detalhes da Demanda
        </h1>

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
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Parecerista:</p>
            <p className="text-gray-900">{order?.reviewer}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Data de Parecer:</p>
            <p className="text-gray-900">{order?.reviewDate}</p>
          </div>
          <div className="">
            <p className="font-semibold text-gray-700">Parecer:</p>
            <text className="text-gray-900">{order?.review}</text>
          </div>
        </div>
        <div className="justify-center row">
          <div className="mt-10">
            <Select placeholder="Selecione o secretário">
              {secretaries.map((emp) => (
                <SelectItem key={emp.name} onClick={() => setSecretary(emp.id)}>
                  {emp.name}
                </SelectItem>
              ))}
            </Select>
            <div className="flex row-span-2 gap-4">
              <Button
                color="warning"
                className="w-full mt-2"
                onClick={() => {
                  handleSecretarySubmission("Solicitado Revisão");
                }}
              >
                Solicitar Revisão ao Secretário
              </Button>
              <Button
                color="success"
                className="w-full mt-2"
                onClick={() => {
                  handleSecretarySubmission("Concluído");
                }}
              >
                Aprovar e Enviar ao Secretário
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <Select placeholder="Selecione o parecerista">
              {reviewers.map((emp) => (
                <SelectItem key={emp.name} onClick={() => setReviewer(emp.id)}>
                  {emp.name}
                </SelectItem>
              ))}
            </Select>
            <Button
              color="success"
              className="w-full mt-2"
              onClick={() => {
                handleReviewerSubmission();
              }}
            >
              Solicitar Revisão ao Parecerista
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
