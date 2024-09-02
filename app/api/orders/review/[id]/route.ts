import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request, { params }: { params: { id: number } }) {
  try {
    const data = await request.json();
    const id = params.id;
    const connection = await pool.connect();

    try {
      await connection.query(
        `UPDATE orders SET review = $1, status = $2, "reviewDate" = NOW() WHERE id = $3`,
        [data.review, data.status, id]
      );

      return NextResponse.json({ message: "Demanda salva com sucesso" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar a demanda" }, { status: 500 });
  }
}