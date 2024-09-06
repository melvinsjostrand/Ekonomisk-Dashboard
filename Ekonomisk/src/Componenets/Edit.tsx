import { Button, HStack, Input, Popover, PopoverAnchor, PopoverTrigger, useBoolean } from "@chakra-ui/react";

function WithPopoverAnchor() {
  const [isEditing, setIsEditing] = useBoolean();

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
            type="number"
            w="auto"
            display="inline-flex"
            isDisabled={!isEditing}
            defaultValue="1000"
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
}

export default WithPopoverAnchor