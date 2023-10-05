import z from 'zod'

export interface EditPostInputDTO {
    content: string,
    token: string,
    idToEdit: string
}

export type EditPostOutputDTO = undefined

export const EditPostSchema = z.object({
    content: z.string().min(1).max(500),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
})