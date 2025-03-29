export type TestCase = {
  input: string;
  expected: string;
  isHidden?: boolean;
};

export type Problem = {
  id: string;
  title: string;
  tag: string;
  score: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  note?: string;
  limits: {
    timeLimit: string;
    memoryLimit: string;
    sourceLimit: string;
  };
  allowedLanguages: string[];
  testCases: TestCase[];
};

export const problems: Problem[] = [
  {
    id: "1",
    title: "Minimum Ship Engine Capacity",
    tag: "Programming",
    score: 20,
    description: "A large logistics company operates a daily cargo transfer service between two coastal distribution hubs. Every morning, a fixed sequence of packages arrives on a conveyor belt at the loading dock. Each package has already been scanned, labeled, insured, and arranged according to its dispatch priority.\n\nThe company owns a cargo ship that can make exactly one loading operation per day. The ship has a fixed maximum weight capacity. During a day, workers load packages from the conveyor belt onto the ship one by one, starting from the first remaining package. They must follow the given order strictly because the packages are already arranged according to customs clearance, route priority, and warehouse unloading sequence at the destination port.\n\nOnce the total weight of the loaded packages would exceed the ship’s capacity, no more packages can be loaded on that day. The ship then departs, and the remaining packages wait for the next day.\n\nYou are given an array `weights`, where `weights[i]` represents the weight of the `i-th` package on the conveyor belt. You are also given an integer `days`, representing the maximum number of days within which all packages must be transported.\n\nYour task is to determine the minimum possible ship capacity such that all packages can be shipped within at most `days` days.\n\n### Important Loading Rules\n* Packages must be shipped in the same order as they appear in the `weights` array.\n* A package cannot be split into smaller parts.\n* Each package must be shipped completely on exactly one day.\n* The ship may carry multiple packages in one day as long as their total weight does not exceed the chosen capacity.\n* The ship capacity must be at least as large as the heaviest single package.",
    inputFormat: "You are given an array `weights`, where `weights[i]` represents the weight of the `i-th` package. You are also given an integer `days`.",
    outputFormat: "Complete the function `int shipWithinDays(vector<int>& weights, int days)` that returns the minimum ship capacity required.",
    constraints: "1 <= days <= weights.length <= 5 * 10^4\n1 <= weights[i] <= 500",
    sampleInput: "weights = [1,2,3,4,5,6,7,8,9,10]\ndays = 5",
    sampleOutput: "15",
    explanation: "With a ship capacity of 15, the packages can be shipped in 5 days as follows:\nDay 1: 1, 2, 3, 4, 5\nDay 2: 6, 7\nDay 3: 8\nDay 4: 9\nDay 5: 10\n\nThe total weight loaded on each day does not exceed 15.",
    note: "Expected Approach: The answer lies between maximum package weight <= answer <= sum of all package weights. You need to find the smallest capacity in this range for which all packages can be transported within `days` days.",
    limits: {
      timeLimit: "1.0 sec(s) for each input file",
      memoryLimit: "256 MB",
      sourceLimit: "1024 KB",
    },
    allowedLanguages: [
      "Bash", "C", "C++14", "C++17", "Clojure", "C#", "D", "Erlang", "F#", "Go", "Groovy", "Haskell", "Java 8", "Java 14", "JavaScript(Node.js)", "Julia", "Kotlin", "Lisp (SBCL)", "Lua", "Objective-C", "OCaml", "Octave", "Pascal", "Perl", "PHP", "Python", "Python 3", "Python 3.8", "R(RScript)", "Racket", "Ruby", "Rust", "Scala", "Swift", "TypeScript", "Visual Basic"
    ],
    testCases: [
      { input: "weights = [1,2,3,4,5,6,7,8,9,10]\ndays = 5", expected: "15", isHidden: false },
      { input: "weights = [3,2,2,4,1,4]\ndays = 3", expected: "6", isHidden: false },
      { input: "weights = [1,2,3,1,1]\ndays = 4", expected: "3", isHidden: false },
      { input: "weights = [10]\ndays = 1", expected: "10", isHidden: true },
      { input: "weights = [5, 8, 2, 9]\ndays = 4", expected: "9", isHidden: true },
      { input: "weights = [1, 2, 3, 4, 5]\ndays = 1", expected: "15", isHidden: true },
      { input: "weights = [4, 4, 4, 4, 4, 4]\ndays = 3", expected: "8", isHidden: true },
      { input: "weights = [1, 1, 10, 1, 1]\ndays = 2", expected: "12", isHidden: true },
      { input: "weights = [7, 2, 5, 10, 8]\ndays = 2", expected: "18", isHidden: true },
      { input: "weights = [1, 2, 3, 4, 5, 6]\ndays = 3", expected: "9", isHidden: true },
      { input: "weights = [6, 5, 4, 3, 2, 1]\ndays = 3", expected: "9", isHidden: true },
      { input: "weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]\ndays = 5", expected: "2", isHidden: true },
      { input: "weights = [500, 500, 500, 500, 500]\ndays = 2", expected: "1500", isHidden: true },
    ]
  },
  {
    id: "2",
    title: "Customer Identity Consolidation",
    tag: "Programming",
    score: 20,
    description: "A digital services company stores customer profile information collected from multiple platforms such as mobile apps, web portals, support tickets, billing systems, and promotional signup forms. Over time, the same customer may create multiple profiles using different forms or devices. Sometimes, one profile may contain one set of email addresses, while another profile may contain another set of email addresses.\n\nTo reduce duplicate records, the company wants to consolidate profiles that definitely belong to the same real person.\n\nYou are given a list of customer account records. Each account record is represented as a list of strings.\n\nFor every account:\n* The first string represents the customer’s name.\n* All remaining strings represent email addresses associated with that account.\n\nTwo account records should be merged if they share at least one common email address.\n\nIt is also possible for multiple accounts to be connected indirectly.\n\nHowever, the name alone is not enough to merge accounts. Two different people may have the same name. Therefore, if two accounts have the same name but do not share any email address directly or indirectly, they must remain separate.",
    inputFormat: "You are given a list of customer account records. Each account record is represented as a list of strings.",
    outputFormat: "Return the final merged accounts. The first element should be the person’s name. The remaining elements should be all unique email addresses sorted in lexicographical order. The final list of merged accounts can be returned in any order.",
    constraints: "1 <= accounts.length <= 1000\n2 <= accounts[i].length <= 10\n1 <= accounts[i][j].length <= 30\naccounts[i][0] consists of English letters.\naccounts[i][j] for j > 0 is a valid email address.",
    sampleInput: "accounts = [\n  [\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],\n  [\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],\n  [\"Mary\",\"mary@mail.com\"],\n  [\"John\",\"johnnybravo@mail.com\"]\n]",
    sampleOutput: "[\n  [\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],\n  [\"Mary\",\"mary@mail.com\"],\n  [\"John\",\"johnnybravo@mail.com\"]\n]",
    explanation: "The first and second accounts belong to the same person because both contain the email: johnsmith@mail.com.\nSo all emails from those two accounts are combined into one merged account.\nThe account belonging to Mary has no shared email. The last account has the name John but no shared email with the other John accounts, so it remains separate.",
    note: "Expected Idea: You need to group accounts that are connected by common email addresses. Each email is a connection point. If two accounts share an email, they belong to the same group. This can be solved using graph traversal such as DFS or BFS, or using Disjoint Set Union.",
    limits: {
      timeLimit: "1.0 sec(s) for each input file",
      memoryLimit: "256 MB",
      sourceLimit: "1024 KB",
    },
    allowedLanguages: [
      "Bash", "C", "C++14", "C++17", "Clojure", "C#", "D", "Erlang", "F#", "Go", "Groovy", "Haskell", "Java 8", "Java 14", "JavaScript(Node.js)", "Julia", "Kotlin", "Lisp (SBCL)", "Lua", "Objective-C", "OCaml", "Octave", "Pascal", "Perl", "PHP", "Python", "Python 3", "Python 3.8", "R(RScript)", "Racket", "Ruby", "Rust", "Scala", "Swift", "TypeScript", "Visual Basic"
    ],
    testCases: [
      { input: "accounts = [\n  [\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],\n  [\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],\n  [\"Mary\",\"mary@mail.com\"],\n  [\"John\",\"johnnybravo@mail.com\"]\n]", expected: "[\n  [\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],\n  [\"Mary\",\"mary@mail.com\"],\n  [\"John\",\"johnnybravo@mail.com\"]\n]", isHidden: false },
      { input: "accounts = [\n  [\"Gabe\",\"Gabe0@m.co\",\"Gabe3@m.co\",\"Gabe1@m.co\"],\n  [\"Kevin\",\"Kevin3@m.co\",\"Kevin5@m.co\",\"Kevin0@m.co\"],\n  [\"Ethan\",\"Ethan5@m.co\",\"Ethan4@m.co\",\"Ethan0@m.co\"],\n  [\"Hanzo\",\"Hanzo3@m.co\",\"Hanzo1@m.co\",\"Hanzo0@m.co\"],\n  [\"Fern\",\"Fern5@m.co\",\"Fern1@m.co\",\"Fern0@m.co\"]\n]", expected: "[\n  [\"Ethan\",\"Ethan0@m.co\",\"Ethan4@m.co\",\"Ethan5@m.co\"],\n  [\"Gabe\",\"Gabe0@m.co\",\"Gabe1@m.co\",\"Gabe3@m.co\"],\n  [\"Hanzo\",\"Hanzo0@m.co\",\"Hanzo1@m.co\",\"Hanzo3@m.co\"],\n  [\"Kevin\",\"Kevin0@m.co\",\"Kevin3@m.co\",\"Kevin5@m.co\"],\n  [\"Fern\",\"Fern0@m.co\",\"Fern1@m.co\",\"Fern5@m.co\"]\n]", isHidden: false },
      { input: "accounts = [\n  [\"Alex\",\"a@mail.com\",\"b@mail.com\"],\n  [\"Alex\",\"b@mail.com\",\"c@mail.com\"],\n  [\"Alex\",\"c@mail.com\",\"d@mail.com\"]\n]", expected: "[\n  [\"Alex\",\"a@mail.com\",\"b@mail.com\",\"c@mail.com\",\"d@mail.com\"]\n]", isHidden: false },
      { input: "accounts = [\n  [\"John\",\"a@mail.com\"],\n  [\"John\",\"b@mail.com\"]\n]", expected: "[\n  [\"John\",\"a@mail.com\"],\n  [\"John\",\"b@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"John\",\"a@mail.com\",\"b@mail.com\"],\n  [\"John\",\"b@mail.com\",\"c@mail.com\"]\n]", expected: "[\n  [\"John\",\"a@mail.com\",\"b@mail.com\",\"c@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"Alex\",\"a@mail.com\",\"b@mail.com\"],\n  [\"Alex\",\"c@mail.com\",\"d@mail.com\"],\n  [\"Alex\",\"b@mail.com\",\"c@mail.com\"]\n]", expected: "[\n  [\"Alex\",\"a@mail.com\",\"b@mail.com\",\"c@mail.com\",\"d@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"Raj\",\"r1@mail.com\",\"r2@mail.com\"],\n  [\"Raj\",\"r2@mail.com\",\"r3@mail.com\"],\n  [\"Raj\",\"r4@mail.com\",\"r5@mail.com\"],\n  [\"Raj\",\"r5@mail.com\",\"r6@mail.com\"]\n]", expected: "[\n  [\"Raj\",\"r1@mail.com\",\"r2@mail.com\",\"r3@mail.com\"],\n  [\"Raj\",\"r4@mail.com\",\"r5@mail.com\",\"r6@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"Maya\",\"m1@mail.com\",\"m1@mail.com\",\"m2@mail.com\"],\n  [\"Maya\",\"m2@mail.com\",\"m3@mail.com\"]\n]", expected: "[\n  [\"Maya\",\"m1@mail.com\",\"m2@mail.com\",\"m3@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"A\",\"a1@mail.com\"],\n  [\"B\",\"b1@mail.com\",\"b2@mail.com\"],\n  [\"B\",\"b2@mail.com\",\"b3@mail.com\"],\n  [\"C\",\"c1@mail.com\"]\n]", expected: "[\n  [\"A\",\"a1@mail.com\"],\n  [\"B\",\"b1@mail.com\",\"b2@mail.com\",\"b3@mail.com\"],\n  [\"C\",\"c1@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"Neha\",\"z@mail.com\",\"a@mail.com\",\"m@mail.com\"]\n]", expected: "[\n  [\"Neha\",\"a@mail.com\",\"m@mail.com\",\"z@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"Sam\",\"common@mail.com\",\"s1@mail.com\"],\n  [\"Sam\",\"common@mail.com\",\"s2@mail.com\"],\n  [\"Sam\",\"common@mail.com\",\"s3@mail.com\"],\n  [\"Sam\",\"common@mail.com\",\"s4@mail.com\"]\n]", expected: "[\n  [\"Sam\",\"common@mail.com\",\"s1@mail.com\",\"s2@mail.com\",\"s3@mail.com\",\"s4@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"Dev\",\"a@mail.com\",\"b@mail.com\"],\n  [\"Dev\",\"c@mail.com\",\"d@mail.com\"],\n  [\"Dev\",\"b@mail.com\",\"c@mail.com\"]\n]", expected: "[\n  [\"Dev\",\"a@mail.com\",\"b@mail.com\",\"c@mail.com\",\"d@mail.com\"]\n]", isHidden: true },
      { input: "accounts = [\n  [\"Karan\",\"k1@mail.com\",\"k2@mail.com\"],\n  [\"Karan\",\"k3@mail.com\"],\n  [\"Karan\",\"k2@mail.com\",\"k4@mail.com\"],\n  [\"Karan\",\"k5@mail.com\"]\n]", expected: "[\n  [\"Karan\",\"k1@mail.com\",\"k2@mail.com\",\"k4@mail.com\"],\n  [\"Karan\",\"k3@mail.com\"],\n  [\"Karan\",\"k5@mail.com\"]\n]", isHidden: true },
    ]
  }
];

export const defaultCppCode = `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    // Add your code here
    return 0;
};`;
