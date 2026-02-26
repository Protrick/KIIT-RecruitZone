const mongoose = require("mongoose");
require("dotenv").config();
const Problem = require("./models/Problem");

mongoose.connect(process.env.MONGO_URI);

const problems = [

  // ================= DSA =================

  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    category: "dsa",
    difficulty: "easy",
    topic: "array",
    company: "Amazon",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    category: "dsa",
    difficulty: "medium",
    topic: "sliding-window",
    company: "Microsoft",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.",
    category: "dsa",
    difficulty: "medium",
    topic: "array",
    company: "Google",
    link: "https://leetcode.com/problems/merge-intervals/"
  },
  {
    title: "Word Ladder",
    description: "Given two words and a dictionary, find the shortest transformation sequence.",
    category: "dsa",
    difficulty: "hard",
    topic: "graph",
    company: "Facebook",
    link: "https://leetcode.com/problems/word-ladder/"
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    category: "dsa",
    difficulty: "easy",
    topic: "dp",
    company: "Adobe",
    link: "https://leetcode.com/problems/climbing-stairs/"
  },

  // ================= QUANTITATIVE =================

  {
    title: "Time and Work Problem",
    description: "A can complete a task in 10 days and B in 15 days. In how many days will they complete the task together?",
    category: "quantitative",
    difficulty: "easy",
    topic: "time-work",
    company: "TCS",
    link: ""
  },
  {
    title: "Profit and Loss",
    description: "A shopkeeper gains 20% by selling an item at Rs. 1200. Find the cost price.",
    category: "quantitative",
    difficulty: "easy",
    topic: "profit-loss",
    company: "Infosys",
    link: ""
  },
  {
    title: "Simple Interest Calculation",
    description: "Find the simple interest on Rs. 5000 at 5% per annum for 3 years.",
    category: "quantitative",
    difficulty: "easy",
    topic: "interest",
    company: "Wipro",
    link: ""
  },
  {
    title: "Permutation Problem",
    description: "In how many ways can 5 people be seated in a row?",
    category: "quantitative",
    difficulty: "medium",
    topic: "permutation",
    company: "Accenture",
    link: ""
  },

  // ================= LOGICAL =================

  {
    title: "Blood Relation Puzzle",
    description: "Pointing to a man, a woman says he is the son of her grandfather’s only son. How is the man related to the woman?",
    category: "reasoning",
    difficulty: "medium",
    topic: "blood-relation",
    company: "Cognizant",
    link: ""
  },
  {
    title: "Seating Arrangement",
    description: "Five people are sitting in a row. A is to the left of B but to the right of C. Find their positions.",
    category: "reasoning",
    difficulty: "medium",
    topic: "arrangement",
    company: "Capgemini",
    link: ""
  },
  {
    title: "Coding Decoding",
    description: "In a certain code, CAT is written as DBU. How is DOG written?",
    category: "reasoning",
    difficulty: "easy",
    topic: "coding-decoding",
    company: "HCL",
    link: ""
  },

  // ================= VERBAL =================

  {
    title: "Sentence Correction",
    description: "Identify the grammatically incorrect part of the sentence.",
    category: "quantitative",
    difficulty: "easy",
    topic: "grammar",
    company: "Infosys",
    link: ""
  },
  {
    title: "Reading Comprehension",
    description: "Read the passage carefully and answer the questions that follow.",
    category: "quantitative",
    difficulty: "medium",
    topic: "rc",
    company: "TCS",
    link: ""
  },
  {
    title: "Synonym Identification",
    description: "Choose the word that is closest in meaning to the given word.",
    category: "quantitative",
    difficulty: "easy",
    topic: "vocabulary",
    company: "Wipro",
    link: ""
  },

  // ================= HARD DSA =================

  {
    title: "LRU Cache",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
    category: "dsa",
    difficulty: "hard",
    topic: "design",
    company: "Amazon",
    link: "https://leetcode.com/problems/lru-cache/"
  },
  {
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays, return the median of the two sorted arrays.",
    category: "dsa",
    difficulty: "hard",
    topic: "binary-search",
    company: "Google",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },
  {
    title: "Top K Frequent Elements",
    description: "Given an integer array nums and an integer k, return the k most frequent elements.",
    category: "dsa",
    difficulty: "medium",
    topic: "heap",
    company: "Facebook",
    link: "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
    title: "Detect Cycle in Linked List",
    description: "Given a linked list, determine if it has a cycle in it.",
    category: "dsa",
    difficulty: "easy",
    topic: "linked-list",
    company: "Microsoft",
    link: "https://leetcode.com/problems/linked-list-cycle/"
  }
];

const seedData = async () => {
  await Problem.deleteMany();
  await Problem.insertMany(problems);
  console.log("Data Seeded");
  process.exit();
};

seedData();