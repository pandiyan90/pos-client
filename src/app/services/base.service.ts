import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  entityName = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    public config: ConfigService,
    public http: HttpClient,
    @Inject('entityName') entityName: string,
  ) {
    this.entityName = entityName;
  }

  getApiUrl() {
    return `${this.config.apiUrl}/${this.entityName}`;
  }

  getAll(): void {
    this.http.get<T[]>(`${this.config.apiUrl}/${this.entityName}`).subscribe({
      next: (list) => this.list$.next(list),
      error: (err) => console.error(err),
    });
  }

  get(id: number): Observable<T> {
    return Number(id) === 0
      ? new Observable<T>()
      : this.http.get<T>(`${this.config.apiUrl}/${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http
      .post<T>(`${this.config.apiUrl}/${this.entityName}`, entity)
      .pipe(tap((e) => this.getAll()));
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.config.apiUrl}/${this.entityName}/${id}`,
      entity,
    );
  }

  remove(id: number): Observable<T> {
    return this.http.delete<T>(
      `${this.config.apiUrl}/${this.entityName}/${id}`,
    );
  }

  like(key: string, value: string, limit = 20): Observable<T[]> {
    key = `${key}_like`;
    const query = `${this.config.apiUrl}/${this.entityName}?${key}=${value}&_limit=${limit}`;
    return this.http.get<T[]>(query);
  }

  fullText(value: string): Observable<T[]> {
    const query = `${this.config.apiUrl}/${this.entityName}?q=${value}`;
    return this.http.get<T[]>(query);
  }
}
