import Link from "next/link"

type BoardProps = {
  name: string;
  slug: string;
  numRequests: number;
  numMembers: number;
}

const BoardCard = ({ name, slug, numRequests, numMembers }: BoardProps) => {
  return (
    <Link href={`/board/${slug}`} className="outline outline-1 outline-gray-800 rounded-lg focus:outline-teal-600 hover:outline-teal-600 hover:text-teal-600 transition-all">
      <div className="p-6 py-7">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2 font-bold transition-colors">{name}</h2>
        <p className="text-gray-500">{numRequests} requests • {numMembers} members</p>
      </div>
    </Link>
  )
}

export default BoardCard