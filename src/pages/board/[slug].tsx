import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import PrayingPerson from "../../components/PrayingPerson";
import AllStats from "../../components/AllStats";
import Footer from "../../components/Footer";

const Board: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-lightCyan font-Poppins lg:px-20 px-2 text-darkblue">
        <Navbar />
        <div className="flex align-center py-10 justify-around p-10 flex-col-reverse lg:flex-row">
          <div className="z-0">
            <PrayingPerson />
          </div>
          <div className="flex flex-col justify-center gap-7 max-w-xl text-right pb-12 z-100">
            <h1 className="text-6xl font-bold ">Everyone needs <span className="text-blue">prayer</span></h1>
            <p className="text-2xl">Create a community of prayer.<br/>Create a <span className="font-bold">PrayerBoard</span>.</p>
            <div className="flex justify-end gap-7 font-medium text-lg flex-col sm:flex-row">
              <Link className="rounded-full bg-ocean text-lightCyan p-1.5 px-5 text-center" href="/find-board">Visit Board</Link>
              <Link className="rounded-full bg-blue text-lightCyan p-1.5 px-5 text-center" href="/create">Create Board</Link>
            </div>
            <AllStats />
          </div>
          
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Board;