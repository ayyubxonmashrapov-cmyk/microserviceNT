// src/common/filters/rpc-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    const rpcError =
      exception?.error ||
      exception?.response ||
      (typeof exception === 'object' ? exception : null);

    if (rpcError && (rpcError.statusCode || rpcError.status)) {
      status = rpcError.statusCode || rpcError.status;
      message = rpcError.message || rpcError;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'object' ? (res as any).message || res : res;
    } else if (exception?.message) {
      message = exception.message;
    }
    const formattedError = Array.isArray(message) ? message : [message];
    response.status(status).json({
      success: false,
      statusCode: status,
      error: formattedError,
      timestamp: new Date().toISOString(),
    });
  } 
}