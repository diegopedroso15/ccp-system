"use client";

import { useState, useEffect } from "react";
import { Card, Button, Select, SelectItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { IEmployee, IOrder, IOrderStatus } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DetalhesDemanda() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<IOrder>();
  const [reviewers, setReviewers] = useState<IEmployee[]>([]);
  const [reviewer, setReviewer] = useState(0);

  const [coordinators, setCoordinators] = useState<IEmployee[]>([]);
  const [coordinator, setCoordinator] = useState(0);

  useEffect(() => {
    const fetchReviewers = async () => {
      const response = await fetch("/api/employees/reviewers", {
        method: "GET",
      });
      const data = await response.json();
      setReviewers(data);
    };
    const fetchCoordinators = async () => {
      const response = await fetch("/api/employees/coordinators", {
        method: "GET",
      });
      const data = await response.json();
      setCoordinators(data);
    };
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setOrder(data);
    };

    fetchReviewers();
    fetchCoordinators();
    fetchOrder();
  }, [id]);

  const handleSubmission = async (ownerId: number) => {
    const response = await fetch(`/api/orders/${id}/${ownerId}`, {
      method: "POST",
    });

    console.log(response);

    if (response.ok) {
      toast.success("Demanda encaminhada com sucesso");
      router.push("/orders/demands");
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
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">ID:</p>
            <p className="text-gray-900">{order?.id}</p>
          </div>
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
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Parecerista:</p>
            <p className="text-gray-900">{order?.reviewer}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Data de Parecer:</p>
            <p className="text-gray-900">{order?.reviewDate}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">
              Data de Envio Para parecerista:
            </p>
            <p className="text-gray-900">{order?.reviewerSubmissionDate}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-gray-700">Data de Recebimento:</p>
            <p className="text-gray-900">{order?.receptionDate}</p>
          </div>
        </div>
        <div className="justify-center ">
          <p className="font-semibold text-blue-600">
            Encaminhar para Parecerista
          </p>
          <Select placeholder="Selecione o parecerista">
            {reviewers.map((parecerista) => (
              <SelectItem
                key={parecerista.name}
                onClick={() => setReviewer(parecerista.id)}
              >
                {parecerista.name}
              </SelectItem>
            ))}
          </Select>

          <Button
            color="primary"
            className="w-full mt-5"
            onClick={() => {
              handleSubmission(reviewer);
            }}
          >
            Enviar para Parecerista
          </Button>
        </div>
        <div className="justify-center mt-10">
          <p className="font-semibold text-blue-600">
            Encaminhar para Coordernador
          </p>
          <Select placeholder="Selecione o coordenador">
            {coordinators.map((coordinator) => (
              <SelectItem
                key={coordinator.name}
                onClick={() => setCoordinator(coordinator.id)}
              >
                {coordinator.name}
              </SelectItem>
            ))}
          </Select>

          <Button
            color="primary"
            className="w-full mt-5"
            onClick={() => {
              handleSubmission(coordinator);
            }}
          >
            Enviar para Coordenador
          </Button>
        </div>
      </Card>
    </div>
  );
}
