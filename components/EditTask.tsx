"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import {
  useEdittodoMutation,
  useSingletodoMutation,
} from "@/redux/slices/todoApiSlice";
import { useState } from "react";
import { toast } from "sonner";

export default function EditTask({ id }: { id: string }) {
  const [desc, setDesc] = useState("");
  const [singletodo] = useSingletodoMutation();
  const [edittodo] = useEdittodoMutation();

  const SingleValue = async (id: string) => {
    try {
      const res = await singletodo(id).unwrap();
      setDesc(res.description);
    } catch (err: any) {
      toast(err.data.message);
    }
  };

  const EditSumbit = async (id: string) => {
    try {
      const res = await edittodo({
        id: id,
        data: { description: desc },
      }).unwrap();
      toast(res.message, {
        description: "The description is updated",
        action: {
          label: "Close",
          onClick: () => null,
        },
      });
    } catch (err: any) {
      console.log(err);
      toast(err.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => SingleValue(id)}>
          <Edit className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Your Todo Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              id="name"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => EditSumbit(id)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
