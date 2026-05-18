// Hierarchy:
// Textbook
// |__Chapter
//    |__Section
//       |__Problem

// currently, the data model reflects a single user's accessible resources, and in the future should only return
// the info available to a student or instructor

const textbooks = [
  {
    id: "tb1",
    title: "Advanced Mathematics",
    author: "Andrew Math",
  },
  {
    id: "tb2",
    title: "Chemistry 101",
    author: "Darren Bean",
  },
];

const chapters = [
  { id: "tb1-ch1", textbook_id: "tb1", title: "Number Systems", order_index: 1 },
  { id: "tb1-ch2", textbook_id: "tb1", title: "Vector Analysis", order_index: 2 },
  { id: "tb1-ch3", textbook_id: "tb1", title: "Equations", order_index: 3 },
  { id: "tb2-ch1", textbook_id: "tb2", title: "Fundamentals of Chemistry", order_index: 1}
];

const sections = [
  {
    id: "tb1-sec1",
    textbook_id: "tb1",
    chapter_id: "tb1-ch1",
    title: "Natural Numbers and Induction",
    content: `Natural numbers (1, 2, 3, ...) are the foundation of all discrete mathematics. In formal logic, we often define them using the Peano Axioms, which establish that every natural number has a unique successor. 

One of the most powerful tools in this domain is Mathematical Induction. To prove a property P(n) for all natural numbers:
1. Base Case: Show P(1) is true.
2. Inductive Step: Show that if P(k) is true, then P(k+1) must also be true.

This 'domino effect' allows us to prove infinite sequences of statements with finite logic. It is frequently used in algorithm analysis to prove the correctness of recursive functions.`,
  },
  {
    id: "tb1-sec2",
    textbook_id: "tb1",
    chapter_id: "tb1-ch1",
    title: "The Real Number Line",
    content: `The Real Number system (R) encompasses all rational and irrational numbers. Unlike integers, real numbers are 'dense,' meaning between any two real numbers, there is always another real number.

A critical concept here is the Completeness Axiom. This states that every non-empty set of real numbers that is bounded above has a least upper bound (a supremum). Without this property, calculus as we know it would fail, as we could not guarantee the existence of limits for increasing sequences that stay within a certain range.`,
  },
  {
    id: "tb1-sec3",
    textbook_id: "tb1",
    chapter_id: "tb1-ch2",
    title: "The Divergence Theorem (Gauss's Law)",
    content: `The Divergence Theorem is a cornerstone of vector calculus. It relates the behavior of a vector field inside a volume to its behavior on the surface of that volume. 

Imagine a fluid flowing through space. The 'Divergence' of the velocity field at a point tells you if fluid is being created (a source) or disappearing (a sink) at that point. The theorem states:

The total flux of a vector field F through a closed surface S is equal to the integral of the divergence of F over the volume V enclosed by S.

Mathematically, this is expressed as the triple integral of (div F) over volume V being equal to the double integral of (F dot n) over surface S, where n is the outward-pointing unit normal vector. This is used extensively in physics to calculate electric fields and fluid pressure.`,
  },
  {
    id: "tb1-sec4",
    textbook_id: "tb1",
    chapter_id: "tb1-ch2",
    title: "Eigenvalues and System Stability",
    content: `In linear algebra, square matrices represent linear transformations. Eigenvalues (lambda) and Eigenvectors (v) are the 'DNA' of these matrices. They satisfy the equation: A * v = lambda * v.

When you multiply a matrix by its eigenvector, the vector doesn't change direction; it only gets scaled by the factor lambda. To find these values, we solve the Characteristic Equation: determinant of (A - lambda * I) = 0.

In engineering, eigenvalues are used to determine the stability of structures and circuits. If the real part of an eigenvalue in a differential system is positive, the system will grow without bound (instability). If negative, the system will settle back to equilibrium (stability).`,
  },
  {
    id: "tb2-sec1",
    textbook_id: "tb2",
    chapter_id: "tb2-ch1",
    title: "The Periodic Table",
    content: `There are exactly 118 confirmed elements in the periodic table, ranging from Hydrogen (atomic number 1) to Oganesson (atomic number 118).`
  }
];

// might move problems to same level as sections
const problems = [
  {
    id: "tb1-prob1",
    section_id: "tb1-sec3",
    question_text:
      "Verify the Divergence Theorem for a vector field F = (x, y, z) over a unit cube centered at the origin.",
  },
  {
    id: "tb1-prob2",
    section_id: "tb1-sec4",
    question_text:
      "Find the eigenvalues for a 2x2 matrix where the top row is [4, 1] and the bottom row is [2, 3].",
  },
];

const annotations = [
  {
    id: "1",
    content_id: "tb1-sec1",
    content_type: "section",
    body: "Induction is often compared to a row of falling dominoes; if the first falls, and any falling domino knocks over the next, they all fall.",
  },
  {
    id: "2",
    content_id: "tb1-sec3",
    content_type: "section",
    body: "Visual Tip: Think of flux as the amount of air blowing through a window. The Divergence Theorem says the total air leaving a room equals the sum of all air 'sources' (like fans) inside.",
  },
  {
    id: "3",
    content_id: "tb1-sec4",
    content_type: "section",
    body: "Critical Note: Eigenvalues are only defined for square matrices (n x n).",
  },
  {
    id: "4",
    content_id: "tb1-prob2",
    content_type: "problem",
    body: "Hint: The characteristic equation for this problem will be a quadratic equation: lambda^2 - 7*lambda + 10 = 0.",
  },
  {
    id: "5",
    content_id: "tb2-sec1",
    content_type: "section",
    body: "Elements 1 through 94 (from Hydrogen to Plutonium) exist in nature, though some are exceedingly rare or only appear in trace amounts."
  }
];

module.exports = {
  textbooks,
  chapters,
  sections,
  problems,
  annotations,
};