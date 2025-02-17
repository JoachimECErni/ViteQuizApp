import { ReactNode } from "react"
import { NavLink } from "react-router"

interface IPrimaryButton {
  to: string
  children: ReactNode
}

function PrimaryButton({ to, children }: IPrimaryButton) {
  return (
    <NavLink to={to}>
      <button className='md:text-2xl bg-[#FFB22C] hover:bg-[#ffb22ccd] text-[#854836] font-bold py-2 px-4 border-b-4 border-[#854836] hover:border-[#8548368d] rounded-2xl'>
        {children}
      </button>
    </NavLink>
  )
}

export default PrimaryButton
