"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Next-UI components
import { Card, Textarea, Button } from "@nextui-org/react";

function TodoForm({ title, label, submitText, defaultValueText, submitEvent }) {
  const router = useRouter();
  const [newTodoValue, setNewTodoValue] = useState(defaultValueText || "");

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  const onCancel = () => {
    router.push("/");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    submitEvent(newTodoValue);
    router.push("/");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="h-screen flex justify-center items-center"
    >
      <Card className="p-4 w-4/5 flex flex-wrap justify-center items-center">
        <h2 className="py-2 font-bold">{title}</h2>
        <Textarea
          onChange={onChange}
          label={label}
          labelPlacement="outside"
          placeholder="Escribe una nota"
          variant="bordered"
          className="w-full py-2"
          defaultValue={newTodoValue}
        />
        <div className="w-full mt-2 flex justify-evenly">
          <Button
            onClick={onCancel}
            className="w-1/2 mx-1"
            color="danger"
            variant="bordered"
          >
            Cancelar
          </Button>
          <Button type="submit" className="w-1/2 mx-1" color="primary">
            {submitText}
          </Button>
        </div>
      </Card>
    </form>
  );
}

export { TodoForm };
