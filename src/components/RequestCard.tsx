import Link from "next/link"
import { useState } from "react";

import LogoMark from "../../public/logomark.svg"

import ReactTimeAgo from 'react-time-ago';

import { trpc } from "../utils/trpc";

type RequestProps = {
  id: number;
  message: string;
  author: string;
  numPrayedFor: number;
  date: Date;
  refetch: () => void;
}

const RequestCard = ({ id, message, author, numPrayedFor, date, refetch }: RequestProps) => {

  const prayForRequest = trpc.prayerRequest.updateNumPrayerFor.useMutation({
    onSuccess: () => refetch()
  });
  const [prayedFor, setPrayedFor] = useState<boolean>(false);

  return (
    <div className="flex flex-col p-7 outline-gray-800 outline outline-1 rounded-xl">
      <p className="flex-1 pb-3">{message}</p>
      <div className="flex items-center">
        <div className="flex-1">
          <span className="font-semibold text-cyan-600">~ {author}</span> • <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
        </div>
        <button
          className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 disabled:bg-teal-900 disabled:cursor-not-allowed p-1 px-3 text-slate-50 font-semibold rounded-lg transition-colors"
          onClick={() => {
            if (!prayedFor) {
              prayForRequest.mutate({ id });
              setPrayedFor(true);
            }
          }}
          disabled={prayedFor}
        >
          <svg className="h-5 stroke-slate-50" height="53" viewBox="0 0 46 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.445 39.5971C23.0274 38.0614 19.4834 34.99 16.0576 34.99C13.9313 34.99 11.2142 35.935 10.3873 38.0614C9.56044 40.1877 10.3873 42.6685 16.0576 42.6685C22.3186 42.6685 21.3735 36.6438 21.3735 34.99C21.3735 33.3361 19.0109 28.4927 13.1043 28.4927C7.19778 28.4927 2 31.9185 2 39.5971C2 47.2756 10.7417 50.7014 16.0576 50.7014C21.3735 50.7014 33.3048 47.2756 40.7471 33.4543C46.7009 22.3972 40.5502 25.5394 36.7306 28.4927L32.0054 31.5642C34.053 28.6502 38.4081 21.523 39.4476 16.3252C39.7233 13.8838 39.3059 10.1351 35.4312 14.6714C30.5878 20.3417 32.2416 19.1604 28.3433 23.295C25.9831 25.7982 22.8147 27.0043 25.2719 21.9955C27.729 16.9867 28.7371 15.0258 28.9339 14.6714C30.7059 11.7181 33.5174 5.59888 30.5878 4.74834C27.6581 3.89779 22.358 12.8206 20.0741 17.3884C18.4202 20.3417 15.4433 24.4763 16.7664 17.3884C18.0895 10.3005 18.5778 6.79595 18.6565 5.92965C18.3415 3.44889 16.7901 0.188469 13.1043 6.99284C9.41864 13.7972 8.3397 19.8298 8.26095 21.9955" stroke-width="3.87074" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {numPrayedFor}
        </button>
      </div>
    </div>
  )
}

export default RequestCard