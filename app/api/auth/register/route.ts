import { NextResponse } from "next/server"
import pool from "@/lib/db"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        const [rows] = await pool.query("SELECT * FROM User WHERE email = ?", [email]);
        if ((rows as any[]).length > 0) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const id = uuidv4();
        const userRole = role || "farmer";

        await pool.query(
            "INSERT INTO User (id, name, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?, NOW())",
            [id, name, email, hashedPassword, userRole]
        );

        return NextResponse.json(
            { message: "User created successfully", user: { id, name, email, role: userRole } },
            { status: 201 }
        )
    } catch (error) {
        console.error("Registration error:", error)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json(
            { message: "Internal server error", details: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
            { status: 500 }
        )
    }
}
