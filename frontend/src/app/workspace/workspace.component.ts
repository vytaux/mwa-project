import { Component, computed, inject, input, model } from '@angular/core';
import { Workspace } from '../data.types';
import { WorkspaceService } from '../workspace.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { AddWorkspaceComponent } from './add-workspace/add-workspace.component';
import { TodoComponent } from '../todo/todo.component';
import { AddTodoComponent } from '../todo/add-todo/add-todo.component';
import { HeaderComponent } from "../header/header.component";
import { AddMemberComponent } from "../add-member/add-member.component";
import { AuthService } from '../auth.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-workspace',
    standalone: true,
    templateUrl: './workspace.component.html',
    imports: [RouterLink, TodoComponent, AddWorkspaceComponent, AddTodoComponent, HeaderComponent, AddMemberComponent, FooterComponent]
})
export class WorkspaceComponent {
  readonly workspaceService = inject(WorkspaceService);
  readonly #authService = inject(AuthService);
  routeSnapshot = inject(ActivatedRoute)
  router = inject(Router)

  workspaceId = model<string>('');

  $workspace = computed(() => {
    return this.workspaceService.$readWriteWorkspaces().find(workspace => {
      // Filter by workspace by selectedId otherwise
      return workspace._id === this.workspaceId();
    });
  });

  constructor() {
    const userId = this.#authService.$state().userId;

    this.workspaceService.getWorkspaces$
      .subscribe({
        next: (workspaces: Workspace[]) => {
          this.workspaceService.$readWriteWorkspaces.set(workspaces);

          this.workspaceId.set(this.routeSnapshot.snapshot.params['workspaceId']);

          this.workspaceService.$readWriteWorkspaces().find(workspace => {
            // Find the default workspace if the workspaceId is empty
            if (this.workspaceId() === undefined) {
              const foundUsersDefaultWorkspace = workspace.isDefault && workspace.owner_id === userId

              if (foundUsersDefaultWorkspace) {
                this.workspaceId.set(workspace._id);
                return true;
              }
              return false;
            }

            // Filter by workspace by selectedId otherwise
            return workspace._id === this.workspaceId();
          });
        }
      });
  }

  ngOnInit() {
    initFlowbite();
  }

  handleDeleteWorkspace(event: Event) {
    event.stopPropagation();

    const target = event.target as HTMLElement;
    const workspaceId = target.getAttribute('data-workspaceId');

    this.workspaceService.deleteWorkspace$(workspaceId as string)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate([''])
              .then(() => {
                window.location.reload();
              })
          }
        },
        error: (error) => {
          console.error("Couldn't delete the workspace", error);
        }
      });

    return false;
  }
}
