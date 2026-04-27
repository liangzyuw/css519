const textbooks = [
  {
    id: "tb1",
    title: "Intro to Mathematics",
    author: "Andrew Math",
  },
];

const chapters = [
  { id: "ch1", textbook_id: "tb1", title: "Numbers", order_index: 1 },
];

const sections = [
  {
    id: "sec1",
    textbook_id: "tb1",
    chapter_id: "ch1",
    title: "Natural Numbers",
    content: `
Natural numbers are the numbers used for counting: 1, 2, 3, ...

They are the foundation of arithmetic and are essential in mathematics.
    `,
  },
  {
    id: "sec2",
    textbook_id: "tb1",
    chapter_id: "ch1",
    title: "Integers",
    content: `
Integers include all natural numbers, their negatives, and zero: ..., -3, -2, -1, 0, 1, 2, 3, ...

They are used to represent quantities that can be positive, negative, or zero.
    `,
  },
  {
    id: "sec3",
    textbook_id: "tb1",
    chapter_id: "ch1",
    title: "Rational Numbers",
    content: `
Rational numbers are numbers that can be expressed as the quotient or fraction of two integers, where the denominator is not zero.

They include all integers and fractions.
    `,
  }
];

const problems = [
  {
    id: "prob1",
    section_id: "sec1",
    question_text: "What is 2 + 2?",
  },
];

const annotations = [
  // {
  //   id: "ann_1",
  //   content_id: "sec1",
  //   content_type: "section",
  //   author_id: "user_1",
  //   body: "This is a test annotation",
  //   visibility: "always"
  // }
];

// instantly make an annotation for testing purposes so we have something on frontend when load the page
annotations.push(
  {
    id: "test1",
    content_id: "sec1",
    content_type: "section",
    body: "It's important to understand natural numbers before moving on to integers.",
  },
  {
    id: "test2",
    content_id: "sec2",
    content_type: "section",
    body: "Integers include negative numbers, but not fractions.",
  }
  // {
  //   id: "test3",
  //   content_id: "sec3",
  //   content_type: "section",
  //   body: "By contrast, irrational numbers cannot be expressed as a simple fraction.",
  // }
);

module.exports = {
  textbooks,
  chapters,
  sections,
  problems,
  annotations,
};