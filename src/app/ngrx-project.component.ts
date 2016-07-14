import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TodoList } from "./components/todo-list";
import { TodoInput } from "./components/todo-input";
import { FilterSelect } from "./components/filter-select";
import { Store } from '@ngrx/store';
import { AppState, Todo, TodoModel } from "./common/interfaces";
import { Observable } from "rxjs/Observable";
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './common/actions';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Effects } from './effects/effects';

import 'rxjs/Rx';

@Component({
  moduleId: module.id,
	selector: `ngrx-project-app`,
	template: `
	<ngrx-store-log-monitor toggleCommand="ctrl-t"></ngrx-store-log-monitor>
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title">NgRx Store</h1>
				<h2 class="brand-tagline">Example #2 - Todos</h2>
			</div>
		</div>
		<div class="content pure-u-1 pure-u-md-3-4">	        
			<todo-input (addTodo)="addTodo($event)"></todo-input>
			<filter-select (filterSelect)="updateFilter($event)"></filter-select>
			<todo-list
				[todosModel]="todosModel$ | async"
				(removeTodo)="removeTodo($event)"
				(toggleTodo)="toggleTodo($event)">
			</todo-list>
		</div>
	</div>
	`,
	directives: [TodoList, TodoInput, FilterSelect, StoreLogMonitorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Effects]
})
export class NgrxProjectAppComponent {

	public todosModel$ : Observable<TodoModel>;

	//faking an id for demo purposes
	private id: number = 0;
	
	constructor(private _store : Store<AppState>, effects: Effects) {

		// Effects
		// effects.effectTodo$.subscribe(_store);

		const todos$ = _store.select<Observable<Todo[]>>('todos');
		const visibilityFilter$ = _store.select('visibilityFilter');
		/*
			Each time todos or visibilityFilter emits a new value, get the last emitted value from the other observable.
			This projection could be moved into a service or exported independantly and applied with the 'let' operator.
		*/
		this.todosModel$ = Observable
			.combineLatest(
				todos$,
				visibilityFilter$,
				(todos : Array<Todo>, visibilityFilter : any) => {
					return {
						filteredTodos: todos.filter(visibilityFilter),
						totalTodos: todos.length,
						completedTodos: todos.filter((todo : Todo) => todo.complete).length
					}
				}
			);
	}
	/*
		All state updates occur through dispatched actions.
		For demo purpose we are dispatching actions from container component but this could just as easily be done in services, or handled with ngrx/effect.
		The store can also be subscribed directly to 'action streams' for the same result.
		ex: action$.subscribe(_store)
	*/
	addTodo(description: string){
		return this._store.dispatch({type: ADD_TODO, payload: {
			id: ++this.id,
			description,
			complete: false
		}});
	}
	
	removeTodo(id: number){
		this._store.dispatch({type: REMOVE_TODO, payload: id});
	}
	
	toggleTodo(id: number){
		this._store.dispatch({type: TOGGLE_TODO, payload: id});
	}
	
	updateFilter(filter){
		this._store.dispatch({type: filter});
	}
}
