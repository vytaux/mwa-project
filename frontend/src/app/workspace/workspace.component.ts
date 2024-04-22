import { Component, inject } from '@angular/core';
import { Workspace } from '../data.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  readonly #workspaceService = inject(WorkspaceService);

  $workspaces = toSignal(
    this.#workspaceService.getWorkspaces$,
    { initialValue: [] as Workspace[] }
  );
}
