import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-lightCyan p-4 flex-col gap-2 lg:flex-row">
            <Link href="/">
                <div className="flex align-middle">
                    <img src="/logomark.svg" alt="PrayerBoard Logomark" className="h-15" draggable="false"/>
                    <img src="/logo.png" alt="PrayerBoard Logo" className="h-10 m-4" draggable="false"/>
                </div>
            </Link>
            <div className="flex gap-8 align-middle font-medium">
                <Link className="p-1.5" href="/">Home</Link>
                <Link className="rounded-full bg-ocean text-lightCyan p-1.5 px-5" href="/find-board">Visit</Link>
                <Link className="rounded-full bg-blue text-lightCyan p-1.5 px-5" href="/create">Create</Link>
            </div>
        </nav>
    )
}

export default Navbar;