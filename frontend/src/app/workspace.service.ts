import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.development'
import { StandardResponse, Workspace } from './data.types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  readonly #http = inject(HttpClient);

  getWorkspaces$ = this.#http
    .get<StandardResponse<Workspace[]>>(environment.apiUrl + '/workspaces')
    .pipe(
      map(response => {
        if (!response.success) {
          return [];
        }

        return response.data;
      })
    );

  postWorkspace(credentials: { name: string; }) {
    return this.#http.post<{ data: string, sucess: boolean }>(
      environment.apiUrl + '/workspaces',
      credentials
    );
  }

  markAsComplete$ = (workspaceId?: string, todoId?: string) => {
    return this.#http
      .post<StandardResponse<Workspace[]>>(
        `${environment.apiUrl}/workspaces/${workspaceId}/todos/${todoId}/mark-complete`, 
        {}
      );
  };

  markAsIncomplete$ = (workspaceId?: string, todoId?: string) => {
    return this.#http
      .post<StandardResponse<Workspace[]>>(
        `${environment.apiUrl}/workspaces/${workspaceId}/todos/${todoId}/mark-incomplete`, 
        {}
      );
  };

  deleteTodo$ = (workspaceId?: string, todoId?: string) => {
    return this.#http
      .delete<StandardResponse<Workspace[]>>(
        `${environment.apiUrl}/workspaces/${workspaceId}/todos/${todoId}`, 
        {}
      );
  };
}
