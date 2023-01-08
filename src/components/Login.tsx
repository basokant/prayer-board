import { useEffect, useRef, useState } from "react";
import BoardCard from "./BoardCard";

import { trpc } from "..//utils/trpc";
import { motion } from "framer-motion";
import { useLocalStorage } from "usehooks-ts";

type LoginProps = {
  name: string;
  slug: string;
  numRequests: number;
  numMembers: number;
  onLogin: (password: string) => void;
  onError: () => void;
}

export default function Login({name, slug, numRequests, numMembers, onLogin, onError}: LoginProps) {
  const [password, setPassword] = useState<string>("");
  const passwordInput = useRef<any>(null);

  const login = trpc.prayerBoard.authenticate.useMutation()

  const [joined, setJoined] = useLocalStorage('joinedBoards', JSON.stringify({}));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="sm:px-5 md:px-16 flex flex-col justify-center"
    >
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <BoardCard slug={slug} name={name} numRequests={numRequests} numVisits={numMembers} />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex-1">
          <label htmlFor="BoardName">Board Password <span className="text-teal-500">*</span></label>
          <form className="flex flex-col md:flex-row flex-1 md:items-center gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              login.mutate({slug, password}, {
                onSuccess: () => {
                  const joinedBoards = JSON.parse(joined);
                  if (!(slug in joinedBoards)) {
                    console.log(joinedBoards);
                    joinedBoards[slug] = true;
                    setJoined(JSON.stringify(joinedBoards));
                  }
                  onLogin(password);
                },
                onError: (error) => {
                  onError();
                  setPassword("");
                  if (passwordInput.current !== null) {
                    passwordInput.current?.focus()
                  }
                }
              })
            }}
          >
            <input className="flex-1 p-3 px-4 rounded-md bg-gray-700 outline-none focus:border-[1px] focus:border-teal-500" 
              ref={passwordInput}
              id={`${slug}-BoardPassword`} 
              name={`${slug}-BoardPassword`}
              type="password" 
              placeholder="Enter the password." required
              value={password} maxLength={35}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input 
              className="text-lg p-2 px-4 bg-cyan-800 text-cyan-50 rounded-full outline-teal-500 hover:bg-cyan-700 transition-color" 
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
}