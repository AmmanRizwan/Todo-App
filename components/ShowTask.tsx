"use client";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import EditTask from "@/components/EditTask";
import DeleteTask from "@/components/DeleteTask";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "@/lib/fetchData/todoApi";
import { TTodo } from "@/type";

export default function ShowTask() {
  const { data: todos, isLoading } = useQuery({
    queryFn: () => getTodo(),
    queryKey: ["todos"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableCaption>
        A list of your recent tasks that will have you to remind.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No.</TableHead>
          <TableHead className="text-center">Description</TableHead>
          <TableHead className="w-[60px]">Update</TableHead>
          <TableHead className="text-right w-[60px]">Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos?.map((todo: TTodo, index: number) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <EditTask id={todo._id.toString()} />
              </TableCell>
              <TableCell className="text-right">
                <DeleteTask id={todo._id.toString()} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
