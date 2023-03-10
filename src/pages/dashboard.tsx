import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from 'usehooks-ts';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import BoardCard from "../components/BoardCard";
import useDebounce from "../hooks/useDebounce";
import Layout from "../components/Layout";

import { trpc } from "../utils/trpc";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";
import { createContextInner } from "../server/trpc/context";
import superjson from 'superjson';

const Dashboard: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const boards = trpc.prayerBoard.getAll.useQuery();

  const [joinedBoardSlugs, setJoinedBoardSlugs] = useLocalStorage("joinedBoards", JSON.stringify({}));

  let filteredBoards = debouncedSearchTerm != "" ? boards.data?.filter((board) => {
    return debouncedSearchTerm && board.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  }) : boards.data?.slice(0, 10);

  filteredBoards = filteredBoards?.sort((a,b) => {
    return b.numVisits + b._count.prayerRequests - a.numVisits - a._count.prayerRequests;
  })

  console.log(joinedBoardSlugs);

  const joinedBoards = boards.data?.filter((board) => {
    return board.slug in JSON.parse(joinedBoardSlugs);
  })

  return (
    <>
      <Head>
        <title>Dashboard | PrayerBoard</title>
        <meta name="description" content="Visit your PrayerBoards, and find new ones too!" />
        <meta name="og:title" content={`Dashboard | PrayerBoard`} />
        <meta name="og:description" content={`Visit your PrayerBoards, and find new ones too!`} />
        <meta name="og:image" content="https://prayerboard.app/ogimage.png" />
        <meta name="og:url" content={`https://prayerboard.app/dashboard`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@BAsokanthan" />
        <meta name="twitter:title" content={`Dashboard | PrayerBoard`} />
        <meta name="twitter:description" content={`Visit your PrayerBoards, and find new ones too!`} />
        <meta name="twitter:image" content="https://prayerboard.app/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex-1 flex align-center py-10 justify-around px-5 md:lg-40 lg:px-52 flex-col gap-7">

          <div className="lg:border-[1px] border-gray-800 p-3 md:p-6 lg:px-10 rounded-lg">
            <h2 className="text-xl md:text-2xl text-teal-600 font-semibold italic">Joined</h2>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
              {joinedBoards?.map((board) => 
                <BoardCard key={board.slug} name={board.name} slug={board.slug} numRequests={board._count.prayerRequests} numVisits={board.numVisits}/>
              )}
            </div>
          </div>
          <div className="lg:border-[1px] border-gray-800 p-3 md:p-6 lg:px-10 flex-1 rounded-lg">
            <h2 className="text-xl md:text-2xl text-cyan-600 font-semibold italic">Find a Board</h2>
            <div className="py-5">
              <input className="p-3 mb-3 px-4 w-[100%] rounded-md bg-gray-800 focus:border-[1px] focus:border-teal-500 focus:outline-none" id="search" name="search" type="text" 
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                {
                  filteredBoards && filteredBoards.length > 0 ?
                  filteredBoards.map((board) => 
                    <BoardCard key={board.slug} name={board.name} slug={board.slug} numRequests={board._count.prayerRequests} numVisits={board.numVisits}/>
                  ) : <p className="text-gray-500">No boards found</p>
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  await ssg.prayerBoard.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60
  }
}

export default Dashboard;
