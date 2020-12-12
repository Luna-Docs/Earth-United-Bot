import {Logger as WinstonLogger, createLogger, format, transports} from 'winston';

// Class
export default class Logger {
    readonly #logger: WinstonLogger;

    public constructor() {
        this.#logger = createLogger({
            format: format.combine(format.timestamp({format: 'MM-DD-YYYY | hh:mm:ss A'}), format.printf((info: any): string => {
                const {timestamp, level, message, ...rest} = info;
                const msg = `[${timestamp}] (${level}): ${message}`;
                return `${msg}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
            })),
            transports: [
                new transports.Console({
                    format: format.colorize({level: true}),
                    level: 'info'
                }),
                new transports.File({
                    format: format.combine(format.timestamp(), format.json()),
                    level: 'debug',
                    filename: 'combined.log'
                })
            ]
        });
    }

    public info(message: string): void {
        this.#logger.info(message);
    }

    public debug(message: string): void {
        this.#logger.debug(message);
    }

    public warn(message: string): void {
        this.#logger.warn(message);
    }

    public error(message: any): void {
        this.#logger.error(message.stack ? message.stack : message.toString());
    }
};