import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private logFilePath: string;
  constructor(context: string) {
    super();
    this.logFilePath = path.join(__dirname, 'logs', 'application.log');
    this.ensureLogFileExists();
    this.context = context;
  }

  private ensureLogFileExists(): void {
    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, '', 'utf-8');
    }
  }

  private getFormattedDate(): string {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    const timezoneOffset = -now.getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(timezoneOffset) / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
    return `${date} ${time}${sign}${hours}:${minutes}`;
  }

  private appendToFile(entry: string): void {
    fs.appendFileSync(this.logFilePath, entry + os.EOL, 'utf-8');
  }

  private colorText(text: string, colorCode: string): string {
    return `\x1b[${colorCode}m${text}\x1b[0m`;
  }

  log(message: any): void {
    const entry = `${this.getFormattedDate()} [LOG] ${this.context} \t${message}`;
    this.appendToFile(entry);
    console.log(this.colorText(entry, '34')); // Blue
    super.log(message, this.context);
  }

  error(message: any, stackOrContext?: string): void {
    const entry = `${this.getFormattedDate()} [ERROR] ${stackOrContext} \t${message}`;
    this.appendToFile(entry);
    console.error(this.colorText(entry, '31')); // Red
    super.error(message, stackOrContext);
  }

  warn(message: any, context?: string): void {
    const entry = `${this.getFormattedDate()} [WARN] ${context} \t${message}`;
    this.appendToFile(entry);
    console.warn(this.colorText(entry, '33')); // Yellow
    super.warn(message, context);
  }

  debug(message: any, context?: string): void {
    const entry = `${this.getFormattedDate()} [DEBUG] ${context} \t${message}`;
    this.appendToFile(entry);
    console.debug(this.colorText(entry, '32')); // Green
    super.debug(message, context);
  }

  verbose(message: any, context?: string): void {
    const entry = `${this.getFormattedDate()} [VERBOSE] ${context} \t${message}`;
    this.appendToFile(entry);
    console.log(this.colorText(entry, '35')); // Magenta
    super.verbose(message, context);
  }
}
