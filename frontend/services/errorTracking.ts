import { AxiosError } from 'axios';

type ErrorType = 'API' | 'UI' | 'Runtime';

interface ErrorLog {
  timestamp: string;
  type: ErrorType;
  message: string;
  stack?: string;
  componentName?: string;
  additionalInfo?: Record<string, unknown>;
}

interface ErrorTrackerOptions {
  maxLogs?: number;
  shouldConsoleLog?: boolean;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private logs: ErrorLog[] = [];
  private readonly maxLogs: number;
  private readonly shouldConsoleLog: boolean;

  private constructor(options: ErrorTrackerOptions = {}) {
    this.maxLogs = options.maxLogs ?? 100;
    this.shouldConsoleLog = options.shouldConsoleLog ?? process.env.NODE_ENV === 'development';

    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers(): void {
    if (typeof window !== 'undefined') {
      window.onerror = (message, source, lineno, colno, error) => {
        this.logError({
          type: 'Runtime',
          message: message.toString(),
          stack: error?.stack,
          additionalInfo: { source, lineno, colno }
        });
      };

      window.onunhandledrejection = (event) => {
        this.logError({
          type: 'Runtime',
          message: 'Unhandled Promise Rejection',
          stack: event.reason?.stack,
          additionalInfo: { reason: event.reason }
        });
      };
    }
  }

  public static getInstance(options?: ErrorTrackerOptions): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker(options);
    }
    return ErrorTracker.instance;
  }

  public logError({
    type,
    message,
    stack,
    componentName,
    additionalInfo
  }: Omit<ErrorLog, 'timestamp'>): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      type,
      message,
      stack,
      componentName,
      additionalInfo
    };

    this.logs.unshift(errorLog);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    if (this.shouldConsoleLog) {
      console.error('Error logged:', errorLog);
    }
  }

  public handleAPIError(error: AxiosError, componentName?: string): void {
    this.logError({
      type: 'API',
      message: error.response?.data?.message || error.message,
      stack: error.stack,
      componentName,
      additionalInfo: {
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method
      }
    });
  }

  public getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const errorTracker = ErrorTracker.getInstance({
  maxLogs: 100,
  shouldConsoleLog: process.env.NODE_ENV === 'development'
});
