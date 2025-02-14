import { QuizData, QuizQuestion } from "../../data/Questions"
import { CHOICE_CHANGE, QUESTION_CHANGE } from "../../data/QuizReducers"

interface IUpdateQuizHero {
  questions: QuizQuestion[] | null
  dispatch: Function
}

function UpdateQuizHero({ questions, dispatch }: IUpdateQuizHero) {
  if (!questions) return <></>

  const choiceList = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]

  const handleDescriptionChange = (id: number, description: string) => {
    // Dispatch an action to change the question description
    dispatch({
      type: QUESTION_CHANGE,
      payload: { id, description },
    })
  }

  const handleCorrectChoiceIDChange = (id: number, correctChoiceID: number) => {
    dispatch({
      type: QUESTION_CHANGE,
      payload: { id, correctChoiceID },
    })
  }

  const handleChoiceDescriptionChange = (
    questionId: number,
    choiceId: number,
    description: string
  ) => {
    dispatch({
      type: CHOICE_CHANGE,
      payload: { questionId, choiceId, description },
    })
  }

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
            onChange={(e) =>
              handleDescriptionChange(question.id, e.target.value)
            }
          />
          <div className='grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-2'>
            {question.choices.map((choice, index) => (
              <div className='grid grid-cols-1 gap-2' key={index}>
                <input
                  type='radio'
                  defaultChecked={choice.id === question.correctChoiceID}
                  value={choice.id}
                  name={`question${question.id}`}
                  onChange={() =>
                    handleCorrectChoiceIDChange(question.id, choice.id)
                  }
                  // onChange={() =>
                  //   handleRadioChange(i, field.choices?.[index] || "")
                  // }
                />
                <input
                  className='ring-1 rounded-2xl text-center'
                  type='text'
                  placeholder={choiceList[index]}
                  defaultValue={choice.description}
                  onChange={(e) =>
                    handleChoiceDescriptionChange(
                      question.id,
                      choice.id,
                      e.target.value
                    )
                  }
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
