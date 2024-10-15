import { 
  Alert, 
  AlertDescription, 
  AlertIcon, 
  AlertTitle, 
  Box, 
  Button, 
  CloseButton, 
  ListItem, 
  UnorderedList, 
  Image, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton 
} from "@chakra-ui/react";

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

  const {
    isOpen: isImageOpen,
    onOpen: openImage,
    onClose: closeImage,
  } = useDisclosure();

  return (
    <>
      {isVisible ? (
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
              {image && (
                <Image 
                  src={image} 
                  boxSize="150px" 
                  objectFit="cover" 
                  cursor="pointer" 
                  onClick={openImage} 
                />
              )}
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
      )}

      {/* Modal for enlarging the image */}
      {image && (
        <Modal isOpen={isImageOpen} onClose={closeImage} isCentered>
          <ModalOverlay />
          <ModalContent maxW="lg">
            <ModalCloseButton />
            <ModalBody>
              <Image src={image} objectFit="contain" w="100%" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Description;