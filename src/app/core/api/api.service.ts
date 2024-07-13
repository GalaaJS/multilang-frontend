import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  private url = '/admin';

  /**
   * GET
   * @category HTTP requests
   * @param url : URL
   * @returns Observable
   */
  get(url: string): Observable<any> {
    return this.http.get(this.url + url).pipe(
      map((res) => {
        return res as any;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  /**
   * POST
   * @category HTTP requests
   * @param url : URL
   * @param body : Body
   * @returns Observable
   */
  post(url: string, body: any): Observable<any> {
    return this.http
      .post(
        this.url + url,
        JSON.stringify(body, (_, value) => {
          if (value !== null) {
            return value;
          }
        }),
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  /**
   * PUT
   * @category HTTP requests
   * @param url : URL
   * @param body : Body
   * @returns Observable
   */
  put(url: string, body: any): Observable<any> {
    return this.http
      .put(
        this.url + url,
        JSON.stringify(body, (_, value) => {
          if (value !== null) {
            return value;
          }
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  /**
   * DELETE
   * @category HTTP requests
   * @param url : URL
   * @returns Observable
   */
  delete(url: string): Observable<any> {
    return this.http
      .delete(this.url + url)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(err: any) {
    const { status } = err;
    if (status === 401) {
      localStorage.setItem('loggedIn', 'false');
      location.reload();
    }
    return throwError(() => err);
  }
}
