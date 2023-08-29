import { Input } from "@nextui-org/react";

// icons
import { FaSistrix } from "react-icons/fa6";

function TodoSearch({ searchValue, setSearchValue }) {
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="relative w-5/6 mt-4">
      <Input
        className="w-full px-2"
        placeholder="Buscar"
        variant="bordered"
        onChange={onSearchValueChange}
        value={searchValue}
      />
      <FaSistrix className="absolute top-1/4 right-6" />
    </div>
  );
}

export { TodoSearch };
