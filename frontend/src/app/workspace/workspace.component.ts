import { Component, inject } from '@angular/core';
import { Todo, Workspace } from '../data.types';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-workspace',
  // standalone: true,
  imports: [],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  readonly #workspaceService = inject(WorkspaceService);

  $workspaces = toSignal(
    this.#workspaceService.getWorkspaces$,
    { initialValue: [] as Workspace[] }
  );

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.workspaceService.getWorkspaces().subscribe(data => {
      this.$workspaces.set(data);
    });
  }
}
