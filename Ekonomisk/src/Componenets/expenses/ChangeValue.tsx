import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Input,
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  useBoolean,
} from "@chakra-ui/react";
import PutUpdateIncome from "../hooks/PutExpense";

type ChangeValueProps = {
  id:number;
  amount: number;
};

const ChangeValue = ({id, amount}: ChangeValueProps): JSX.Element => {
  const [isEditing, setIsEditing] = useBoolean();
  const [inputValue, setInputValue] = useState<number>(amount);

  const { mutate: updateIncome} = PutUpdateIncome();

  useEffect(() => {
    setInputValue(amount);
  }, [amount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  const handleSave = () => {
    const updated = {
      id,
      amount: inputValue,
    };
    updateIncome(updated, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: () => {
        console.log("error" + id + updated);
      },
    });
  };

  return (
    <Popover
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
      closeOnBlur={false}
      isLazy
      lazyBehavior="keepMounted"
    >
      <HStack>
        <PopoverAnchor>
          <Input
            color="white"
            w="auto"
            display="inline-flex"
            isDisabled={!isEditing}
            value={inputValue}
            onChange={handleInputChange}
          />
        </PopoverAnchor>
        <PopoverTrigger>
          <Button
            h="40px"
            colorScheme="pink"
            onClick={isEditing ? handleSave : setIsEditing.on}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </PopoverTrigger>
      </HStack>
    </Popover>
  );
};

export default ChangeValue;
