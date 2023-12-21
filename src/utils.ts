/**
 * Converts a date string to a formatted date string.
 * 
 * Takes a date string as input, validates it to ensure it's a valid date string,
 * converts it to a Date object, formats it according to the provided options, 
 * and returns the formatted date string.
*/
export function convertDateFormat(inputDate: string, locale: string = 'en-US'): string {
  const inputDateTime = new Date(inputDate);
  
  if (isNaN(inputDateTime.getTime())) {
    throw new Error('Invalid date input');
  }


  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const formattedDate = inputDateTime.toLocaleDateString(locale, options);

  return formattedDate;
}