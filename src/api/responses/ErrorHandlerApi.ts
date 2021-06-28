import { ErrorRequestHandler, NextFunction, Request, Response } from "express";


export function ErrorHandlerApi(err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) {

  console.log(`Api errorhandler foi executada: ${err}`)

  res.status(500).json({
    errorCode: 'ERR-001',
    message: 'Erro Interno do Servidor'
  })
}

export function IgnoreFavicon(err: ErrorRequestHandler, req: Request, res: Response) {
  try {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
  } catch {
    console.log(`IgnoreFavicon foi executado com o erro: ${err}`)
  }
}
