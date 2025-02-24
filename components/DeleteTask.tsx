"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeleteIcon } from "lucide-react";
import { useRemovetodoMutation } from "@/redux/slices/todoApiSlice";
import { toast } from "sonner";

export default function DeleteTask({ id }: { id: string }) {
  const [removetodo] = useRemovetodoMutation();

  const removeSubmit = async (id: string) => {
    try {
      const res = await removetodo(id).unwrap();
      toast(res.message, {
        description: "Proceesing to delete the description",
        action: {
          label: "Close",
          onClick: () => null,
        },
      });
    } catch (err: any) {
      toast(err.data.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <DeleteIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            description and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeSubmit(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
