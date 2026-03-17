import { DatePipe } from '@angular/common';

const pipeCache = new Map<string, DatePipe>();

/**
 * Returns a cached DatePipe instance for the given locale.
 * Avoids creating new DatePipe instances on every format call.
 */
export function getDatePipe(locale: string): DatePipe {
  let pipe = pipeCache.get(locale);
  if (!pipe) {
    pipe = new DatePipe(locale);
    pipeCache.set(locale, pipe);
  }
  return pipe;
}
