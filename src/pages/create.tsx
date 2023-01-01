import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { trpc } from "../utils/trpc";

const CreateBoard: NextPage = () => {

  const [boardName, setBoardName] = useState<string>("");
  const [boardPassword, setBoardPassword] = useState<string>("");

  const createBoard = trpc.prayerBoard.create.useMutation();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col align-middle justify-center min-h-screen bg-lightCyan font-Poppins lg:px-20 px-2 text-darkblue">
        <Navbar />
        <div className="flex flex-col align-center justify-center flex-1 px-[10vw] sm:px-[25vw]">
            <h1 className="text-right flex-grow-1 p-3 mb-3 text-3xl md:text-4xl font-semibold rounded-lg border-4 border-darkblue">Create a Board.</h1>

            <form 
              className="flex flex-col gap-4 font-medium"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(boardName, boardPassword)

                createBoard.mutate({ name: boardName, password: boardPassword })
                // Take user to the new board page
              }}
            >
              <label htmlFor="BoardName">Board Name <span className="text-turquise">*</span></label>
              <input className="p-3 px-4 rounded-md outline-turquise" id="BoardName" name="BoardName" type="text" 
                placeholder="What's the name of your community?" required autoFocus
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
              <label htmlFor="BoardName">Board Password <span className="text-turquise">*</span></label>
              <input className="p-3 px-4 rounded-md outline-turquise" id="BoardPassword" name="BoardPassword" type="text" 
                placeholder="A password for the board to be used by the community." required
                value={boardPassword}
                onChange={(e) => setBoardPassword(e.target.value)}
              />
              <div className="flex justify-end my-4">
                <input 
                  className="text-xl p-2 px-4 bg-blue text-lightCyan rounded-full hover:bg-turquise transition-all" 
                  type="submit"
                  value="Create Board"
                >
                </input>
              </div>
            </form>
        </div>
      </main>
    </>
  );
};

export default CreateBoard;
