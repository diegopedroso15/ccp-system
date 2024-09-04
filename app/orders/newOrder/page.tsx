"use client";

import { useState } from 'react';
import { Card, Button, Input, Textarea } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function EnviarDemanda() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const novaDemanda = {
      name: nome,
      email,
      type: tipo,
      description: descricao,
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaDemanda),
    });

    if (response.ok) {
      toast.success('Demanda enviada com sucesso!');
      router.push('/orders');
    } else {
      toast.error('Erro ao enviar a demanda');
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
            label="Nome"
            placeholder="Ex: João da Silva"
            value={nome}
            onChange={(e: any) => setNome(e.target.value)}
            required
          />
          <Input
            fullWidth
            label="Email"
            placeholder="Ex: joaosilva@usp.br"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
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

          <Button
            type="submit"
            color="primary"
            className="w-full"
          >
            Enviar Demanda
          </Button>
        </form>
      </Card>
    </div>
  );
}
