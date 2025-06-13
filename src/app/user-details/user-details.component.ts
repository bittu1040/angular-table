
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  user: any;
  fields: string[] = [];

  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);

  constructor() {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe(user => {
        if (user) {
          this.user = user;
          this.fields = Object.keys(user);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
