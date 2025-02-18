import { ReactNode } from "react"

interface IUpdateButton {
  children: ReactNode
}

function UpdateButton({ children }: IUpdateButton) {
  return (
    <button
      className='bg-[#FFB22C] hover:bg-[#ffb22ccd] text-[#854836] font-bold py-2 px-4 border-b-4 border-[#854836] hover:border-[#8548368d] rounded-2xl'
      type='submit'
    >
      {children}
    </button>
  )
}

export default UpdateButton
