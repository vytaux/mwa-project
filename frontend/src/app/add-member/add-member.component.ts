import { Component, SimpleChanges, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkspaceService } from '../workspace.service';
import { Workspace } from '../data.types';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-member.component.html'
})
export class AddMemberComponent {
  #workspaceService = inject(WorkspaceService);
  message = signal<string>("");

  workspaceId = input<string>();
  workspace = input<Workspace>();

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
  });

  addMember() {
    this.#workspaceService
      .addMember$(this.workspaceId() as string, this.form.value.email as string)
      .subscribe({
        next: (res) => {
          window.location.reload();
        },
        error: (error) => {
          this.message.set("Couldn't add member");
          console.error("Couldn't add member", error)
        }
      });
  }

  getMemberEmails(): string {
    const membersCommaSeparated = this.workspace()?.members
      .map(member => member.email)
      .join(', ');

    return membersCommaSeparated as string;
  }

  ngOnInit() {
    initFlowbite();
  }
}
