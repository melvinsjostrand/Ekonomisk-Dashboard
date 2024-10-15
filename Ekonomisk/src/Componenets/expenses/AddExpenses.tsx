import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  IconButton,
  HStack,
  Collapse,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import usePostExpense from "../hooks/PostExpenses";
import useUserId from "../hooks/UseGetUser";
const categories = [
  "Housing",
  "Transport",
  "Food",
  "Health",
  "Entertainment",
  "Accessories",
  "Other",
];

const AddExpenses = () => {
  const [category, setCategory] = useState<string>("");
  const authToken = localStorage.getItem("Guid");
  const [amount, setAmount] = useState<number | "">("");
  const [, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescriptions] = useState<string[]>([]);
  const [isAddingDescription, setIsAddingDescription] =
    useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  
  const toast = useToast();
  const { data : userId} = useUserId();
  console.log(JSON.stringify(userId));
  const { mutate: postExpense } = usePostExpense();

  const addDescription = () => setDescriptions([...description, ""]);
  const removeDescription = (index: number) => {
    setDescriptions(description.filter((_, i) => i !== index));
  };
  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...description];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));

      // Convert the image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("b64: " + base64Image);

  const handleSubmit = () => {
    if (!authToken) {
      toast({
        title: "not Signed in",
        description: "You need to sign in to make an expense",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!category || !amount) {
      toast({
        title: "Error",
        description: "Please fill out all fields before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = {
      userId,
      category,
      amount,
      description,
      image: base64Image || "",
    };

    postExpense(data, {
      onSuccess: () => {
        window.location.reload();
        toast({
          title: "Success",
          description: "Expense added successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsFormVisible(false);
        setCategory("");
        setAmount("");
        setDescriptions([]);
        setPreview(null);
        setSelectedFile(null);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "There was an error submitting your expense.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(JSON.stringify(data));
      },
    });
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Button mb={4} onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Hide Form" : "Show Form"}
      </Button>

      {isFormVisible && (
        <Box>
          <FormControl id="category" mb={4} isRequired>
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
          <FormControl id="amount" mb={4} isRequired>
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
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Selected"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}

          <Collapse in={isAddingDescription}>
            <FormControl id="descriptions" mb={4}>
              <FormLabel>Descriptions</FormLabel>
              {description.map((desc, index) => (
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
                    color="red"
                  />
                </HStack>
              ))}

              <Button leftIcon={<AddIcon />} onClick={addDescription}>
                Add Description
              </Button>
            </FormControl>
          </Collapse>
          <Box>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
            <Button ml={4} onClick={() => setIsFormVisible(false)}>
              Close Form
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AddExpenses;
