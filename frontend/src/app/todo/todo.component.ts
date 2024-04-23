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

    last = input<boolean>();
    first = input<boolean>();

    handleCompleted(event: Event) {
        if (this.todo()?.completedAt != null) {
            this.#workspaceService.markAsIncomplete$(this.workspaceId(), this.todo()?._id)
                .subscribe({
                    next: (res) => {
                        this.#workspaceService.$readWriteWorkspaces.update((workspaces) => {
                            return workspaces.map(workspace => {
                                if (workspace._id === this.workspaceId()) {
                                    workspace.todos.map(todo => {
                                        if (todo._id === this.todo()?._id) {
                                            todo.completedAt = null;
                                        }
                                        return todo;
                                    });
                                }
                                return workspace;
                            });
                        });
                    }
                });
        } else {
            this.#workspaceService.markAsComplete$(this.workspaceId(), this.todo()?._id)
                .subscribe({
                    next: (res) => {
                        this.#workspaceService.$readWriteWorkspaces.update((workspaces) => {
                            return workspaces.map(workspace => {
                                if (workspace._id === this.workspaceId()) {
                                    workspace.todos.map(todo => {
                                        if (todo._id === this.todo()?._id) {
                                            todo.completedAt = new Date();
                                        }
                                        return todo;
                                    });
                                }
                                return workspace;
                            });
                        });
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
}