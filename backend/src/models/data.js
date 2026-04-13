const textbooks = [
  {
    id: "tb1",
    title: "Intro to Mathematics",
    author: "Mock Author",
  },
];

const chapters = [
  { id: "ch1", textbook_id: "tb1", title: "Numbers", order_index: 1 },
];

const sections = [
  {
    id: "sec1",
    chapter_id: "ch1",
    title: "Natural Numbers",
    content: `
Natural numbers are the numbers used for counting: 1, 2, 3, ...

They are the foundation of arithmetic and are essential in mathematics.
    `,
  },
];

const problems = [
  {
    id: "prob1",
    section_id: "sec1",
    question_text: "What is 2 + 2?",
  },
];

const annotations = [];

module.exports = {
  textbooks,
  chapters,
  sections,
  problems,
  annotations,
};