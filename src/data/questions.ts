const questions: {
  answers: { a: string; b: string; c: string; d: string };
  correct_answer: string;
  question: string;
}[] = [];

export default [
  {
    question: "Where is the capital of Vietnam?",
    options: [
      {
        id: "0",
        options: "A",
        answer: "Ha Noi",
      },
      {
        id: "1",
        options: "B",
        answer: "Ho Chi Minh",
      },
      {
        id: "2",
        options: "C",
        answer: "Da Nang",
      },
      {
        id: "3",
        options: "D",
        answer: "Quang Ninh",
      },
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "In what contintent is Indonesia?",
    options: [
      {
        id: "0",
        options: "A",
        answer: "South America",
      },
      {
        id: "1",
        options: "B",
        answer: "Europe",
      },
      {
        id: "2",
        options: "C",
        answer: "Asia",
      },
      {
        id: "3",
        options: "D",
        answer: "India",
      },
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Which continent has the highest population density? ",
    options: [
      {
        id: "0",
        options: "A",
        answer: "Asia",
      },
      {
        id: "1",
        options: "B",
        answer: "South Africa",
      },
      {
        id: "2",
        options: "C",
        answer: "Australia",
      },
      {
        id: "3",
        options: "D",
        answer: "Antarctica",
      },
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "what is 5X5",
    options: [
      {
        id: "0",
        options: "A",
        answer: "20",
      },
      {
        id: "1",
        options: "B",
        answer: "25",
      },
      {
        id: "2",
        options: "C",
        answer: "10",
      },
      {
        id: "3",
        options: "D",
        answer: "30",
      },
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "what is the square root of 169",
    options: [
      {
        id: "0",
        options: "A",
        answer: "20",
      },
      {
        id: "1",
        options: "B",
        answer: "23",
      },
      {
        id: "2",
        options: "C",
        answer: "13",
      },
      {
        id: "3",
        options: "D",
        answer: "23",
      },
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "What is the Smallest Ocean?",
    options: [
      {
        id: "0",
        options: "A",
        answer: "Atlantic Ocean",
      },
      {
        id: "1",
        options: "B",
        answer: "Pacific Ocean",
      },
      {
        id: "2",
        options: "C",
        answer: "Arctic Ocean",
      },
      {
        id: "3",
        options: "D",
        answer: "Indian Ocean",
      },
    ],
    correctAnswerIndex: 2,
  },
];