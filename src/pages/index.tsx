import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Navbar from "../components/Navbar";
import PrayingPerson from "../components/PrayingPerson";
import AllStats from "../components/AllStats";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>PrayerBoard</title>
        <meta name="description" content="Everyone needs prayer. Create a community of prayer. Create a PrayerBoard." />
        <meta name="og:title" content={`PrayerBoard`} />
        <meta name="og:description" content={`Everyone needs prayer. Create a community of prayer. Create a PrayerBoard.`} />
        <meta name="og:image" content="https://prayerboard.app/ogimage.png" />
        <meta name="og:url" content={`https://prayerboard.app`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex flex-1 items-center p-10 lg:px-20 justify-around flex-col-reverse lg:flex-row">
          <div>
            <PrayingPerson />
          </div>
          <div className="flex flex-col justify-center gap-7 lg:max-w-xxl text-right pb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-300">Everyone needs <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-500">prayer</span></h1>
            <p className="text-xl md:text-2xl">Create a community of prayer.<br/>Create a <span className="font-bold">PrayerBoard</span>.</p>
            <div className="flex justify-end gap-7 font-medium text-lg flex-col sm:flex-row">
              <Link className="rounded-full hover:bg-teal-700 bg-teal-800 text-cyan-50 p-1.5 px-5 text-center transition-colors" href="/dashboard">Visit Board</Link>
              <Link className="rounded-full hover:bg-cyan-700 bg-cyan-800 text-cyan-50 p-1.5 px-5 text-center transition-colors" href="/create">Create Board</Link>
            </div>
            <AllStats />
          </div>
          
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Home;
