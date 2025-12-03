import { NextResponse } from "next/server"
import pool from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        const [rows] = await pool.query("SELECT * FROM User WHERE email = ?", [email]);
        const users = rows as any[];

        if (users.length === 0) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            )
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            )
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        )

        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Login error:", error)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json(
            { message: "Internal server error", details: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
            { status: 500 }
        )
    }
}
