"use client";

import { useState, useEffect } from "react";
import { Card, Button, Textarea } from "@nextui-org/react";

export default function DetalhesParecer() {
  //todo-backend
  const [demanda, setDemanda] = useState({
    id: 1,
    tipo: "Credenciamento",
    status: "Pendente",
    nome: "João da Silva",
    email: "joaosilva@usp.br",
    descricao: "Descrição da demanda",
    parecerista: "Maria Souza",
    dataParecer: "01/09/2024",
    dataEnvioParecerista: "01/09/2024",
    dataRecebimento: "01/09/2024",
    parecer: "",
  });

  /*   useEffect(() => {
    const fetchDemanda = async () => {
      const response = await fetch(`/api/demandas/${id}`);
      const data = await response.json();
      setDemanda(data);
    };

    if (id) {
      fetchDemanda();
    }
  }, [id]); */

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-3xl w-full p-8 shadow-lg bg-white rounded-2xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Detalhes da Demanda
        </h1>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">ID:</p>
            <p className="text-gray-900">{demanda.id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Tipo:</p>
            <p className="text-gray-900">{demanda.tipo}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Status:</p>
            <p className="text-gray-900">{demanda.status}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Nome do Solicitante:</p>
            <p className="text-gray-900">{demanda.nome}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Email do Solicitante:</p>
            <p className="text-gray-900">{demanda.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Descrição:</p>
            <p className="text-gray-900">{demanda.descricao}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Data de Recebimento:</p>
            <p className="text-gray-900">{demanda.dataRecebimento}</p>
          </div>
        </div>
        <div className="justify-center row">
          <Textarea fullWidth label="Parecer" 
          placeholder="Digite aqui o parecer"
          onChange={(e) => setDemanda({ ...demanda, parecer: e.target.value })}
          />
          <Button
            color="primary"
            className="w-full"
            onClick={() => {
              alert(`Demanda enviada para`);
            }}
          >
            Enviar para Parecerista
          </Button>

        </div>
      </Card>
    </div>
  );
}
