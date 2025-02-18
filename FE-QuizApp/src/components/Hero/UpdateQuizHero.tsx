import { UseFormRegister } from "react-hook-form"
import { QuizData, QuizQuestion } from "../../data/Questions"

interface IUpdateQuizHero {
  questions: QuizQuestion[] | null
  register: UseFormRegister<QuizData>
}

function UpdateQuizHero({ questions, register }: IUpdateQuizHero) {
  if (!questions) return <></>

  const choiceList = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]

  return (
    <>
      {questions.map((question, i) => (
        <div
          className='bg-white flex flex-col m-2 rounded-2xl p-4 text-center'
          key={question.id}
        >
          <span>Question {i + 1}</span>
          <input
            type='text'
            className='ring-1 rounded-2xl my-3 p-2 text-center'
            placeholder={`Enter question ${i + 1}`}
            defaultValue={question.description}
            {...register(`questions.${i}.description`)}
            // onChange={(e) =>
            //   handleDescriptionChange(question.id, e.target.value)
            // }
          />
          <div className='grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-2'>
            {question.choices.map((choice, index) => (
              <div className='grid grid-cols-1 gap-2' key={index}>
                <input
                  type='radio'
                  defaultChecked={choice.id === question.correctChoiceID}
                  value={choice.id}
                  {...register(`questions.${i}.correctChoiceID`)}
                  // onChange={() =>
                  //   handleCorrectChoiceIDChange(question.id, choice.id)
                  // }
                />
                <input
                  className='ring-1 rounded-2xl text-center'
                  type='text'
                  placeholder={choiceList[index]}
                  defaultValue={choice.description}
                  {...register(`questions.${i}.choices.${index}.description`)}
                  // onChange={(e) =>
                  //   handleChoiceDescriptionChange(
                  //     question.id,
                  //     choice.id,
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default UpdateQuizHero
