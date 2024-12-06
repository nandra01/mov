
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
    payload: T;
    statusCode: number;
    message: string;
  }
  
  @Injectable()
  export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => {
            const statusCode = context.switchToHttp().getResponse().statusCode;
            const message = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';
    
            return {
              statusCode,
              message,
              payload: data,
            };
          }),
          catchError((err) => {
            // Handle errors and return a formatted response
            const statusCode = err instanceof HttpException
              ? err.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;
    
            return throwError(() => ({
              statusCode,
              message: err.message || 'Internal server error',
            }));
          }),
        );
      }
    }