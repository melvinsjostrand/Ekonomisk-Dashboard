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
import UseGetIncome from "../hooks/UseGetIncome";
import useMakeIncome from "../hooks/PostMakeIncome";

const categories = [
  "Housing",
  "Transport",
  "Food",
  "Health",
  "Entertainment",
  "Accessories",
  "Other",
];

const MakeIncome = () => {
  const [income, setIncome] = useState<number>(0);
  const [categoryLimits, setCategoryLimits] = useState<
    {userId: number; category: string; spendLimit: number }[]
  >([]);
  const [showSaveGoal, setSaveGoal] = useState<number | undefined>(undefined);
  const toast = useToast();

  const { data } = UseGetIncome();
  const { postMutation, putMutation } = useMakeIncome();

useEffect(() => {
  if (data && data.limits) {
    setIncome(data.income || 0);

    const limits = data.limits.map(
      (limit: {
        userId: number,
        category: string,
        spendLimit: number,
      }) => ({
        userId: limit.userId,
        category: limit.category,
        spendLimit: limit.spendLimit,
      })
    );

    setCategoryLimits(limits);
    setSaveGoal(data.saveGoal);
  }
}, [data]);

  const handleLimitChange = (category: string, value: string) => {
    setCategoryLimits((prevLimits) =>
      prevLimits.map((limit) =>
        limit.category === category
          ? { ...limit, spendLimit: Number(value) }
          : limit
      )
    );
  };

  const getTotalLimits = () => {
    return categoryLimits.reduce((acc, limit) => acc + limit.spendLimit, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalLimits = getTotalLimits();

    if (income > 0 && categoryLimits.length === categories.length) {
      if (totalLimits > income) {
        toast({
          title: "Over Budget",
          description: "You are over your budget. Please adjust your limits.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const incomeData = {
          userId: 1,
          income,
          saveGoal: showSaveGoal,
          limits: categoryLimits.map((limit) => ({
            userId: limit.userId,
            category: limit.category,
            spendLimit: limit.spendLimit,
          })),
        };

        if (data && data.income) {
          putMutation.mutate(incomeData, {
            onSuccess: () => {
              toast({
                title: "Success",
                description: "Income and limits updated successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            },
            onError: () => {
              toast({
                title: "Error",
                description: "There was an error updating the data.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            },
          });
        } else {
          postMutation.mutate(incomeData, {
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
          });
        }
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
                      value={
                        categoryLimits.find(
                          (limit) => limit.category === category
                        )?.spendLimit || "" 
                      }
                      onChange={(e) =>
                        handleLimitChange(category, e.target.value)
                      }
                    />
                  </FormControl>
                </HStack>
              </GridItem>
            ))}
          </Grid>

          <FormControl>
            <FormLabel>Save Goal</FormLabel>
            <Input
              type="number"
              value={showSaveGoal}
              onChange={(e) => setSaveGoal(Number(e.target.value))}
            />
          </FormControl>

          <Box
            textAlign="center"
            color={getTotalLimits() > income ? "red.500" : "green.500"}
            fontWeight="bold"
          >
            {`Total limits: ${getTotalLimits()} / ${income} ${
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
