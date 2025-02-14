import { QuizChoice } from "../../data/Questions"
import PrimaryButton from "../Button/PrimaryButton"
import QuizButton from "../Button/QuizButton"

export interface QuestionData {
  questionIndex: number
  id: number
  description: string
  choices: QuizChoice[]
  correctChoiceID: number
}

function QuizHero({
  Question,
  handleClickedAnswer,
}: {
  Question: QuestionData
  handleClickedAnswer: Function
}) {
  let { questionIndex, id, description, choices, correctChoiceID } = Question

  let answer = choices.find((choice) => choice.id === correctChoiceID)

  return (
    <div className='flex flex-col gap-y-10 text-center'>
      <h1 className='text-6xl'>{questionIndex + 1}</h1>
      <p className=''>{description}</p>
      <div className='grid grid-cols-2 gap-y-10'>
        {choices.map((choice) => (
          <QuizButton
            key={`${choice.id}${choice.description}}`}
            clickFunc={() =>
              handleClickedAnswer({
                index: questionIndex,
                question: description,
                actual: choice,
                expected: answer,
              })
            }
          >
            {choice.description}
          </QuizButton>
        ))}
      </div>
    </div>
  )
}

export default QuizHero
