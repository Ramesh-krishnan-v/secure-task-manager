import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class DashboardViewComponent  {
  user: any = {};
  isAdmin: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isAdmin = this.user.role === 'Admin';
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goToCreateUser(): void {
    this.router.navigate(['/create-user']);
  }
}
