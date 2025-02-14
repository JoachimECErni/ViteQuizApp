import { NavLink } from "react-router"

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
  return (
    <div className='flex text-xl gap-20 my-10 mx-10 '>
      {slugs.map((slug) => (
        <NavLink to={`${slug.link}`} key={slug.text}>
          {slug.text}
        </NavLink>
      ))}
    </div>
  )
}

export default Navbar
