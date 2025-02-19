import { useCallback, useEffect } from "react"
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"
import { CreateQuizForm } from "../../pages/CreateQuiz"
import { CreateQuizQuestionFieldTemplate } from "../../data/Questions"

interface ICreateQuizHero {
  register: UseFormRegister<CreateQuizForm>
  control: Control<CreateQuizForm, any>
  numberOfQuestions: number
  errors: FieldErrors<CreateQuizForm>
  setValue: UseFormSetValue<CreateQuizForm>
}

function CreateQuizHero({
  register,
  control,
  numberOfQuestions,
  errors,
  setValue,
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
  }, [numberOfQuestions, fields.length, append, remove])

  const handleDescriptionChange = (
    questionIndex: number,
    description: string
  ) => {
    const selectedQuestion = fields[questionIndex]
    update(questionIndex, {
      ...selectedQuestion,
      description: description,
    })
  }

  const handleRadioChange = (questionIndex: number, selectedChoice: string) => {
    const selectedQuestion = fields[questionIndex]

    update(questionIndex, {
      ...selectedQuestion,
      correctAnswer: selectedChoice,
    })
  }

  return (
    <>
      {fields.map((field, i) => (
        <div
          className='bg-white flex flex-col m-2 rounded-2xl p-4 text-center'
          key={field.id}
        >
          <div key={i}>
            <span>Question {i + 1}</span>
            <input
              type='text'
              className={`ring-1 rounded-2xl my-3 p-2 text-center ${
                errors?.questions?.[i]?.description
                  ? "text-red-600"
                  : "text-black"
              }`}
              {...register(`questions.${i}.description`, { required: true })}
              onBlur={(e) => {
                handleDescriptionChange(i, e.target.value)
              }}
              placeholder={`Enter question ${i + 1}`}
            />
            <div className='grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-2'>
              {field.choices?.map((choice, index) => (
                <div className='grid grid-cols-1 gap-2' key={index}>
                  <input
                    type='radio'
                    value={choice || undefined}
                    {...register(`questions.${i}.correctAnswer`, {
                      required: true,
                    })}
                    onChange={(e) => handleRadioChange(i, choice || "")}
                    checked={field.correctAnswer === choice}
                  />
                  <input
                    className={`ring-1 rounded-2xl text-center ${
                      errors?.questions?.[i]?.choices?.[index]
                        ? "text-red-600"
                        : "text-black"
                    }`}
                    type='text'
                    placeholder={`Choice ${index + 1}`}
                    {...register(`questions.${i}.choices.${index}`, {
                      required: true,
                    })}
                    onChange={(e) =>
                      setValue(
                        `questions.${i}.choices.${index}`,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CreateQuizHero
