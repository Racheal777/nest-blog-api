import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Counter } from 'prom-client';

@Injectable()
export class HttpMetricsMiddleware implements NestMiddleware {
  private requestCounter: Counter<string>;

  constructor() {
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      this.requestCounter
        .labels(method, originalUrl, statusCode.toString())
        .inc();
    });

    next();
  }
}
