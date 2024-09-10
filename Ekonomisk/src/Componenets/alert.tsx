import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, useDisclosure } from "@chakra-ui/react";

function CompExample() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  return isVisible ? (
    <Alert>
      <AlertIcon />
      <Box>
        <AlertTitle>Description</AlertTitle>
        <AlertDescription></AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button size="xs" fontSize="sm" padding="4px 8px" onClick={onOpen}>
      Show description
    </Button>
  );
}

export default CompExample