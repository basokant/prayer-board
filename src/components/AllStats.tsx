import { trpc } from "../utils/trpc";

const AllStats = () => {
  const { data } = trpc.prayerBoard.getStats.useQuery();

  if (!data) return (<div>Loading...</div>)

  console.log(data)
  return (
    <div >
      PB: {data[0]._count.id} | PR: {data[1]._count.id} | PF: {data[1]._sum.numPrayedFor ?? 0}
    </div>
  )
}

export default AllStats