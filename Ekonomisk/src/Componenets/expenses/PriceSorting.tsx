import { Button, Icon } from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
}

const PriceSorting = ({ onSelectSortOrder }: Props) => {
  const [sortOrder, setSortOrder] = useState<null | boolean>(null);

  const handleSortToggle = () => {
    const newSortOrder =
      sortOrder === null || sortOrder === false ? true : false;
    setSortOrder(newSortOrder);
    onSelectSortOrder(newSortOrder ? "highest" : "lowest");
  };

  return (
    <Button
      onClick={handleSortToggle}
      rightIcon={
        sortOrder !== null ? (
          sortOrder ? (
            <BsChevronUp />
          ) : (
            <BsChevronDown />
          )
        ) : undefined
      }
    >
      {sortOrder === null
        ? "Sorting by Price"
        : sortOrder === true
        ? "Sorting by Price: Higher"
        : "Sorting by Price: Lower"}
    </Button>
  );
};

export default PriceSorting;
