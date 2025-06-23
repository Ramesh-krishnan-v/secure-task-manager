import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() selectedRole: string = 'Admin';
  @Output() roleChanged = new EventEmitter<string>();
  @Output() logoutClicked = new EventEmitter<void>();

  dropdownOpen = false;

  toggleDropdown() {
     console.log('Toggle clicked');
    this.dropdownOpen = !this.dropdownOpen;
  }

  setRole(role: string) {
    this.roleChanged.emit(role);
    this.dropdownOpen = false;
  }

  logout() {
    this.logoutClicked.emit();
  }
}
