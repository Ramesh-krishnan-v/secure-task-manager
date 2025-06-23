import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-dialog.html',
})
export class CreateEditDialogComponent {
  @Input() isEditMode: boolean = false;
  @Input() newTask: any = { id: null, title: '', category: '', status: 'Not Started' };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
