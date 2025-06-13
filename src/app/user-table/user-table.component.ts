import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  headers: string[] = [];

  userService = inject(UserService);
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.userService.getColumnHeaders().subscribe(headers => {
      this.headers = headers;
    });
  }

  viewDetails(user: any) {
    this.router.navigate(['/users', user.id]);
  }
}
