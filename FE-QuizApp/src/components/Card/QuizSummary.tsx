import { QuizState } from "../../pages/Quiz"
import PrimaryButton from "../Button/PrimaryButton"

function QuizSummary({ data }: { data: QuizState[] }) {
  if (data == null) return <></>

  return (
    <div className='text-black p-5 rounded-2xl flex flex-col gap-y-3 text-lg md:text-3xl'>
      {data.map((d, index) => {
        const isCorrect =
          d.actual?.id === d.expected?.id
            ? "border-green-500"
            : "border-red-500"
        return (
          <div key={`${index}`}>
            <div
              className={`flex rounded-4xl shadow-2xl ring-1 border-x-8 ${isCorrect}`}
            >
              <span className=' flex w-20 items-center justify-center border-r'>
                {d.index + 1}
              </span>
              <div className='container flex flex-col px-5 gap-y-2'>
                <span className=''>{d.question}</span>
                <span className='underline'>{d.actual.description}</span>
                {/* <span className='flex-none w-32'>{d.expected}</span> */}
              </div>
            </div>
          </div>
        )
      })}
      <div className='flex mt-10 justify-center gap-x-10'>
        <PrimaryButton to='/'>Go Back Home</PrimaryButton>
        <PrimaryButton to='/quiz'>Take Another Quiz</PrimaryButton>
      </div>
    </div>
  )
}

export default QuizSummary
