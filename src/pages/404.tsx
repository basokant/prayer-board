import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

const Custom404: NextPage = () => {

  return (
    <>
      <Head>
        <title>404 Page | PrayerBoard</title>
        <meta name="description" content="404" />
        <meta name="og:title" content={`404 | PrayerBoard`} />
        <meta name="og:description" content={`404`} />
        <meta name="og:image" content="https://prayerboard.app/ogimage.png" />
        <meta name="og:url" content={`https://prayerboard.app/404`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex flex-col item-center justify-center flex-1 p-10 lg:px-20">
          <h1 className="text-5xl md:text-6xl font-bold text-teal-600">404 Error</h1>
          <h3 className="text-xl">Praying that you find what you&apos;re looking for! 🙏</h3>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Custom404;