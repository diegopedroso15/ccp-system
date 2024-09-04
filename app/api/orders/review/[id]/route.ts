import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request, { params }: { params: { id: number } }) {
  try {
    const data = await request.json();
    const id = params.id;
    const connection = await pool.connect();

    try {
      const reviewerResult = await connection.query(
        `SELECT name FROM employees WHERE id = $1`,
        [data.reviewer]
      );

      const reviewerName = reviewerResult.rows[0]?.name;

      if (!reviewerName) {
        return NextResponse.json({ error: "Reviewer não encontrado" }, { status: 404 });
      }

      await connection.query(
        `UPDATE orders SET review = $1, status = $2, "reviewDate" = NOW(), reviewer = $3 WHERE id = $4`,
        [data.review, data.status, reviewerName, id]
      );

      return NextResponse.json({ message: "Demanda salva com sucesso" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erro ao criar a demanda" }, { status: 500 });
  }
}
