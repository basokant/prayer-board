import { router } from "../trpc";
import { prayerRequestRouter } from "./prayerRequest";
import { prayerBoardRouter}  from "./prayerBoard";

export const appRouter = router({
    prayerRequest: prayerRequestRouter,
    prayerBoard: prayerBoardRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
