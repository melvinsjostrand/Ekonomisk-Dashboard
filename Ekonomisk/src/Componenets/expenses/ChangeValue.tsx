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

type ChangeValueProps = {
  category: string;
  amount: number;
  onSave: (newAmount: number) => void; // Callback function to handle save
};

const ChangeValue = ({
  category,
  amount,
  onSave,
}: ChangeValueProps): JSX.Element => {
  const [isEditing, setIsEditing] = useBoolean();
  const [inputValue, setInputValue] = useState<number>(amount);

  useEffect(() => {
    setInputValue(amount); // Update input when amount changes
  }, [amount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value)); // Update input field value
  };

  const handleSave = () => {
    onSave(inputValue); // Call the parent function to save the value
    setIsEditing.off(); // Close the popover after saving
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
