import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  private url = '/api';

  get(url: string): Observable<any> {
    return this.http.get(this.url + url);
  }

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

  delete(url: string): Observable<any> {
    return this.http
      .delete(this.url + url)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(err: any) {
    const { status } = err;
    // if (status === 401) {
    //   localStorage.setItem('loggedIn', 'false');
    //   location.reload();
    // }
    return throwError(err);
  }

  showSuccessToast(message: string) {
    Swal.fire({
      icon: 'success',
      toast: true,
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  showErrorToast(message: string) {
    Swal.fire({
      icon: 'error',
      toast: true,
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
