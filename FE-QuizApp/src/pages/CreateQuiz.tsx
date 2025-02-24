import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import SubmitButton from "../components/Button/SubmitButton"
import CreateQuizHero from "../components/Hero/CreateQuizHero"
import axios from "axios"
import { QUIZ_ENDPOINT } from "../API/Endpoints"

export interface CreateQuizQuestionField {
  description: string | undefined
  choices: (string | undefined)[]
  correctAnswer: string | undefined
}

export interface CreateQuizForm {
  "Quiz Name": string
  "Number of Questions": number
  questions: CreateQuizQuestionField[]
}

const createEmptyQuizQuestion = (): CreateQuizQuestionField => ({
  description: "",
  choices: new Array(4).fill(""),
  correctAnswer: "",
})

function CreateQuiz() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(0)
  const [quizCreated, setQuizCreated] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateQuizForm>()

  const quizName = watch("Quiz Name")
  const numberOfQuestionsValue = watch("Number of Questions")

  const onFormSubmit: SubmitHandler<CreateQuizForm> = (data) => {
    console.log(errors)
    console.log(data)

    axios
      .post(QUIZ_ENDPOINT, data)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setQuizCreated(true)
        }
      })
      .catch((err) => console.warn(err))
  }

  useEffect(() => {
    setNumberOfQuestions(numberOfQuestionsValue)
    // reset({
    //   "Quiz Name": quizName,
    //   "Number of Questions": numberOfQuestionsValue,
    //   questions: Array.from(
    //     { length: numberOfQuestionsValue },
    //     createEmptyQuizQuestion
    //   ),
    // })
  }, [numberOfQuestionsValue])

  return (
    <div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className='flex flex-col gap-y-5 text-lg md:text-3xl'
      >
        <div className='flex flex-col gap-y-3'>
          <span>Quiz Name</span>
          <input
            {...register("Quiz Name", { required: true })}
            placeholder={"Quiz Name"}
            className={`bg-white max-w-96 rounded-lg text-lg p-2 ${
              errors["Quiz Name"] ? "text-red-600" : "text-black"
            }`}
          ></input>
        </div>
        <div className='flex flex-col gap-y-3'>
          <span>Number of Questions</span>
          <input
            {...register("Number of Questions", {
              required: true,
              validate: {
                positive: (value: number) =>
                  value > 0 || "Value must be positive",
                maxValue: (value: number) =>
                  value <= 100 || "Value must be less than or equal to 100",
              },
            })}
            placeholder={`${numberOfQuestions}`}
            defaultValue={numberOfQuestions}
            className={`bg-white max-w-96 rounded-lg text-lg p-2 ${
              errors["Number of Questions"] ? "text-red-600" : "text-black"
            }`}
          ></input>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 max-h-[550px] overflow-auto'>
          <CreateQuizHero
            key={"Hero-Quizzes"}
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            numberOfQuestions={numberOfQuestions}
          />
        </div>
        <div className='flex flex-col gap-5'>
          {quizCreated && (
            <span className='text-center text-green-600'>
              Quiz successfully created!
            </span>
          )}
          <SubmitButton>Submit</SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default CreateQuiz
