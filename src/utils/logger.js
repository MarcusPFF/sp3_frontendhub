import { BASE_URL } from "../apiFacade.js";

export const log = (level, message, ...args) => {
  const timestamp = new Date().toISOString();
  
  const logData = {
    timestamp,
    level,
    message,
    details: args.length > 0 ? args : undefined
  };
  
  switch (level) {
    case 'error':
      console.error(`[${timestamp}] ${message}`, ...args);
      break;
    case 'warn':
      console.warn(`[${timestamp}] ${message}`, ...args);
      break;
    default:
      console.log(`[${timestamp}] ${message}`, ...args);
  }
  
  return logData;
};

export const logError = (message, ...args) => log('error', message, ...args);
export const logWarn = (message, ...args) => log('warn', message, ...args);
export const logInfo = (message, ...args) => log('info', message, ...args);
