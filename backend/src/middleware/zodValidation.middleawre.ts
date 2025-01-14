import {Request , Response , NextFunction} from 'express'
import { STATUS_CODES } from 'http'
import {Schema, z, ZodError} from 'zod'

export function validateData(schema : z.ZodObject <any,any>) {
  return (req:Request,res:Response,next:NextFunction) => {
      try{
        schema.parse(req.body)
        next()
      }catch(error){
        if(error instanceof ZodError){
            const errorMessages = error.errors.map((issue: any) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }))
            res.status(STATUS_CODES.BAD_REQUEST  as any).json({ error: 'Invalid data', details: errorMessages });
         } else {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR as any).json({ error: 'Internal Server Error' });
          }
        }
      }
}









