const URL: string = process.env.BASE_URL!;

export const getTodo = async () => {
  const res = await fetch(`api/todos`);
  const result = await res.json();

  return result;
};

export const postTodo = async (data: { description: string }) => {
  const res = await fetch(`api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const updateTodo = async ({
  id,
  data,
}: {
  id: string;
  data: { description: string };
}) => {
  const res = await fetch(`api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const getSingleTodo = async (id: string) => {
  const res = await fetch(`api/todos/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result = await res.json();
  return result;
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`api/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const result = res.json();
  return result;
};
