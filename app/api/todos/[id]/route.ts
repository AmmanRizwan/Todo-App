import connectDB from "@/lib/db";
import Todo from "@/lib/models/todo.model";
import { NextResponse } from "next/server";

// @desc get the single data from the server
// @route GET .../api/todos/:id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // connect database
    await connectDB();
    // get the /:id param from the url
    const id = (await params).id;
    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json(
        { message: "The Todo's Description not exist!" },
        { status: 400 }
      );
    }

    return NextResponse.json(todo, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error on fetching single data", error: err.message },
      { status: 500 }
    );
  }
}

// @desc update the data from the server
// @route PUT .../api/todos/:id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;
    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json(
        { message: "Cannot find the description to udpate!" },
        { status: 400 }
      );
    }

    const { description } = await request.json();

    if (!description) {
      return NextResponse.json(
        { message: "Please Provide the Description to Save!" },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json(
        {
          message: "Description only contain 500 characters.",
        },
        { status: 400 }
      );
    }

    const updateTodo = await Todo.findByIdAndUpdate(id, {
      description: description,
    });

    if (!updateTodo) {
      return NextResponse.json(
        { message: "Something went wrong! Issue to edit!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Successfully Edit the Description" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error on Editing the Description", error: err.message },
      { status: 500 }
    );
  }
}

// @desc delete the data from the server
// @route DELETE .../api/todos/:id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return NextResponse.json(
        {
          message: "Something went wrong! Cannot find description",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Successfully Delete the Description" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error on Deleting the Description", error: err.message },
      { status: 500 }
    );
  }
}
