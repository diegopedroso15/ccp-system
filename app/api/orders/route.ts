import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `INSERT INTO orders (type, status, name, email, description, ownerId)
         VALUES ($1, 'SOLICITADO', $2, $3, $4, 1)
         RETURNING *`,
        [data.type, data.name, data.email, data.description]
      );

      const newDemand = {
        id: result.rows[0].id,
        ...data,
        status: "SOLICITADO",
        receptionDate: new Date(),
      };

      return NextResponse.json(newDemand, { status: 201 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar a demanda" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `SELECT * FROM orders`
      );

      return NextResponse.json(result.rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar as orders" }, { status: 500 });
  }
}