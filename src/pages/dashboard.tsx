import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { trpc } from "../utils/trpc";
import BoardCard from "../components/BoardCard";
import useDebounce from "../hooks/useDebounce";
import Layout from "../components/Layout";
import { Separator } from "@radix-ui/react-separator";

const Dashboard: NextPage = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const boards = trpc.prayerBoard.getAll.useQuery();

  let filteredBoards = boards.data?.filter((board) => {
    return debouncedSearchTerm && board.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  })

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex-1 flex align-center py-10 justify-around px-5 md:lg-40 lg:px-52 flex-col gap-7">

          <div className="outline outline-1 outline-gray-800 p-6 px-10 rounded-lg">
            <h2 className="text-xl md:text-2xl text-teal-600 font-semibold italic">Joined</h2>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
              {boards.data?.map((board) => 
                <BoardCard name={board.name} slug={board.slug} numRequests={board._count.prayerRequests} numMembers={0}/>
              )}
            </div>
          </div>
          <div className="outline outline-1 outline-gray-800 p-6 px-10 flex-1 rounded-lg">
            <h2 className="text-xl md:text-2xl text-cyan-600 font-semibold italic">Find a Board</h2>
            <div className="py-5">
              <input className="p-3 mb-3 px-4 w-[100%] rounded-md border-none bg-gray-800 active:outline-teal-500" id="search" name="search" type="text" 
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                {
                  filteredBoards && filteredBoards.length > 0 ?
                  filteredBoards.map((board) => 
                    <BoardCard name={board.name} slug={board.slug} numRequests={board._count.prayerRequests} numMembers={board.numMembers}/>
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

export default Dashboard;
