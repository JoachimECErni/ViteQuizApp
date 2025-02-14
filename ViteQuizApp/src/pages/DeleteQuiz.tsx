import { useCallback, useEffect, useState } from "react"
import { QUIZ_ENDPOINT } from "../API/Endpoints"
import axios from "axios"
import DeleteQuizItem from "../components/DeleteQuizItem"
import { AnimatePresence, motion } from "framer-motion"
import LoadingSpinner from "../components/LoadingIcon"

export interface IDeleteQuizItem {
  id: number
  name: string
}

function DeleteQuiz() {
  const [quizList, setQuizList] = useState<IDeleteQuizItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchAllQuiz() {
      const response = await axios.get<IDeleteQuizItem[]>(QUIZ_ENDPOINT)
      setQuizList(response.data)
      setLoading(false)
    }

    fetchAllQuiz()
  }, [])

  const handleDeleteQuiz = useCallback(
    async (id: number) => {
      if (quizList) {
        const response = await axios.delete(`${QUIZ_ENDPOINT}/${id}`)

        if (response.status >= 200 && response.status < 300) {
          const filteredList = quizList.filter((quiz) => quiz.id !== id)
          setQuizList(filteredList)
        }
      }
    },
    [quizList]
  )

  if (loading) return <LoadingSpinner />
  if (quizList == null) return <div>Loading...</div>

  return (
    <div className='text-center flex flex-col gap-10'>
      <span>Delete a Quiz!</span>
      <div
        className={`${
          quizList.length > 0 ? "grid grid-cols-4" : ""
        } mt-5 gap-10`}
      >
        <AnimatePresence mode='sync'>
          {quizList.length > 0 ? (
            quizList.map((quiz) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <DeleteQuizItem quiz={quiz} handleDelete={handleDeleteQuiz} />
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

export default DeleteQuiz
