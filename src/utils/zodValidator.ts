import z from 'zod'

export const validator=(schema:z.ZodSchema,data:unknown)=>{
    const result = schema.safeParse(data)
    return result
}


