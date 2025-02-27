import { format, parseISO } from 'date-fns';

/**
 * Formats a given ISO date string into a custom date format.
 * @param isoString - The ISO date string to format.
 * @param customFormat - The custom date format. Default: 'dd-MM-yyyy'.
 * @returns Formatted date string.
 */
export const formatDate = (isoString: string|null, customFormat: string = 'dd-MM-yyyy'): string => {
    if(isoString){
        // const date = parseISO(isoString);
        return format(isoString, customFormat);
    }

};

/**
 * Formats a given ISO date string into a custom time format.
 * @param isoString - The ISO date string to format.
 * @param customFormat - The custom time format. Default: 'HH:mm'.
 * @returns Formatted time string.
 */
export const formatTime = (isoString: string, customFormat: string = 'HH:mm'): string => {
  const date = parseISO(isoString);
  return format(date, customFormat);
};

/**
 * Retrieves the current date in a custom format.
 * @param customFormat - The custom date format. Default: 'dd-MM-yyyy'.
 * @returns Current date string.
 */
export const getCurrentDate = (customFormat: string = 'dd-MM-yyyy'): string => {
  const now = new Date();
  return format(now, customFormat);
};

/**
 * Retrieves the current time in a custom format.
 * @param customFormat - The custom time format. Default: 'HH:mm'.
 * @returns Current time string.
 */
export const getCurrentTime = (customFormat: string = 'HH:mm'): string => {
  const now = new Date();
  return format(now, customFormat);
};
