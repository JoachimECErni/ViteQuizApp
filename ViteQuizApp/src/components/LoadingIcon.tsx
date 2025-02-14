import React from "react"
import { motion } from "framer-motion"

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center'>
      <motion.div
        className='w-30 h-30 border-4 border-t-4 border-white border-t-blue-500 rounded-full'
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  )
}

export default LoadingSpinner
