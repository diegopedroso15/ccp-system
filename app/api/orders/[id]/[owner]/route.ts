import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: number; owner: string } }
) {
  const { owner } = await request.json();
  const slug = params.id;
  try {
    const connection = await pool.connect();
    try {
      await connection.query(
        `UPDATE orders SET ownerId = $1 WHERE id = $2`,
        [owner, slug]
      );
      return NextResponse.json({ message: "Owner atualizado com sucesso" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar o owner da demanda" },
      { status: 500 }
    );
  }
}