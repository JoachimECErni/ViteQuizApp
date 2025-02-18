import React from "react"
import { QuizState } from "../pages/Quiz"

function QuizStepper({
  userAnswers,
  quizLength,
}: {
  userAnswers: QuizState[]
  quizLength: number
}) {
  const stepperComponents = []
  for (let i = 0; i < quizLength; i++) {
    let color =
      i < userAnswers.length ? "bg-blue-300" : "bg-gray-500 text-black"
    stepperComponents.push(
      <span
        key={i}
        className={` flex items-center justify-center w-20 h-20 ${color} rounded-full `}
      >
        {i + 1}
      </span>
    )
  }
  return (
    <div className='flex justify-center gap-x-10 mt-10'>
      {stepperComponents}
    </div>
  )
}

export default QuizStepper
