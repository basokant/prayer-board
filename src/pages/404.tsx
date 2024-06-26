import { type NextPage } from 'next';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Page | PrayerBoard</title>
        <meta name="description" content="404" />
        <meta name="og:title" content={`404 | PrayerBoard`} />
        <meta name="og:description" content={`404 Error`} />
        <meta name="og:image" content="https://prayerboard.app/ogimage.png" />
        <meta name="og:url" content={`https://prayerboard.app/404`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@BAsokanthan" />
        <meta name="twitter:title" content={`404 | PrayerBoard`} />
        <meta name="twitter:description" content={`404 Error`} />
        <meta
          name="twitter:image"
          content="https://prayerboard.app/ogimage.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="item-center flex flex-1 flex-col justify-center p-10 lg:px-20">
          <h1 className="text-5xl font-bold text-teal-600 md:text-6xl">
            404 Error
          </h1>
          <h3 className="text-xl">
            Praying that you find what you&apos;re looking for! 🙏
          </h3>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Custom404;

