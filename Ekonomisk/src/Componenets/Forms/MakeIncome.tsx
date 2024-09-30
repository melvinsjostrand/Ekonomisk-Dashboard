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
import useMakeIncome from "../hooks/UseMakeIncome";

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
  const [categoryLimits, setCategoryLimits] = useState<Record<string, number>>(
    {}
  );
  const [showSaveGoal, setSaveGoal] = useState<number | undefined>(undefined);
  const toast = useToast();

  const { data: incomeData, isLoading, error } = UseGetIncome();
  const mutation = useMakeIncome();

   useEffect(() => {
     if (incomeData) {
       setIncome(incomeData.income || 0);


       if (incomeData.limits) {
         const limits = incomeData.limits.reduce<Record<string, number>>(
           (acc, limit) => {
             acc[limit.category] = limit.spendLimit;
             return acc;
           },
           {}
         );
         setCategoryLimits(limits);
       } else {
          console.log("This user dont have any limits set for this month");
       }

       setSaveGoal(incomeData.saveGoal);
     }
   }, [incomeData, toast]);

  const handleLimitChange = (category: string, value: string) => {
    setCategoryLimits((prevLimits) => ({
      ...prevLimits,
      [category]: Number(value),
    }));
  };

  const getTotalLimits = () => {
    return Object.values(categoryLimits).reduce((acc, limit) => acc + limit, 0);
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
            userId: 1, 
            income,
            categoryLimits,
            saveGoal: showSaveGoal,
          },
          {
            onSuccess: () => {
              console.log(mutation)
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
              <FormLabel>Save Goal</FormLabel>
              <Input
                type="number"
                value={showSaveGoal || ""}
                onChange={(e) => setSaveGoal(Number(e.target.value))}
              />
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
