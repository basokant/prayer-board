import { useEffect, useState } from "react";
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
}

export default function Login({name, slug, numRequests, numMembers, onLogin}: LoginProps) {
  const [password, setPassword] = useState<string>("");

  const login = trpc.prayerBoard.authenticate.useMutation()

  const [joined, setJoined] = useLocalStorage('joinedBoards', JSON.stringify({}));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-16 flex flex-col justify-center"
    >
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <BoardCard slug={slug} name={name} numRequests={numRequests} numVisits={numMembers} />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex-1">
          <label htmlFor="BoardName">Board Password <span className="text-teal-500">*</span></label>
          <div className="flex flex-1 items-center gap-5">
            <input className="flex-1 p-3 px-4 rounded-md border-0 bg-gray-700 focus:outline-teal-500" id="BoardPassword" name="BoardPassword"
              type="password" 
              placeholder="A password for the board to be used by the community." required
              value={password} maxLength={35}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input 
              className="text-lg p-2 px-4 bg-cyan-800 text-cyan-50 rounded-full outline-teal-500 hover:bg-cyan-700 transition-color" 
              type="submit"
              value="Login"
              onClick={() => {
                login.mutate({slug, password}, {
                  onSuccess: () => {
                    const joinedBoards = JSON.parse(joined);
                    if (!(slug in joinedBoards)) {
                      console.log(joinedBoards);
                      joinedBoards[slug] = true;
                      setJoined(JSON.stringify(joinedBoards));
                    }
                    onLogin(password);
                  }
                })
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}