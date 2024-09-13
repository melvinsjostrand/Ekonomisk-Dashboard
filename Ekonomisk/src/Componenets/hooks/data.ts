import User from "./user";

const sharedData = {
  userId: User[0].Id,
  Id: 1,
  sum: 3000,
  payment: [
    { id: 1, category: "Transport", amount: 700, desc: ["Bus", "Taxi"] },
    { id: 2, category: "Mat och dagligvaror", amount: 300, desc: ["Kött"] },
    { id: 3, category: "Hälsa och välmående", amount: 400, desc: ["Gymkort"] },
    {
      id: 4,
      category: "Kläder och accessoarer",
      amount: 90,
      desc: ["T-shirt"],
    },
    {
      id: 5,
      category: "Fritid och underhållning",
      amount: 42,
      desc: ["Godis"],
    },
    {
      id: 6,
      category: "Kläder och accessoarer",
      amount: 40,
      desc: ["Byxor", "Socks"],
    },
  ],
  totalSpent: 0,
  remaining: 0,
  saveGoal: 40000,
};

export default sharedData;


