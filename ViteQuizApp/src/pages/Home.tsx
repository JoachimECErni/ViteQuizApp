import PrimaryButton from "../components/Button/PrimaryButton"

function Home() {
  return (
    <div className='flex flex-col gap-y-10'>
      <div className='text-center'>
        <h3 className='text-4xl md:text-3xl mb-3'>Welcome to</h3>
        <h1 className='text-[60px] md:text-[50px] text-[#FFB22C] drop-shadow-md shadow-black'>
          Quizzy
        </h1>
      </div>
      <p className='text-center text-3xl md:text-2xl'>
        Create or Take a quiz of your liking!
      </p>
      <div className='flex justify-evenly text-center flex-col md:flex-row gap-y-5'>
        <PrimaryButton to={"/create-quiz"}>Create quiz</PrimaryButton>
        <PrimaryButton to={"/quiz"}>Take Quiz</PrimaryButton>
      </div>
    </div>
  )
}

export default Home
