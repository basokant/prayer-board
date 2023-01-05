import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex items-center justify-between flex-wrap py-2 lg:px-20 px-2 flex-col gap-2 lg:flex-row outline outline-1 outline-gray-800 bg-gray-900 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <Link href="/">
        <div className="flex items-center justify-center">
          <img src="/logomark.svg" alt="PrayerBoard Logomark" className="h-10 md:h-14" draggable="false"/>
          <img src="/logo.png" alt="PrayerBoard Logo" className="h-9 md:h-10 m-2 md:m-4" draggable="false"/>
        </div>
      </Link>
      <div className="text-md sm:text-lg flex gap-5 sm:gap-10 items-center text-gray-300">
        <Link className="p-1" href="/">Home</Link>
        <Link className="transition-colors hover:text-teal-400" href="/dashboard">Visit</Link>
        <Link className="transition-colors hover:text-cyan-400" href="/create">Create</Link>
      </div>
    </nav>
  )
}

export default Navbar;