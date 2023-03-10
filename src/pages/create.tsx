import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { trpc } from "../utils/trpc";

import slugify from "../helpers/slugify";
import Layout from "../components/Layout";

const CreateBoard: NextPage = () => {

  const router = useRouter();

  const [boardName, setBoardName] = useState<string>("");
  const [boardPassword, setBoardPassword] = useState<string>("");

  const allBoardSlugs = trpc.prayerBoard.getAllSlugs.useQuery();
  const createBoard = trpc.prayerBoard.create.useMutation();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(boardName, boardPassword)

    if (!allBoardSlugs.isLoading && !allBoardSlugs.isError && allBoardSlugs.data) {
      const boardSlugs = allBoardSlugs.data.map((board) => board.slug);
      console.log(boardSlugs);

      const slug = slugify(boardName);
      if (boardSlugs.includes(slug)) {
        toast.error("Board name already taken. Please try another name.");
        return;
      }

      createBoard.mutate({ name: boardName, password: boardPassword }, {
        onSuccess: (data) => {
          const slug = data.slug;
          router.push(`/board/${slug}`);
          toast.success("Board created successfully! 🎉");
        },
        onError: (error) => {
          toast.error("Error creating board. Please try again.");
          console.log(error);
        }
      })

    } else if (allBoardSlugs.isError) 
      toast.error("Error creating board. Please try again.");
      console.log(allBoardSlugs.error);
  }

  return (
    <>
      <Head>
        <title>Create a Board | PrayerBoard</title>
        <meta name="description" content="Create a PrayerBoard: a place for your community of prayer." />
        <meta name="og:title" content={`Create a Board | PrayerBoard`} />
        <meta name="og:description" content={`Create a PrayerBoard: a place for your community of prayer.`} />
        <meta name="og:image" content="https://prayerboard.app/ogimage.png" />
        <meta name="og:url" content={`https://prayerboard.app/create`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@BAsokanthan" />
        <meta name="twitter:title" content={`Create a Board | PrayerBoard`} />
        <meta name="twitter:description" content={`Create a PrayerBoard: a place for your community of prayer.`} />
        <meta name="twitter:image" content="https://prayerboard.app/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex flex-col justify-center flex-1 px-7 sm:px-28 xl:px-[27rem]">
          <h1 className="text-right flex-grow-1 p-3 mb-3 text-3xl md:text-4xl font-semibold rounded-lg border-4 border-slate-800">Create a Board.</h1>
          { createBoard.isLoading && <div className="text-center">Loading...</div> }
          <form 
            className="flex flex-col gap-4 font-medium"
            onSubmit={submitHandler}
          >
            <label htmlFor="BoardName">Board Name <span className="text-teal-500">*</span> (4-35 alphanumeric)</label>
            <input className="p-3 px-4 rounded-md border-0 bg-gray-700 focus:outline-teal-500" 
              id="BoardName" 
              name="BoardName" 
              type="text" 
              placeholder="What's the name of your community?" required autoFocus
              value={boardName} minLength={4} maxLength={35}
              pattern="(\w+( \w+)){4, 35}"
              onChange={(e) => setBoardName(e.target.value)}
              disabled={createBoard.isLoading}
            />
            <label htmlFor="CreateBoardName">Board Password <span className="text-teal-500">*</span> (6-35 alphanumeric)</label>
            <input className="p-3 px-4 rounded-md border-0 bg-gray-700 focus:outline-teal-500"
              id="CreateBoardPassword"
              name="CreateBoardPassword"
              type="password" 
              placeholder="A password for the board to be used by the community." required
              value={boardPassword} minLength={6} maxLength={35}
              pattern="(\w+( \w+)){4, 35}"
              onChange={(e) => setBoardPassword(e.target.value)}
              disabled={createBoard.isLoading}
            />
            <div className="flex justify-end my-4">
              <input 
                className="text-lg p-2 px-4 bg-cyan-800 text-cyan-50 rounded-full outline-teal-500 hover:bg-cyan-700 transition-color" 
                type="submit"
                value="Create Board"
                disabled={createBoard.isLoading}
              >
              </input>
            </div>
          </form>
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
};

export default CreateBoard;
