// Custom Object for Express Request
declare namespace Express {
    export interface Request {
       user?: any,
       rawBody?: any
    }
 }