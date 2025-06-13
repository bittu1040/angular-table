import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly dataUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
  private users = new BehaviorSubject<any[]>([]);
  private headers = new BehaviorSubject<string[]>([]);

  http = inject(HttpClient);

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.get<any[]>(this.dataUrl).subscribe(users => {
      if (users.length > 0) {
        this.headers.next(Object.keys(users[0]));
        this.users.next(users);
      }
    })
  }

  getUsers(): Observable<any[]> {
    return this.users.asObservable();
  }

  getColumnHeaders(): Observable<string[]> {
    return this.headers.asObservable();
  }

  getUserById(id: string): Observable<any> {
    return this.users.pipe(
      map(users => users.find(user => user.id === id))
    );
  }
}
