import { Component, Input, computed, inject, input, signal } from '@angular/core';
import { Workspace } from '../data.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkspaceService } from '../workspace.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  readonly #workspaceService = inject(WorkspaceService);

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
    console.log(this.$workspaceId())
  }
}
