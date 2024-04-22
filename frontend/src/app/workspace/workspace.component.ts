import { Component, Input, computed, inject, input } from '@angular/core';
import { Workspace } from '../data.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkspaceService } from '../workspace.service';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [RouterLink],
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

<<<<<<< Updated upstream
  logout(){
    this.#auth.logout();
=======
  handleClick(event: Event) {
    // PUT workspace/:workspaceId
    // todoId => completedAt: true
    this.#workspaceService.markTodoAsComplete(this.$workspaceId());
    return false
>>>>>>> Stashed changes
  }
}
