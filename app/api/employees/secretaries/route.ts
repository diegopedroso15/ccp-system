import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `SELECT * FROM employees WHERE role = 'secretary'`
      );

      return NextResponse.json(result.rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar os funcionários" }, { status: 500 });
  }
}