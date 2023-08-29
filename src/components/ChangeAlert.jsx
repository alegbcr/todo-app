import React from "react";
import { useStorageListener } from "@/hooks/useStorageListener";
// Next-UI Components
import { Card, Button } from "@nextui-org/react";

const ChangeAlert = ({ sincronize }) => {
  const { show, toggleShow } = useStorageListener(sincronize);
  if (show) {
    return (
      <div className="h-screen w-screen fixed bg-whiteColor flex justify-center items-center">
        <Card className="text-center p-4 w-4/5">
          <p className="p-4">
            Parece que haz cambiado tus TODOs en otra pestaña o ventana del
            navegador
          </p>
          <Button
            className="bg-blueColor text-whiteColor"
            onClick={() => toggleShow(false)}
          >
            Refrezcar
          </Button>
        </Card>
      </div>
    );
  } else {
    return null;
  }
};

export { ChangeAlert };
