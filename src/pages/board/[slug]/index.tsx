import Head from "next/head";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

import { Toaster, toast } from 'react-hot-toast';
import { LineWave } from 'react-loader-spinner';

import Navbar from "../../../components/Navbar";
import Layout from "../../../components/Layout";
import BoardCard from "../../../components/BoardCard";
import SelectMenu from "../../../components/SelectMenu";
import RequestCards from "../../../components/RequestCards";
import Login from "../../../components/Login";
import Footer from "../../../components/Footer";

import * as Separator from '@radix-ui/react-separator';
import React, { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { AnimatePresence, motion } from "framer-motion";
import { useLocalStorage } from 'usehooks-ts';

import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { createContextInner } from '../../../server/trpc/context';
import { appRouter } from '../../../server/trpc/router/_app';
import superjson from 'superjson';
import { trpc } from "../../../utils/trpc";

const sortByOptions = ["Time Created", "Number of Prayers"];
const orderOptions = ["Descending", "Ascending"];

export default function Board(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { slug } = props;

  const createPrayerRequest = trpc.prayerRequest.create.useMutation(
    {
      onSuccess: () => {
        reveal();
        setRequestMessage("");
        setRequestAuthor("");
        toast.success("Prayer request sent! 🙏");
        boardQuery.refetch()
      },
      onError: (error) => {
        reveal();
        setRequestMessage("");
        setRequestAuthor("");
        console.log(error, "error handler")
        toast.error("Something went wrong. Please try again later.");
      }
    }
  );
  const boardQuery = trpc.prayerBoard.bySlug.useQuery(
    {slug: slug},
    {
      refetchInterval: 15000
    }
  );
  const login = trpc.prayerBoard.authenticate.useMutation()

  const { data } = boardQuery;

  const [requestMessage, setRequestMessage] = useState<string>("");
  const [requestAuthor, setRequestAuthor] = useState<string>("");
  const [showRequestForm, setShowRequestForm] = useState<boolean>(false);
  const [selectedSortByOption, setSelectedSortByOption] = useState(sortByOptions[0]);
  const [selectedOrderOption, setSelectedOrderOption] = useState(orderOptions[0]);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [requestsParent] = useAutoAnimate();
  const [boardParent] = useAutoAnimate();

  const reveal = () => setShowRequestForm(!showRequestForm);

  const requestFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (requestAuthor === "") {
      createPrayerRequest.mutate({ boardSlug: slug, message: requestMessage, author: "Anonymous" });
    } else {
      createPrayerRequest.mutate({ boardSlug: slug, message: requestMessage, author: requestAuthor });
    }
    
  }

  useEffect(() => {
    if (data && data.prayerRequests && data.prayerRequests.length > 1) {
      data.prayerRequests.sort((a,b) => {
        if (selectedSortByOption === "Time Created") {
          if (selectedOrderOption === "Descending") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          }
        } else if (selectedSortByOption === "Number of Prayers") {
          if (selectedOrderOption === "Descending") {
            return b.numPrayedFor - a.numPrayedFor;
          } else {
            return a.numPrayedFor - b.numPrayedFor;
          }
        }

        return 1;
      })
    }
  }, [data, selectedSortByOption, selectedOrderOption])

  return (
    <>
      <Head>
        <title>{data?.name} | PrayerBoard</title>
        <meta name="description" content={`Join the ${data?.name} PrayerBoard, our place for sharing prayer requests!`} />
        <meta name="og:title" content={`${data?.name} | PrayerBoard`} />
        <meta name="og:description" content={`Join the ${data?.name} PrayerBoard, our place for sharing prayer requests!`} />
        <meta name="og:image" content="https://prayerboard.app/ogimage.png" />
        <meta name="og:url" content={`https://prayerboard.app/board/${slug}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex-1 lg:px-36 xl:px-42 px-7 pb-10 flex flex-col justify-center">
        <AnimatePresence>
          {
            !loggedIn && data && (
            <Login
              key="login"
              name={data.name}
              slug={slug}
              numRequests={data.prayerRequests.length}
              numMembers={data.numVisits}
              onLogin={(password) => {
                setLoggedIn(true);
                setPassword(password);
                boardQuery.refetch();
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {
            loggedIn &&
              <motion.div
                initial={{ opacity: 0, height: 0, flex: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                key="boardPage"
                ref={boardParent}
              >
              <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                { data &&
                  <BoardCard 
                    name={data.name}
                    slug={data.slug}
                    numRequests={data._count.prayerRequests}
                    numVisits={data.numVisits}
                  />
                }
              </div>
              {
                showRequestForm ?
                <form 
                  className="flex flex-col gap-6 py-6"
                  onSubmit={requestFormHandler}
                >
                  <label className="font-medium" htmlFor="message">Prayer Request <span className="text-teal-600">*</span></label>
                  <div className="flex flex-col items-end justify-end">
                    <textarea 
                      rows={4}
                      maxLength={400}
                      className="resize-none p-5 w-[100%] h-50 rounded-md bg-gray-700 outline-teal-500"
                      placeholder="What do you need prayer for?"
                      name="message"
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      required
                      autoFocus
                      disabled={createPrayerRequest.isLoading}
                    />
                  </div>
                  <label className="font-medium pt-4" htmlFor="name">Author (not required)</label>
                  <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className="flex-1">
                      <input className="p-5 py-4 w-[100%] rounded-md bg-gray-700 outline-teal-500" type="text" 
                          placeholder="What is your name?"
                          name="name"
                          value={requestAuthor}
                          onChange={(e) => setRequestAuthor(e.target.value)}
                          disabled={createPrayerRequest.isLoading}
                      />
                    </div>
                    <input 
                      className="text-md p-2 px-4 bg-transparent text-cyan-500 hover:text-cyan-400 transition-colors" 
                      type="button"
                      value="Cancel"
                      onClick={reveal}
                    />
                    <button 
                      className="flex items-center justify-center text-md p-2 px-4 w-50 bg-cyan-800 text-cyan-50 rounded-full outline-teal-500 hover:bg-cyan-700 transition-all" 
                      type="submit"
                      disabled={createPrayerRequest.isLoading}
                    >
                      {!createPrayerRequest.isLoading && !createPrayerRequest.isPaused && "Request Prayer"}
                      <LineWave 
                        width="20"
                        height="20"
                        color="#E4E7EB"
                        ariaLabel="line-wave"
                        wrapperStyle={{}}
                        wrapperClass="scale-[2]"
                        visible={createPrayerRequest.isLoading}
                      />
                    </button>
                  </div>
                </form>
                :
                <div className="flex gap-3 items-center pb-6">
                  <button 
                    className="text-md p-2 px-4 bg-cyan-800 text-cyan-50 rounded-full outline-teal-500 hover:bg-cyan-700 transition-colors"
                    onClick={reveal}
                  >
                    Request Prayer
                  </button>
                  <button 
                    className="text-md p-2 px-4 text-teal-500 rounded-full outline outline-1 outline-teal-500 hover:text-teal-200 hover:outline-teal-200 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Join the ${data?.name} PrayerBoard, our place for sharing prayer requests!\nLink: ${window.location.origin}/board/${slug}\nPassword: ${password}`
                      )
                      toast.success("Copied invite to clipboard! 🙏");
                    }}
                  >
                    Copy Invite
                  </button>
                </div>
              }
              <Separator.Root 
                className="SeparatorRoot my-2 bg-gray-800 h-[1px]"
                decorative
                orientation="horizontal"
              />
              <div className="flex flex-wrap gap-4 py-1">
                <SelectMenu zIndex={5} label="Sort By" options={sortByOptions} selectedValue={selectedSortByOption} onChange={setSelectedSortByOption}/>
                <SelectMenu zIndex={4} label="Order" options={orderOptions} selectedValue={selectedOrderOption} onChange={setSelectedOrderOption} />
              </div>
              <div className="flex-1 py-5 grid grid-cols-1 md:grid-cols-2 gap-5 w-[100%]" ref={requestsParent}>
                <RequestCards 
                  prayerRequests={data?.prayerRequests}
                  sortBy={selectedSortByOption}
                  order={selectedOrderOption}
                  refetch={boardQuery.refetch}
                />
              </div>
              </motion.div>
          }
          </AnimatePresence>
        </div>
        <div>
          <Toaster 
            position="bottom-center"
            reverseOrder={true}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#374151',
                color: '#D1D5DA'
              },
              success: {
                iconTheme: {
                  primary: '#0C9488',
                  secondary: '#E4E7EB'
                }
              }
            }}
          />
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ slug: string }>) {
  const slug = context?.params?.slug.replace(/\\/g, '');

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  const allBoards = await ssg.prayerBoard.getAll.fetch();
  if (!allBoards.some((board) => board.slug === slug)) {
    return {
      notFound: true,
    }
  }

  await ssg.prayerBoard.bySlug.prefetch( {slug: slug} );

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug: slug,
    }
  }
}

function useAutoAnimate(options = {}) {
  const callbackRef = React.useCallback(
    (el: HTMLDivElement) => el instanceof HTMLDivElement && autoAnimate(el, options),
    [options]
  )
  return [callbackRef]
}