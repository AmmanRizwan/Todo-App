import InputTask from "@/components/InputTask";
import ShowTask from "@/components/ShowTask";

export default function Todo() {
  return (
    <div className="flex justify-center">
      <div className="w-5/6 my-12">
        <InputTask />
        <ShowTask />
      </div>
    </div>
  );
}
