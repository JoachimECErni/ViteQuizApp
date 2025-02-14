import { useState } from "react"
import { FaDeleteLeft } from "react-icons/fa6"
import { motion } from "framer-motion"
import { IDeleteQuizItem } from "../pages/DeleteQuiz"

function DeleteQuizItem({
  quiz,
  handleDelete,
}: {
  quiz: IDeleteQuizItem
  handleDelete: Function
}) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.button
      className='relative w-full bg-red-200 p-4 rounded-full flex justify-center items-center hover:cursor-pointer'
      onClick={() => handleDelete(quiz.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        initial={{ x: 0 }}
        animate={{ x: isHovered ? -10 : 0 }} // Move text left when hovered
        transition={{ duration: 0.3, ease: "easeInOut" }} // Added easing for smoothness
      >
        {quiz.name}
      </motion.span>
      <motion.div
        initial={{ opacity: 0, x: 10 }} // Start off-screen to the right
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }} // Fade in and slide in
        transition={{ duration: 0.3, ease: "easeInOut" }} // Added easing for smoothness
        className='absolute right-4' // Position the icon absolutely
      >
        <FaDeleteLeft className='text-red-500' />
      </motion.div>
    </motion.button>
  )
}

export default DeleteQuizItem
