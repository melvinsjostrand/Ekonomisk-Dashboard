import React, { useEffect, useState } from 'react'
import {
  Button,
  HStack,
  Input,
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  useBoolean,
} from "@chakra-ui/react";
import sharedData from '../hooks/data';

type ChangeValueProps = {
  category: string;
};

const ChangeValue: React.FC<ChangeValueProps> = ({ category }) => {
  const [isEditing, setIsEditing] = useBoolean();
  const payment = sharedData.payment.find((p) => p.category === category);
  const [inputValue, setInputValue] = useState<number>(payment?.amount || 0);

    useEffect(() => {
      setInputValue(payment?.amount || 0); // Update inputValue when payment changes
    }, [payment]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(Number(e.target.value)); // Update state when input changes
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
            color={"white"}
            w="auto"
            display="inline-flex"
            isDisabled={!isEditing}
            value={inputValue}
            onChange={handleInputChange}
          />
        </PopoverAnchor>
          <PopoverTrigger>
            <Button h="40px" colorScheme="pink">
              {isEditing ? "Save" : "Edit"}
            </Button>
          </PopoverTrigger>
      </HStack>
    </Popover>
  );
};

export default ChangeValue