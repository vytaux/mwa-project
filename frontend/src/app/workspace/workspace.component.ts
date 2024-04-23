import { Component, Input, computed, inject, input, signal } from '@angular/core';
import { Workspace } from '../data.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkspaceService } from '../workspace.service';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { AuthService } from '../auth.service';
import { AddWorkspaceComponent } from './add-workspace/add-workspace.component';
import { TodoComponent } from '../todo/todo.component';
import { AddTodoComponent } from '../todo/add-todo/add-todo.component';
import { HeaderComponent } from "../header/header.component";
import { AddMemberComponent } from "../add-member/add-member.component";

@Component({
    selector: 'app-workspace',
    standalone: true,
    templateUrl: './workspace.component.html',
    imports: [RouterLink, TodoComponent, AddWorkspaceComponent, AddTodoComponent, HeaderComponent, AddMemberComponent]
})
export class WorkspaceComponent {
  readonly workspaceService = inject(WorkspaceService);

  $workspaceId = input<string>('', { alias: 'workspaceId' });

  $workspace = computed(() => {
    return this.workspaceService.$readWriteWorkspaces().find(workspace => {
      return workspace._id === this.$workspaceId();
    });
  });

  constructor() {
    this.workspaceService.getWorkspaces$
      .subscribe({
        next: (workspaces: Workspace[]) => {
          this.workspaceService.$readWriteWorkspaces.set(workspaces);
        }
      });
  }

  ngOnInit() {
    initFlowbite();
  }

  handleDeleteWorkspace(event: Event) {
    event.stopPropagation();

    this.workspaceService.deleteWorkspace$(this.$workspaceId())
      .subscribe({
        next: (res) => {
          if (res.success) {
            window.location.reload();
          }
        },
        error: (error) => {
          console.error("Couldn't delete the workspace", error);
        }
      });
  }
}
