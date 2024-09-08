import React from 'react'
import {
    Button,
    color,
    HStack,
    Input,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  useBoolean,
} from "@chakra-ui/react";
import sharedData from '../hooks/data';

type ChangeValueProps = {
  category: string; // Use 'category' as the identifier
};

const ChangeValue: React.FC<ChangeValueProps> = ({ category }) => {
  const [isEditing, setIsEditing] = useBoolean();
  const payment = sharedData.payment.find((p) => p.category === category);
  const defaultPaymentAmount = payment?.amount || 0; // If no match, default to 0
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
            defaultValue={defaultPaymentAmount}
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