import Link from "next/link"

const Navbar = () => {
  return (
	<nav className="flex w-full items-center justify-center p-5">
    <div className="flex w-80 container justify-between gap-3 mx-auto rounded-4xl bg-gray-600 py-1 px-5">
      <Link href={'/about'}>About</Link>
      <Link href={'/'}>Home</Link>
      <Link href={'/contact'}>Contact</Link>
    </div>
  </nav>
  )
}

export default Navbar