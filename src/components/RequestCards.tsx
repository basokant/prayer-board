
import RequestCard from "./RequestCard";

type RequestCardsProps = {
  data: {
    prayerRequests: {
        id: number;
        message: string;
        author: string;
        numPrayedFor: number;
        createdAt: Date;
    }[];
    _count: {
        prayerRequests: number;
    };
    slug: string;
    name: string;
    numMembers: number;
  } | null | undefined;
  sortBy: string | undefined;
  order: string | undefined;
  refetch: () => void;
}

const RequestCards = ({data, sortBy, order, refetch}: RequestCardsProps) => {
  return (
    <>
      {
        data && data.prayerRequests
        .sort((a,b) => {
          if (sortBy === "Number of Prayers") {
            if (order === "Descending") {
              return b.numPrayedFor - a.numPrayedFor;
            } else {
              return a.numPrayedFor - b.numPrayedFor;
            }
          } else {
            if (order === "Descending") {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
          }
        })
        .map((prayerRequest) => (
          <RequestCard 
            key={prayerRequest.id}
            id={prayerRequest.id}
            message={prayerRequest.message}
            author={prayerRequest.author}
            numPrayedFor={prayerRequest.numPrayedFor}
            date={prayerRequest.createdAt}
            refetch={refetch}
          />
        ))
      }
      {
        data && data.prayerRequests.length === 0 && (
          <span>No prayer requests yet.</span>
        )
      }
    </>
  );
}

export default RequestCards;