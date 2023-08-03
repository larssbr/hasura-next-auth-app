import logger from 'pino';

const log = logger();

export function logInfo(...message: unknown[]): void {
  if (message.length === 1) {
    log.info(message[0]);
  } else if (message.length > 1) {
    message.forEach((mes) => log.info(mes));
  }
}

export function logErr(...message: unknown[]): void {
  if (message.length === 1) {
    log.error(message[0]);
  } else if (message.length > 1) {
    message.forEach((mes) => log.error(mes));
  }
}

export function logWarn(message: unknown) {
  log.warn(message);
}
