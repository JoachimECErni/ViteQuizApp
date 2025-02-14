import { CreateQuizQuestionField } from "../pages/CreateQuiz"

export interface QuizData {
  id: number
  name: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: number
  description: string
  choices: QuizChoice[]
  correctChoiceID: number
}
export interface QuizChoice {
  id: number
  description: string
}

export interface ReducerQuizData {
  id: number
  name?: string
  questions?: QuizQuestion[]
}

export interface ReducerQuizQuestion {
  id: number
  description?: string
  choices: QuizChoice[]
  correctChoiceID?: number
}
export interface ReducerQuizChoice {
  id: number
  description?: string
}

export interface IQuizItem {
  id: number
  name: string
}

export const CreateQuizQuestionFieldTemplate: CreateQuizQuestionField = {
  description: undefined,
  choices: Array(4).fill(undefined),
  correctAnswer: undefined,
}

// export const quizData: QuizQuestion[] = [
//   {
//     question:
//       "Which programming language does not need to use semicolons to end the statement?",
//     choices: ["Java", "C++", "Python", "Ruby"],
//     answer: "Python",
//   },
//   {
//     question: "What does HTML stand for?",
//     choices: [
//       "Hyper Text Markup Language",
//       "High Text Markup Language",
//       "Hyperlink and Text Markup Language",
//       "Hyper Textual Markup Language",
//     ],
//     answer: "Hyper Text Markup Language",
//   },
//   {
//     question: "Which language is primarily used for web development?",
//     choices: ["Python", "Java", "JavaScript", "C#"],
//     answer: "JavaScript",
//   },
//   {
//     question: "What is the main purpose of CSS?",
//     choices: [
//       "To structure web content",
//       "To style web content",
//       "To create web applications",
//       "To manage databases",
//     ],
//     answer: "To style web content",
//   },
//   {
//     question: "Which of the following is a JavaScript framework?",
//     choices: ["Django", "Flask", "React", "Ruby on Rails"],
//     answer: "React",
//   },
//   {
//     question: "What is the output of 2 + '2' in JavaScript?",
//     choices: ["4", "22", "Error", "undefined"],
//     answer: "22",
//   },
//   {
//     question: "Which of these is not a programming language?",
//     choices: ["Python", "HTML", "Java", "C++"],
//     answer: "HTML",
//   },
//   {
//     question: "What does API stand for?",
//     choices: [
//       "Application Programming Interface",
//       "Application Programming Integration",
//       "Application Program Interface",
//       "Application Programming Interaction",
//     ],
//     answer: "Application Programming Interface",
//   },
//   {
//     question: "Which of the following is a back-end programming language?",
//     choices: ["HTML", "CSS", "JavaScript", "PHP"],
//     answer: "PHP",
//   },
//   {
//     question: "What is the correct way to declare a variable in JavaScript?",
//     choices: [
//       "var x = 10;",
//       "let x = 10;",
//       "const x = 10;",
//       "All of the above",
//     ],
//     answer: "All of the above",
//   },
//   {
//     question: "Which of the following is a version control system?",
//     choices: ["Git", "Node.js", "React", "Django"],
//     answer: "Git",
//   },
//   {
//     question: "What does SQL stand for?",
//     choices: [
//       "Structured Query Language",
//       "Structured Question Language",
//       "Simple Query Language",
//       "Standard Query Language",
//     ],
//     answer: "Structured Query Language",
//   },
//   {
//     question: "Which HTML tag is used to define an internal style sheet?",
//     choices: ["<style>", "<css>", "<script>", "<link>"],
//     answer: "<style>",
//   },
//   {
//     question: "Which of the following is a popular front-end framework?",
//     choices: ["Laravel", "Angular", "Spring", "Flask"],
//     answer: "Angular",
//   },
//   {
//     question: "What is the purpose of the 'this' keyword in JavaScript?",
//     choices: [
//       "To refer to the global object",
//       "To refer to the current object",
//       "To refer to the parent object",
//       "To refer to the previous object",
//     ],
//     answer: "To refer to the current object",
//   },
//   {
//     question: "Which of the following is a NoSQL database?",
//     choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
//     answer: "MongoDB",
//   },
//   {
//     question: "What is the main function of a web server?",
//     choices: [
//       "To store data",
//       "To serve web pages",
//       "To process requests",
//       "All of the above",
//     ],
//     answer: "All of the above",
//   },
//   {
//     question: "Which of the following is a CSS preprocessor?",
//     choices: ["Sass", "JavaScript", "HTML", "PHP"],
//     answer: "Sass",
//   },
//   {
//     question: "What is the purpose of the <head> tag in HTML?",
//     choices: [
//       "To contain the main content of the page",
//       "To provide metadata about the document",
//       "To define the footer of the document",
//       "To create links to external resources",
//     ],
//     answer: "To provide metadata about the document",
//   },
//   {
//     question:
//       "Which of the following is a popular JavaScript library for building user interfaces?",
//     choices: ["jQuery", "Bootstrap", "React", "Angular"],
//     answer: "React",
//   },
//   {
//     question: "What is the purpose of a closure in JavaScript?",
//     choices: [
//       "To create a new scope",
//       "To encapsulate variables",
//       "To maintain state in asynchronous functions",
//       "All of the above",
//     ],
//     answer: "All of the above",
//   },
//   {
//     question:
//       "Which of the following is a method of the Array object in JavaScript?",
//     choices: ["map()", "filter()", "reduce()", "All of the above"],
//     answer: "All of the above",
//   },
//   {
//     question: "What is the difference between == and === in JavaScript?",
//     choices: [
//       "== checks for value equality, === checks for value and type equality",
//       "== checks for type equality, === checks for value equality",
//       "There is no difference",
//       "== is used for strings, === is used for numbers",
//     ],
//     answer:
//       "== checks for value equality, === checks for value and type equality",
//   },
//   {
//     question: "Which of the following is a popular Python web framework?",
//     choices: ["Flask", "Django", "FastAPI", "All of the above"],
//     answer: "All of the above",
//   },
//   {
//     question: "What is the purpose of the 'async' keyword in JavaScript?",
//     choices: [
//       "To define a function that returns a promise",
//       "To make a function run in parallel",
//       "To pause execution",
//       "To handle errors",
//     ],
//     answer: "To define a function that returns a promise",
//   },
//   {
//     question:
//       "Which of the following is a common way to handle asynchronous operations in JavaScript?",
//     choices: ["Callbacks", "Promises", "Async/Await", "All of the above"],
//     answer: "All of the above",
//   },
//   {
//     question: "What does the term 'responsive design' refer to?",
//     choices: [
//       "Designing for mobile devices only",
//       "Creating layouts that adapt to different screen sizes",
//       "Using fixed layouts",
//       "Designing only for desktop screens",
//     ],
//     answer: "Creating layouts that adapt to different screen sizes",
//   },
//   {
//     question: "Which of the following is a common CSS layout technique?",
//     choices: ["Flexbox", "Grid", "Float", "All of the above"],
//     answer: "All of the above",
//   },
//   {
//     question: "What is the purpose of the 'fetch' API in JavaScript?",
//     choices: [
//       "To make HTTP requests",
//       "To handle cookies",
//       "To manipulate the DOM",
//       "To create web sockets",
//     ],
//     answer: "To make HTTP requests",
//   },
// ]

export function shuffleArray(array: Array<any>) {
  return array.sort(() => Math.random() - 0.5)
}

export function shuffleQuiz(array: QuizQuestion[]) {
  const shuffledQuestions = shuffleArray([...array])

  shuffledQuestions.forEach((question) => {
    question.choices = shuffleArray([...question.choices])
  })

  return shuffledQuestions.slice(0, Math.min(array.length, 10))
}
