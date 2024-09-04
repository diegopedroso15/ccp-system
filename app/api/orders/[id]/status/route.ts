import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { status } = await request.json();
  const slug = params.id;

  try {
    const connection = await pool.connect();
    try {
      await connection.query(
        `UPDATE orders SET status = $1 WHERE id = $2`,
        [status, slug]
      );
      return NextResponse.json({ message: "Status atualizado com sucesso" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao atualizar o status da demanda" },
      { status: 500 }
    );
  }
}
