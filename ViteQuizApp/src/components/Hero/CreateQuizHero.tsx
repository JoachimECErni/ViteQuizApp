import { useCallback, useEffect } from "react"
import { Control, useFieldArray, UseFormRegister } from "react-hook-form"
import { CreateQuizForm } from "../../pages/CreateQuiz"
import { CreateQuizQuestionFieldTemplate } from "../../data/Questions"

interface ICreateQuizHero {
  register: UseFormRegister<CreateQuizForm>
  control: Control<CreateQuizForm, any>
  numberOfQuestions: number
}

function CreateQuizHero({
  register,
  control,
  numberOfQuestions,
}: ICreateQuizHero) {
  if (numberOfQuestions === undefined) return <></>

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
  })

  useEffect(() => {
    if (fields.length < numberOfQuestions) {
      for (let i = fields.length; i < numberOfQuestions; i++) {
        append({ ...CreateQuizQuestionFieldTemplate })
      }
    } else if (fields.length > numberOfQuestions) {
      for (let i = fields.length; i > numberOfQuestions; i--) {
        remove(i - 1)
      }
    }
  }, [numberOfQuestions, append, remove, fields.length])

  const handleRadioChange = useCallback(
    (questionIndex: number, selectedChoice: string) => {
      const currentQuestion = fields[questionIndex]

      update(questionIndex, {
        ...currentQuestion,
        correctAnswer: selectedChoice,
      })
    },
    [fields, update]
  )

  const handleDescriptionChange = (questionIndex: number, value: string) => {
    const currentQuestion = fields[questionIndex]

    update(questionIndex, {
      ...currentQuestion,
      description: value,
    })
  }

  const handleChoiceChange = useCallback(
    (questionIndex: number, choiceIndex: number, value: string) => {
      const currentQuestion = fields[questionIndex]

      // Update the specific choice
      const updatedChoices = [...currentQuestion.choices]

      updatedChoices[choiceIndex] = value || ""

      update(questionIndex, {
        ...currentQuestion,
        choices: updatedChoices,
      })
    },
    [numberOfQuestions]
  )

  const choiceList = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]

  return (
    <>
      {fields.map((field, i) => (
        <div
          className='bg-white flex flex-col m-2 rounded-2xl p-4 text-center'
          key={field.id}
        >
          <span>Question {i + 1}</span>
          <input
            type='text'
            className='ring-1 rounded-2xl my-3 p-2 text-center'
            {...register(`questions.${i}.description`, { required: true })}
            placeholder={`Enter question ${i + 1}`}
            onBlur={(e) => handleDescriptionChange(i, e.target.value)}
          />
          <div className='grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-2'>
            {choiceList.map((choice, index) => (
              <div className='grid grid-cols-1 gap-2' key={index}>
                <input
                  type='radio'
                  value={field.choices?.[index] || ""}
                  {...register(`questions.${i}.correctAnswer`, {
                    required: true,
                  })}
                  onChange={() =>
                    handleRadioChange(i, field.choices?.[index] || "")
                  }
                />
                <input
                  className='ring-1 rounded-2xl text-center'
                  type='text'
                  placeholder={choice}
                  {...register(`questions.${i}.choices.${index}`, {
                    required: true,
                  })}
                  onBlur={(e) => handleChoiceChange(i, index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default CreateQuizHero
