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
import { useAlltodosMutation } from "@/redux/slices/todoApiSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TTodo } from "@/type";

export default function ShowTask() {
  const [data, setData] = useState<TTodo[]>([]);
  const [alltodos] = useAlltodosMutation();

  const getData = async () => {
    try {
      const res = await alltodos({}).unwrap();
      setData(res);
      toast("Data Fetched From the Server!", {
        description: "Getting Ready from the server side!",
        action: {
          label: "Close",
          onClick: () => null,
        },
      });
    } catch (err: any) {
      toast("Failed to Fetching the data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table>
      <TableCaption>
        {data.length < 1
          ? "Try to add the task and organize in the list given table"
          : "A list of your recent tasks that will have you to remind."}
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
        {data.map((value, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{value.description}</TableCell>
              <TableCell>
                <EditTask id={value._id.toString()} />
              </TableCell>
              <TableCell className="text-right">
                <DeleteTask id={value._id.toString()} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
