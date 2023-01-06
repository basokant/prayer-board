// components/Layout/index.js
import { StarsContainer } from "./StarsContainer";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col align-middle min-h-screen bg-gray-900 font-Poppins text-gray-300"
  >
    <StarsContainer/>
    {children}
  </motion.main>
);
export default Layout;