import { motion, AnimatePresence } from "framer-motion"
import { QuizChoice, QuizData, shuffleQuiz } from "../data/Questions"
import { ReactNode, useCallback, useEffect, useState } from "react"
import QuizSummaryCard from "../components/Card/QuizSummary"
import QuizHero from "../components/Hero/QuizHero"
import QuizStepper from "../components/QuizStepper"
import { useParams } from "react-router"
import axios from "axios"
import { QUIZ_ENDPOINT } from "../API/Endpoints"
import LoadingSpinner from "../components/LoadingIcon"

export interface QuizState {
  index: number
  question: string
  actual: QuizChoice
  expected: QuizChoice
}

function Quiz() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizData, setQuizData] = useState<QuizData | null>(null)

  const [questionIndex, setQuestionIndex] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [userAnswers, setUserAnswers] = useState<QuizState[]>([])
  const [renderComponent, setRenderComponent] = useState<ReactNode>(null)

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizData>(`${QUIZ_ENDPOINT}/${id}`)
        const temp_q = response.data
        temp_q.questions = shuffleQuiz(temp_q.questions)
        setQuizData(temp_q)
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

  const handleClickedAnswer = useCallback(
    ({ index, question, actual, expected }: QuizState) => {
      setUserAnswers((prevList) => [
        ...prevList,
        { index, question, actual, expected },
      ])
      setQuestionIndex((index) => index + 1)
    },
    []
  )

  useEffect(() => {
    // if (questionIndex < quizQuestions.length) {

    if (loading) return
    if (!quizData) return

    if (userAnswers.length < quizData?.questions.length) {
      let { description, choices, correctChoiceID, id } =
        quizData?.questions[questionIndex]
      let questionData = {
        questionIndex,
        description,
        choices,
        id,
        correctChoiceID,
      }

      setRenderComponent(
        <QuizHero
          Question={questionData}
          handleClickedAnswer={handleClickedAnswer}
        />
      )
    } else {
      setQuizFinished(true)
      setRenderComponent(
        <div>
          <QuizSummaryCard data={userAnswers} />
        </div>
      )
    }
  }, [userAnswers, quizData])

  if (loading) return <LoadingSpinner />

  if (quizData == null) return <LoadingSpinner />

  return (
    <div className=''>
      <div>
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            layout
            className=''
          >
            {renderComponent}
          </motion.div>
          <div>
            {!quizFinished ? (
              <QuizStepper
                userAnswers={userAnswers}
                quizLength={quizData?.questions.length ?? 0}
              />
            ) : (
              <></>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Quiz
