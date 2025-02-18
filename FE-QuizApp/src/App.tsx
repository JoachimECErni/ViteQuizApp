import "./App.css"
import { Route, Routes, useLocation } from "react-router"
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"
import Navbar from "./components/Navbar"
import CreateQuiz from "./pages/CreateQuiz"
import SelectQuiz from "./pages/SelectQuiz"
import DeleteQuiz from "./pages/DeleteQuiz"

import { AnimatePresence, motion } from "framer-motion"
import { useRef } from "react"
import SelectUpdateQuiz from "./pages/SelectUpdateQuiz"
import UpdateQuiz from "./pages/UpdateQuiz"
import TestPage from "./test"

function App() {
  const location = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <main className='font-mono text-3xl md:text-2xl font-semibold text-[#000000] flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow container mx-auto p-4'>
        <AnimatePresence mode='popLayout'>
          <motion.div
            className=''
            key={location.pathname}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "h-full", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
          >
            <motion.div
              className='bg-[#e0e0e0] p-10 rounded-2xl shadow-lg '
              ref={contentRef}
              initial={{ scaleY: 0.95 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0.95, transition: { duration: 0.3 } }}
            >
              <Routes location={location}>
                <Route path='/' element={<Home />} />
                <Route path='/quiz' element={<SelectQuiz />} />
                <Route path='/quiz/:id' element={<Quiz />} />
                <Route path='/create-quiz' element={<CreateQuiz />} />
                <Route path='/delete-quiz' element={<DeleteQuiz />} />
                <Route path='/update-quiz' element={<SelectUpdateQuiz />} />
                <Route path='/update-quiz/:id' element={<UpdateQuiz />} />
                <Route path='/testing' element={<TestPage />} />
              </Routes>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App
