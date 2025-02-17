import { useEffect, useState } from "react"
import axios from "axios"
import { QUIZ_ENDPOINT } from "../API/Endpoints"
import { QuizData } from "../data/Questions"
import { useParams } from "react-router"
import UpdateButton from "../components/Button/UpdateButton"
import LoadingSpinner from "../components/LoadingIcon"
import UpdateQuizHero from "../components/Hero/UpdateQuizHero"
import { useForm } from "react-hook-form"

function UpdateQuiz() {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizUpdated, setQuizUpdated] = useState(false)
  const [quizData, setQuizData] = useState<QuizData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuizData>()

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizData>(`${QUIZ_ENDPOINT}/${id}`)
        setQuizData(response.data)
        reset(response.data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message)
        } else {
          setError("An unexpected error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchQuizData()
  }, [id])

  const updateData = async (data: QuizData) => {
    try {
      const response = await axios.patch(`${QUIZ_ENDPOINT}/${id}`, data)
      if (response.status >= 200 && response.status < 300) {
        setQuizUpdated(true)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className=''>
      <form onSubmit={handleSubmit(updateData)} className='grid gap-y-10'>
        <div className='flex flex-col gap-y-3'>
          <span>Quiz Name</span>
          <hr className='w-120' />
          <input
            type='text'
            placeholder='Quiz Name'
            {...register(`name`)}
            className='bg-white w-96 rounded-lg text-lg p-2'
          />
        </div>
        <div className='grid grid-cols-3 max-h-[550px] overflow-auto'>
          <UpdateQuizHero
            questions={quizData?.questions || null}
            register={register}
          />
        </div>
        <div className='flex flex-col gap-5'>
          {quizUpdated && (
            <span className='text-center text-green-600'>
              Quiz successfully updated!
            </span>
          )}
          <UpdateButton>Update</UpdateButton>
        </div>
      </form>
    </div>
  )
}

export default UpdateQuiz
