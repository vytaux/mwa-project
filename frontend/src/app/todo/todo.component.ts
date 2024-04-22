import { Component, Input, inject, input } from '@angular/core';
import { Todo } from '../data.types';
import { WorkspaceService } from '../workspace.service';

@Component({
    selector: 'todo',
    standalone: true,
    templateUrl: './todo.component.html'
})
export class TodoComponent {
    #workspaceService = inject(WorkspaceService)

    workspaceId = input<string>();
    todo = input<Todo>();

    isCompleted = this.todo()?.completedAt ? true : false;

    handleClick(event: Event) {
        console.log(event.target)
        console.log(this.workspaceId(), this.todo()?._id)
        this.#workspaceService.markAsComplete$(this.workspaceId(), this.todo()?._id)
            .subscribe({
                next: (res) => {
                    console.log(res)
                    this.isCompleted = true;
                    // this.#auth.$state.set({
                    //   email: res.data.email,
                    //   token: res.data.token,
                    // });
                    // this.router.navigate(['']);
                }
                // ,
                // error: (error) => {
                //   this.errorMessage.set(error.error.data)
                // }
            });

        // if is complete => markAsIncomplete
        // else markAsComplete
        //    if success, set class Completed
        // POST workspace/:workspaceId
        // todoId => completedAt: true
        // this.#workspaceService.markTodoAsComplete(this.$workspaceId(), todoId);
    }

    ngOnInit() {
        console.log(this.todo());
        
        console.log(this.isCompleted)
    }
}