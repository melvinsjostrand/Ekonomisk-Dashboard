import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, ListItem, UnorderedList,Image, useDisclosure } from "@chakra-ui/react";


interface Props {
  description: string[];
  image?: string;
}
function Description({ description, image }: Props) {
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
        <AlertDescription>
          <UnorderedList>
            {description.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </UnorderedList>
          {image && <Image src={image} boxSize="150px" objectFit="cover" />}
        </AlertDescription>
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

export default Description;