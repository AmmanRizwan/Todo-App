"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postTodo } from "@/lib/fetchData/todoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function InputTask() {
  const queryClient = useQueryClient();

  const [desc, setDesc] = useState<string>("");

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const data = await addTodoMutation({ description: desc });
      toast(data?.message);
      setDesc("");
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
      <Button
        type="submit"
        onClick={async () => {
          const data = await addTodoMutation({ description: desc });
          toast(data?.message);
          setDesc("");
        }}
      >
        Submit
      </Button>
    </div>
  );
}
