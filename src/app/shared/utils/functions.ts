import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export default function handleError<T>(operation = 'operation', result?: T) {
  return (error: HttpErrorResponse): Observable<T> => {
    console.error(error); // log to console instead

    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
