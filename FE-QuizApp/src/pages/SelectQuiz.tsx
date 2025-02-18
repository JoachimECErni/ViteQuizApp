import { useEffect, useState } from "react"
import { QUIZ_ENDPOINT } from "../API/Endpoints"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import LoadingSpinner from "../components/LoadingIcon"
import { IQuizItem } from "../data/Questions"
import SelectQuizItem from "../components/SelectQuizItem"
import { useNavigate } from "react-router"

function SelectQuiz() {
  const [quizList, setQuizList] = useState<IQuizItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchAllQuiz() {
      const response = await axios.get<IQuizItem[]>(QUIZ_ENDPOINT)
      setQuizList(response.data)
    }

    fetchAllQuiz()
    setLoading(false)
  }, [])

  const navigate = useNavigate()

  let handleLink = (id: string) => {
    navigate(`/quiz/${id}`)
  }

  if (loading == null) return <LoadingSpinner />
  if (quizList == null) return <LoadingSpinner />

  return (
    <div className='text-center flex flex-col gap-10'>
      <span>Select a Quiz!</span>
      <div
        className={`${
          quizList.length > 0 ? "grid grid-cols-2 md:grid-cols-4" : ""
        } mt-5 gap-10`}
      >
        <AnimatePresence mode='sync'>
          {quizList.length > 0 ? (
            quizList.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <SelectQuizItem
                  quiz={quiz}
                  handleLink={handleLink}
                  key={index}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              key='no-quizzes'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className=''
            >
              <span className='text-3xl text-red-500'>
                You have no Quizzes!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SelectQuiz
