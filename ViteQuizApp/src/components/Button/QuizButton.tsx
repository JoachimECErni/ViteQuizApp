import React, { ReactNode } from "react"
import { NavLink } from "react-router"

interface IQuizButton {
  children: ReactNode
  clickFunc: Function
}

function QuizButton({ children, clickFunc }: IQuizButton) {
  return (
    <button
      className='bg-[#FFB22C] hover:bg-[#ffb22ccd] text-[#854836] font-bold 
      py-4 border-b-4 border-[#854836] hover:border-[#8548368d] rounded m-5'
      onClick={() => clickFunc()}
    >
      {children}
    </button>
  )
}

export default QuizButton
