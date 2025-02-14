import { useEffect, useReducer, useState } from "react"
import axios from "axios"
import { QUIZ_ENDPOINT } from "../API/Endpoints"
import { QuizData, ReducerQuizData } from "../data/Questions"
import { useParams } from "react-router"
import UpdateButton from "../components/Button/UpdateButton"
import LoadingSpinner from "../components/LoadingIcon"
import UpdateQuizHero from "../components/Hero/UpdateQuizHero"
import { changesReducer, QUIZ_NAME_CHANGE } from "../data/QuizReducers"

const initialState: ReducerQuizData = {
  id: 0,
  name: "",
  questions: [],
}

function UpdateQuiz() {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizUpdated, setQuizUpdated] = useState(false)
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [changes, dispatch] = useReducer(changesReducer, initialState)

  const handleNameChange = (id: number, value: string) => {
    dispatch({ type: QUIZ_NAME_CHANGE, payload: { id, name: value } })
  }

  useEffect(() => {
    console.log(changes)
  }, [changes])

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizData>(`${QUIZ_ENDPOINT}/${id}`)
        setQuizData(response.data)
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

  const updateData = async () => {
    try {
      const response = await axios.patch(`${QUIZ_ENDPOINT}/${id}`)
      console.log(response.status)
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
    <div className='grid gap-y-10'>
      <div>
        <div className='flex flex-col gap-y-3'>
          <span>Quiz Name</span>
          <hr className='w-120' />
          <input
            placeholder='Quiz Name'
            defaultValue={quizData?.name || ""}
            className='bg-white w-96 rounded-lg text-lg p-2'
            onChange={(e) => handleNameChange(quizData?.id!, e.target.value)}
          />
        </div>
      </div>
      <div className='grid grid-cols-3 max-h-[550px] overflow-auto'>
        <UpdateQuizHero
          questions={quizData?.questions || null}
          dispatch={dispatch}
        />
      </div>
      <div className='flex flex-col gap-5'>
        {quizUpdated && (
          <span className='text-center text-green-600'>
            Quiz successfully updated!
          </span>
        )}
        <UpdateButton onClickFunction={updateData}>Update</UpdateButton>
      </div>
      <div></div>
    </div>
  )
}

export default UpdateQuiz
