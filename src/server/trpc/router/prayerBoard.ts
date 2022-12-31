import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const prayerBoardRouter = router({
    hello: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.name}!`
            }
        }),

    getBoardBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.prayerBoard.findUnique({
                where: {
                    slug: input.slug
                },
                select: {
                    slug: true,
                    name: true,
                    prayerRequests: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        select: {
                            id: true,
                            message: true,
                            author: true,
                            numPrayedFor: true,
                        }
                    }
                }
            })
        }),

    create: publicProcedure
        .input(z.object({ name: z.string(), slug: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.prayerBoard.create({
                data: {
                    name: input.name,
                    slug: input.slug
                }
            })
        }),
})