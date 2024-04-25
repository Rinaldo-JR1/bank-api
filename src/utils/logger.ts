import winston, { Logger, createLogger, format, transports } from 'winston';

// Crie um novo logger
const logger: Logger = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.json(),
                format.colorize(),
                format.timestamp({
                    format: "DD-MM-YYYY HH:mm:sss",
                }),
                format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] - ${level}: ${message}`;
                })
            ),
        }),
        new transports.File({
            dirname: "./logs/",
            filename: "app.log",
            format: format.combine(format.json()),
        })
    ],
    format: format.combine(format.metadata()),

});


// Exporte o logger para uso em outros arquivos
export default logger;