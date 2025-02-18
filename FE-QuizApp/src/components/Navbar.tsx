import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { VscThreeBars } from "react-icons/vsc"
import { NavLink, useLocation } from "react-router"
import { motion } from "framer-motion"

function Navbar() {
  const slugs = [
    {
      link: "/",
      text: "Home",
    },
    {
      link: "/create-quiz",
      text: "Create Quiz",
    },
    {
      link: "/update-quiz",
      text: "Update Quiz",
    },
    {
      link: "/delete-quiz",
      text: "Delete Quiz",
    },
    {
      link: "/quiz",
      text: "Take Quiz",
    },
  ]

  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navList = (offset: string) => {
    return slugs.map((slug, index) => (
      <NavLink to={`${slug.link}`} key={slug.link + offset + index}>
        {slug.text}
      </NavLink>
    ))
  }

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div className='container mx-auto justify-between items-center p-5 text-sm md:text-2xl text-center hidden md:flex'>
        {navList("1")}
      </div>
      <AnimatePresence>
        <div className='container mx-auto justify-center pt-3 text-center text-2xl flex md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <VscThreeBars />
          </button>
        </div>
        {isOpen && (
          <motion.div
            key={isOpen + "1"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='container flex flex-col mx-auto text-center md:hidden gap-y-5 text-lg overflow-hidden'
          >
            {navList("2")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
