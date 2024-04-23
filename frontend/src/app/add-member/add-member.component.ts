import { Component, SimpleChanges, inject, input, model, signal } from '@angular/core';
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
  workspace = model<Workspace>();

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

  getMemberEmails() {
    const membersCommaSeparated = this.workspace()?.members
      .map(member => member.email)
      .map(email => email);

    return membersCommaSeparated;
  }

  removeMember(email: string) {
    this.#workspaceService
      .removeMember$(this.workspaceId() as string, email)
      .subscribe({
        next: (res) => {
          this.workspace.update((value) => {
            if (!value) return value;
            return {
              ...value,
              members: value.members.filter(member => member.email !== email)
            };
          });
        },
        error: (error) => {
          this.message.set("Couldn't add/remove member");
          console.error("Couldn't add member", error)
        }
      });
  }

  ngOnInit() {
    initFlowbite();
  }
}
