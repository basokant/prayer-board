import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import slugify from '../../../helpers/slugify'

export const prayerBoardRouter = router({
    hello: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.name}!`
            }
        }),

    bySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.prayerBoard.findUnique({
                where: {
                    slug: input.slug
                },
                select: {
                    slug: true,
                    name: true,
                    numVisits: true,
                    _count: {
                        select: { prayerRequests: true }
                    },
                    prayerRequests: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        select: {
                            id: true,
                            message: true,
                            author: true,
                            numPrayedFor: true,
                            createdAt: true,
                        }
                    }
                }
            })
        }),

    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.prayerBoard.findMany({
                select: {
                    slug: true,
                    name: true,
                    numVisits: true,
                    _count: {
                        select: { prayerRequests: true }
                    }
                }
            })
        }),

    getAllSlugs: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.prayerBoard.findMany({
                select: {
                    slug: true,
                }
            })
        }),

    getStats: publicProcedure
        .query(({ ctx }) => {
            const prayerBoardCount = ctx.prisma.prayerBoard.aggregate({
                _count: {
                    id: true,
                },
            })
            
            const prayerRequestStats = ctx.prisma.prayerRequest.aggregate({
                _sum: {
                    numPrayedFor: true,
                },
                _count: {
                    id: true,
                }
            })

            return Promise.all([prayerBoardCount, prayerRequestStats])
        }),

    create: publicProcedure
        .input(z.object({ name: z.string(), password: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.prayerBoard.create({
                data: {
                    name: input.name,
                    slug: slugify(input.name),
                    password: input.password,
                },
                select: {
                    slug: true,
                    name: true,
                }
            })
        }),

    authenticate: publicProcedure
        .input(z.object({ slug: z.string(), password: z.string()} ))
        .mutation(async ({ ctx, input }) => {
            const board = await ctx.prisma.prayerBoard.findUnique({
                where: {
                    slug: input.slug,
                },
                select: {
                    password: true,
                }
            })

            if (!board) {
                throw new Error('Board not found')
            }

            if (board.password !== input.password) {
                throw new Error('Incorrect password')
            }

            return ctx.prisma.prayerBoard.update({
                where: {
                    slug: input.slug,
                },
                data: {
                    numVisits: {
                        increment: 1,
                    }
                },
                select: {
                    numVisits: true,
                }
            })
        })
})