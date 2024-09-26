import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import categoryColors from "../hooks/categoryColors";
import sharedData from "../hooks/data";
import User from "../hooks/user";
import useMakeIncome from "../hooks/UseMakeIncome";

interface MakeIncomeProps {
  onSubmit: (income: number, categoryLimits: Record<string, number>) => void;
}

const categories = [
  "Housing",
  "Transport",
  "Food",
  "Health",
  "Entertainment",
  "Accessories",
  "Other",
];

const MakeIncome = ({ onSubmit }: MakeIncomeProps) => {
  const [income, setIncome] = useState<number>(0);
  const [categoryLimits, setCategoryLimits] = useState<Record<string, number>>(
    {}
  );
  const [showSaveGoal, setSaveGoal] = useState<number>();
  const toast = useToast();

   const mutation = useMakeIncome();

  useEffect(() => {
    const currentUser = User.find((user) => user.Id === sharedData.userId);

    if (currentUser) {
      console.log(currentUser);
      setIncome(sharedData.sum || currentUser.totalSaving);
      setCategoryLimits(currentUser.Limits || {});
      setSaveGoal(sharedData.saveGoal);
    }
  }, []);

  const handleLimitChange = (category: string, value: string) => {
    setCategoryLimits((prevLimits) => ({
      ...prevLimits,
      [category]: Number(value),
    }));
  };

const getTotalLimits = () => {
  console.log("Category Limits:", categoryLimits); // Log the category limits
  return Object.values(categoryLimits || {}).reduce(
    (acc, limit) => acc + limit,
    0
  );
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalLimits = getTotalLimits();

    if (
      income > 0 &&
      Object.keys(categoryLimits).length === categories.length
    ) {
      if (totalLimits > income) {
        toast({
          title: "Over Budget",
          description: "You are over your budget. Please adjust your limits.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        mutation.mutate(
          {
            userId: sharedData.userId,
            income,
            categoryLimits,
            saveGoal: showSaveGoal, 
          },
          {
            onSuccess: () => {
              toast({
                title: "Success",
                description: "Income and limits saved successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            },
            onError: () => {
              toast({
                title: "Error",
                description: "There was an error saving the data.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            },
          }
        );
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={{ base: "6", md: "10" }}
      p={{ base: "6", md: "10" }}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading textAlign="center" mb="6" fontSize={{ base: "2xl", md: "3xl" }}>
        Enter Income and Category Limits
      </Heading>

      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <FormControl id="income" isRequired>
            <FormLabel>Total Income</FormLabel>
            <Input
              type="number"
              placeholder="Enter your total income"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          </FormControl>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {categories.map((category) => (
              <GridItem key={category}>
                <HStack>
                  <Box
                    width="24px"
                    height="24px"
                    mt={7}
                    borderRadius="full"
                    bg={categoryColors[category]}
                    flexShrink={0}
                  />
                  <FormControl id={category} isRequired>
                    <FormLabel>{category} Limit</FormLabel>
                    <Input
                      type="number"
                      placeholder={`Limit for ${category}`}
                      value={categoryLimits[category] || ""}
                      onChange={(e) =>
                        handleLimitChange(category, e.target.value)
                      }
                    />
                  </FormControl>
                </HStack>
              </GridItem>
            ))}
            <FormControl>
              <FormLabel>Save goal</FormLabel>

              <Input value={showSaveGoal}></Input>
            </FormControl>
          </Grid>

          <Box
            textAlign="center"
            color={getTotalLimits() > income ? "red.500" : "green.500"}
            fontWeight="bold"
          >
            {`Total Limits: ${getTotalLimits()} / ${income} ${
              getTotalLimits() > income ? "(Over Budget)" : ""
            }`}
          </Box>

          <Button type="submit" colorScheme="blue" size="lg" width="full">
            Submit Income and Limits
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MakeIncome;
