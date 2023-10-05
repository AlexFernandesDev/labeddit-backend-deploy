import z from 'zod'
import { CommentModel } from '../../models/Comment'

export interface GetCommentsByPostIdInputDTO {
    postId: string,
    token: string
}

export type GetCommentsByPostIdOutputDTO = CommentModel[]

export const GetCommentsByPostIdSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1)
})