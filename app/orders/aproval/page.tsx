"use client";

import { useEffect, useState } from 'react';
import { Button, Card, Input, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { IOrder } from '@/types';

export default function Aproval() {
  const router = useRouter();
  const [order, setOrder] = useState<IOrder[]>([]);

  useEffect(() => {
    const id = localStorage.getItem("user");
    fetch("/api/orders/byEmployee/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setOrder(data));
  }, []);


  return (
    <div className="flex justify-center items-center min-h-full">
      <Card className="max-w-4xl w-full p-8 shadow-xl bg-white rounded-2xl">
        <p className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Solicitações de Aprovação
        </p>
        
        <Input
          fullWidth
          placeholder="Buscar demandas"
          size="lg"
          className="mb-6"
        />

        <Table
          aria-label="Tabela de Aprovações"
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
            {order.map((demanda) => (
              <TableRow key={demanda.id}>
                <TableCell>{demanda.id}</TableCell>
                <TableCell>{demanda.type}</TableCell>
                <TableCell>{demanda.status}</TableCell>
                <TableCell>{demanda.receptionDate}</TableCell>
                <TableCell>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                    router.push(`/orders/aproval/${demanda.id}`);
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
