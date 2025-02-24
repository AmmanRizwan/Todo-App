"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreatetodoMutation } from "@/redux/slices/todoApiSlice";
import { toast } from "sonner";

export default function InputTask() {
  const [desc, setDesc] = useState<string>("");
  const [createtodo] = useCreatetodoMutation();

  const submitDesc = async () => {
    try {
      const res = await createtodo({ description: desc }).unwrap();
      toast(res.message, {
        description: "Adding the Description on the Screen",
        action: {
          label: "Close",
          onClick: () => null,
        },
      });
      setDesc("");
    } catch (err: any) {
      toast(err.data.message);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitDesc();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <Input
        placeholder="Enter Your Task"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button type="submit" onClick={() => submitDesc()}>
        Submit
      </Button>
    </div>
  );
}
