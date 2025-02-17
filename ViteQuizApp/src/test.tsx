import React from "react"

function TestPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Navigation Bar */}
      <nav className='bg-blue-600 p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='text-white text-lg font-bold'>My App</div>
          <div className='hidden md:flex space-x-4'>
            <a href='#' className='text-white hover:underline'>
              Home
            </a>
            <a href='#' className='text-white hover:underline'>
              About
            </a>
            <a href='#' className='text-white hover:underline'>
              Services
            </a>
            <a href='#' className='text-white hover:underline'>
              Contact
            </a>
          </div>
          <div className='md:hidden'>
            <button className='text-white focus:outline-none'>
              {/* Hamburger Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='flex-grow container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>
          Welcome to My Responsive App
        </h1>
        <p className='mb-4'>
          This is a simple template using React and Tailwind CSS.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='bg-gray-200 p-4 rounded shadow'>Card 1</div>
          <div className='bg-gray-200 p-4 rounded shadow'>Card 2</div>
          <div className='bg-gray-200 p-4 rounded shadow'>Card 3</div>
          <div className='bg-gray-200 p-4 rounded shadow'>Card 4</div>
          <div className='bg-gray-200 p-4 rounded shadow'>Card 5</div>
          <div className='bg-gray-200 p-4 rounded shadow'>Card 6</div>
        </div>
      </main>
    </div>
  )
}

export default TestPage
