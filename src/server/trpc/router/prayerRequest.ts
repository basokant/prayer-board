import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const prayerRequestRouter = router({
    create: publicProcedure
        .input(z.object({ boardSlug: z.string(), message: z.string(), author: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.prayerRequest.create({
                data: {
                    message: input.message,
                    author: input.author,
                    PrayerBoard: {
                        connect: {
                            slug: input.boardSlug
                        }
                    }
                },
                select: {
                    id: true,
                    message: true,
                    author: true,
                    numPrayedFor: true,
                    createdAt: true,
                }
            })
        }),
    
    updateNumPrayerFor: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.prayerRequest.update({
                where: {
                    id: input.id
                },
                data: {
                    numPrayedFor: {
                        increment: 1
                    }
                }
            })
        }),

})