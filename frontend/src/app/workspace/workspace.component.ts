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

  @Input({
    alias: "workspaceId",
  })
  $workspaceId = signal('');
  
  $workspace = computed(() => {
    console.log('asd')
    console.log(this.$workspaceId())
    // return this.$workspaces().find(workspace => {
    //   workspace._id === this.$workspaceId();
    // });
  });

  ngOnInit() {
    console.log(this.$workspaceId)
  }
}
