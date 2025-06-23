import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardViewComponent } from './dashboard-view.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DashboardViewComponent', () => {
  let component: DashboardViewComponent;
  let fixture: ComponentFixture<DashboardViewComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardViewComponent,
        HttpClientTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardViewComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const mockTasks = [{ id: 1, title: 'Task 1', category: 'Dev', status: 'Pending' }];
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
    expect(component.tasks.length).toBe(1);
  });

  it('should set role and reload tasks', () => {
    const role = 'Admin';
    component.setRole(role);
    expect(component.selectedRole).toBe(role);
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.headers.get('x-user-role')).toBe(role);
    req.flush([]);
  });

  it('should toggle edit mode and open modal', () => {
    const task = { id: 2, title: 'Edit Me', category: 'Test', status: 'Not Started' };
    component.editTask(task);
    expect(component.isEditMode).toBeTrue();
    expect(component.showModal).toBeTrue();
    expect(component.newTask.title).toBe('Edit Me');
  });

  it('should allow creating a task when valid', () => {
    component.isEditMode = false;
    component.newTask = { title: 'New Task', category: 'Dev', status: 'Pending', id: null };
    component.saveTask();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should delete a task when confirmed', () => {
    component.taskToDelete = { id: 5 };
    component.deleteTask();
    const req = httpMock.expectOne('/api/tasks/5');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('Completed')).toContain('green');
    expect(component.getStatusClass('Pending')).toContain('yellow');
    expect(component.getStatusClass('Not Started')).toContain('gray');
  });

  it('canEdit() and canDelete() should return based on role', () => {
    component.selectedRole = 'Admin';
    expect(component.canEdit()).toBeTrue();
    expect(component.canDelete()).toBeTrue();

    component.selectedRole = 'Owner';
    expect(component.canEdit()).toBeTrue();
    expect(component.canDelete()).toBeFalse();

    component.selectedRole = 'Viewer';
    expect(component.canEdit()).toBeFalse();
    expect(component.canDelete()).toBeFalse();
  });
});
