import { Card } from "@nextui-org/react";
import { FaRegCircleCheck, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

function TodoItem({ text, completed, onComplete, onDelete, onEdit }) {
  return (
    <li
      className={`my-2 w-11/12  bg-inherit flex flex-row items-start ${
        completed && "opacity-50"
      }`}
    >
      <Card
        className={`p-1 w-full flex flex-row justify-evenly items-center bg-iherit `}
      >
        <FaRegCircleCheck
          onClick={onComplete}
          className={`text-bases text-blueColor`}
        />
        <div className={`w-4/5`}>
          <p className="py-2 pl-1 ">{text}</p>
        </div>
        <FaPenToSquare
          onClick={onEdit}
          className={`text-bases text-blueColor mr-2`}
        />
        <FaTrashCan
          onClick={onDelete}
          className={`text-bases text-blueColor`}
        />
      </Card>
    </li>
  );
}

export { TodoItem };
