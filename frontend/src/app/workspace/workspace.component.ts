import { Component, Input, computed, inject, input } from '@angular/core';
import { Workspace } from '../data.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkspaceService } from '../workspace.service';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { AuthService } from '../auth.service';
import { AddWorkspaceComponent } from './add-workspace/add-workspace.component';
import { TodoComponent } from '../todo/todo.component';
import { AddTodoComponent } from '../todo/add-todo/add-todo.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [RouterLink, TodoComponent, AddWorkspaceComponent, AddTodoComponent],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  readonly #workspaceService = inject(WorkspaceService);
  #auth = inject(AuthService);

  $workspaces = toSignal(
    this.#workspaceService.getWorkspaces$,
    { initialValue: [] as Workspace[] }
  );

  $workspaceId = input<string>('', { alias: 'workspaceId' });
  
  $workspace = computed(() => {
    return this.$workspaces().find(workspace => {
      return workspace._id === this.$workspaceId();
    });
  });

  ngOnInit() {
    initFlowbite();
  }

  logout(){
    this.#auth.logout();
  }
}
