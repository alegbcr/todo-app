import { Spinner } from "@nextui-org/react";

const TodosLoading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Spinner size="lg" />
      <p className="mt-2 font-bold text-blueColor">Cargando TODOs...</p>
    </div>
  );
};

export { TodosLoading };
