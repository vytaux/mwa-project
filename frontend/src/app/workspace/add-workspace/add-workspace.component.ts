import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkspaceService } from '../../workspace.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-workspace',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-workspace.component.html',
})
export class AddWorkspaceComponent {
  #workspaceService = inject(WorkspaceService);
  router = inject(Router);
  message = signal<string>("");

  form = inject(FormBuilder).nonNullable.group({
    name: ['',Validators.required],
  });


  addWorkspace(){
    this.#workspaceService
    .postWorkspace(this.form.value as {name: string})
    .subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (error) => {
        this.message.set("Couldn't create the workspace");
      }
    });

  }
}
