"use client";

import { useState } from 'react';
import { Button, Card, Input, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function Demandas() {
  const router = useRouter();
  //todo-backend
  const [demandas, setDemandas] = useState([
    { id: 1, tipo: "Credenciamento", status: "Pendente", dataRecebimento: "01/09/2024" },
    { id: 2, tipo: "Atualização de Dados", status: "Em Análise", dataRecebimento: "02/09/2024" },
    { id: 3, tipo: "Cancelamento", status: "Concluído", dataRecebimento: "03/09/2024" },
  ]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-4xl w-full p-8 shadow-xl bg-white rounded-2xl">
        <p className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Solicitações de Parecer
        </p>
        
        <Input
          fullWidth
          placeholder="Buscar demandas"
          size="lg"
          className="mb-6"
        />

        <Table
          aria-label="Tabela de Demandas"
          className="mb-6"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Tipo</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Data de Recebimento</TableColumn>
            <TableColumn>Ações</TableColumn>
          </TableHeader>
          <TableBody>
            {demandas.map((demanda) => (
              <TableRow key={demanda.id}>
                <TableCell>{demanda.id}</TableCell>
                <TableCell>{demanda.tipo}</TableCell>
                <TableCell>{demanda.status}</TableCell>
                <TableCell>{demanda.dataRecebimento}</TableCell>
                <TableCell>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                    router.push(`/orders/demands/${demanda.id}`);
                  }
                  }>
                    Ver
                  </Button> 
                  <Spacer x={0.5} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
