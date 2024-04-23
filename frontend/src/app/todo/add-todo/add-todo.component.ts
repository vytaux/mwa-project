import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkspaceService } from '../../workspace.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
})
export class AddTodoComponent {
  #workspaceService = inject(WorkspaceService);

  message = signal<string>('');
  workspaceId = input<string>();

  form = inject(FormBuilder).nonNullable.group({
    body: ['', Validators.required],
  });


  addTodo() {
    this.#workspaceService
      .postTodo$(this.workspaceId() as string, this.form.value.body as string)
      .subscribe({
        next: (res) => {
          // TODO fix maybe later
          window.location.reload();
        },
        error: (error) => {
          this.message.set("Couldn't add a new todo");
        }
      });
  }
}
