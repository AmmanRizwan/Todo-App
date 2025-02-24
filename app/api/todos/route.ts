import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Todo from "@/lib/models/todo.model";

// @desc get all the data from the server
// @route GET .../api/todos
export async function GET() {
  try {
    await connectDB();

    const todos = await Todo.find();

    if (!todos) {
      return NextResponse.json(
        { message: "Cannot Find the Todos!" },
        { status: 400 }
      );
    }
    return NextResponse.json(todos, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Cannot Display the descriptions.", error: err.message },
      { status: 500 }
    );
  }
}

// @desc create the data from the server
// @route POST .../api/todos
export async function POST(request: Request) {
  try {
    await connectDB();
    const { description } = await request.json();

    if (!description) {
      return NextResponse.json(
        { message: "Please Provide the Description to Submit!" },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json(
        { message: "Description only contain 500 characters." },
        { status: 400 }
      );
    }

    const todo = await Todo.create({ description: description });

    if (!todo) {
      return NextResponse.json(
        { message: "Something went wrong please check!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Todo's Description Created!" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
