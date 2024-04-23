import { Component, Input, inject, input, signal } from '@angular/core';
import { Todo } from '../data.types';
import { WorkspaceService } from '../workspace.service';

@Component({
    selector: 'app-todo',
    standalone: true,
    templateUrl: './todo.component.html'
})
export class TodoComponent {
    #workspaceService = inject(WorkspaceService)

    workspaceId = input<string>();
    todo = input<Todo>();

    isCompleted = false;

    handleCompleted(event: Event) {
        if (this.isCompleted) {
            this.#workspaceService.markAsIncomplete$(this.workspaceId(), this.todo()?._id)
                .subscribe({
                    next: (res) => {
                        this.isCompleted = false;
                    }
                });
        } else {
            this.#workspaceService.markAsComplete$(this.workspaceId(), this.todo()?._id)
                .subscribe({
                    next: (res) => {
                        this.isCompleted = true;
                    }
                });
        }
    }

    handleDeleteTodo(event: Event) {
        event.stopPropagation();

        this.#workspaceService.deleteTodo$(this.workspaceId(), this.todo()?._id)
            .subscribe({
                next: () => {
                    // TODO fix
                    window.location.reload();
                },
                error: (error) => {
                    console.error("Couldn't delete the todo", error);
                }
            });
    }

    ngOnInit() {
        this.isCompleted = this.todo()?.completedAt ? true : false;
    }
}