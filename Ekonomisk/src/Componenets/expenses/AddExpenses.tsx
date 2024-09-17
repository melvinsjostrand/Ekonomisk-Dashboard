import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  IconButton,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  Collapse
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const categories = [
  "Boende",
  "Transport",
  "Mat och dagligvaror",
  "Hälsa och välmående",
  "Fritid och underhållning",
  "Kläder och accessoarer",
  "Personlig utveckling",
  "Övrigt",
];

const AddExpenses = () => {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isAddingDescription, setIsAddingDescription] =
    useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const addDescription = () => setDescriptions([...descriptions, ""]);
  const removeDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., add expense to a list or send to an API
    console.log({ category, amount, descriptions });
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Button mb={4} onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Hide Form" : "Show Form"}
      </Button>

      {isFormVisible && (
        <Box>
          <FormControl id="category" mb={4}>
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="amount" mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </FormControl>

          <Button
            mb={4}
            onClick={() => setIsAddingDescription(!isAddingDescription)}
          >
            {isAddingDescription ? "Hide Descriptions" : "Add Descriptions"}
          </Button>

          <Collapse in={isAddingDescription}>
            <FormControl id="descriptions" mb={4}>
              <FormLabel>Descriptions</FormLabel>
              {descriptions.map((desc, index) => (
                <HStack key={index} mb={2}>
                  <Input
                    value={desc}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    placeholder={`Description ${index + 1}`}
                  />
                  <IconButton
                    aria-label="Remove description"
                    icon={<CloseIcon />}
                    onClick={() => removeDescription(index)}
                  />
                </HStack>
              ))}
              <Button leftIcon={<AddIcon />} onClick={addDescription}>
                Add Description
              </Button>
            </FormControl>
          </Collapse>

          <Button colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
          <Button ml={4} onClick={() => setIsFormVisible(false)}>
            Close Form
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddExpenses