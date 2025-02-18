import { useState } from "react"
import { FaDeleteLeft } from "react-icons/fa6"
import { motion } from "framer-motion"
import { IQuizItem } from "../data/Questions"

function SelectQuizItem({
  quiz,
  handleLink,
}: {
  quiz: IQuizItem
  handleLink: Function
}) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.button
      className='text-sm md:text-2xl rounded-4xl relative w-full bg-blue-200 p-5 flex justify-center items-center hover:cursor-pointer'
      onClick={() => handleLink(quiz.id)}
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
        <FaDeleteLeft className='text-blue-500' />
      </motion.div>
    </motion.button>
  )
}

export default SelectQuizItem
