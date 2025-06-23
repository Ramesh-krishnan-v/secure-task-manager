import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CreateEditDialogComponent } from './create-edit-dialog/create-edit-dialog';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog';
import { TaskPieChartComponent } from '../../charts/pie.chart/pie-chart.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SidebarComponent,
    ToolbarComponent,
    CreateEditDialogComponent,
    ConfirmDeleteDialogComponent,
    TaskPieChartComponent
  ],
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit {
  selectedRole: string = 'Viewer';
  tasks: any[] = [];
  showModal = false;
  dropdownOpen = false;

  newTask = {
    id: null,
    title: '',
    category: '',
    status: 'Not Started',
  };

  taskToDelete: any = null;
  showDeleteConfirm: boolean = false;
  isEditMode: boolean = false;
  loading = false;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const savedRole = localStorage.getItem('user_role');
    this.selectedRole = savedRole || 'Viewer';
    this.loadTasks();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-user-role': this.selectedRole,
    });
  }

  

loadTasks() {
  this.loading = true;
  this.http.get('/api/tasks', {
    headers: this.getHeaders()
  }).subscribe({
    next: (res: any) => {
      this.tasks = res;
      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to load tasks', err);
      this.loading = false;
    }
  });
}


  canEdit(): boolean {
    return this.selectedRole === 'Admin' || this.selectedRole === 'Owner';
  }

  canDelete(): boolean {
    return this.selectedRole === 'Admin';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Not Started':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  setRole(role: string) {
    this.selectedRole = role;
    localStorage.setItem('user_role', role);
    this.loadTasks();
  }

  logout() {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  createTask() {
    this.showModal = true;
    this.isEditMode = false;
    this.newTask = { id: null, title: '', category: '', status: 'Not Started' };
  }

  editTask(task: any) {
    this.showModal = true;
    this.isEditMode = true;
    this.newTask = { ...task };
  }

  closeModal() {
    this.showModal = false;
  }

  saveTask() {
    if (this.newTask.title && this.newTask.category) {
      const method = this.isEditMode
        ? this.http.patch(`/api/tasks/${this.newTask.id}`, this.newTask, { headers: this.getHeaders() })
        : this.http.post('/api/tasks', this.newTask, { headers: this.getHeaders() });

      method.subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => {
          console.error('Failed to save task', err);
        },
      });
    }
  }

  confirmDelete(task: any) {
    this.taskToDelete = task;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.taskToDelete = null;
    this.showDeleteConfirm = false;
  }

  deleteTask() {
    if (!this.taskToDelete) return;

    this.http.delete(`/api/tasks/${this.taskToDelete.id}`, {
      headers: this.getHeaders(),
    }).subscribe({
      next: () => {
        this.loadTasks();
        this.cancelDelete();
      },
      error: (err) => {
        console.error('Failed to delete task', err);
        this.cancelDelete();
      },
    });
  }
}
