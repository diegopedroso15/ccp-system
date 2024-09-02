import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { user, password } = body;
  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `SELECT * FROM employees WHERE "user" = $1 AND password = $2;`,
        [user, password]
      );

      console.log(result.rows[0]);
      return NextResponse.json(result.rows[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar as orders" }, { status: 500 });
  }
}