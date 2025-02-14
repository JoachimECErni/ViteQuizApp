import { NavLink } from "react-router"
import { IQuizItem } from "../data/Questions"

function QuizItem({ quiz, endpoint }: { quiz: IQuizItem; endpoint: string }) {
  return (
    <NavLink
      to={`/${endpoint}/${quiz.id}`}
      className='w-full bg-blue-200 p-4 rounded-full'
    >
      {quiz.name}
    </NavLink>
  )
}

export default QuizItem
