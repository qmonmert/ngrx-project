import {Component, ChangeDetectionStrategy} from '@angular/core';
import {TodoList} from "./components/todo-list";
import {TodoInput} from "./components/todo-input";
import {FilterSelect} from "./components/filter-select";
import {AppState, Todo, TodoModel} from "./common/interfaces";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './common/actions';
import {BEFORE_ADD_TODO, BEFORE_REMOVE_TODO, BEFORE_TOGGLE_TODO} from './common/actions';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import '@ngrx/core/add/operator/select';
import {Store} from '@ngrx/store';
import {StoreLogMonitorComponent} from '@ngrx/store-log-monitor';

@Component({
  moduleId: module.id,
	selector: `ngrx-project-app`,
	template: `
	<ngrx-store-log-monitor toggleCommand="ctrl-t"></ngrx-store-log-monitor>
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title">NgRx</h1>
				<h2 class="brand-tagline">Store & Effects</h2>
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
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxProjectAppComponent {

	public todosModel$: Observable<TodoModel>;

	private id: number = 0;
	
	constructor(private _store : Store<AppState>) {

		// todosReducer & visibilityFilter : ActionReducer
		const todos$ = _store.select('todosReducer');
		const visibilityFilter$ = _store.select('visibilityFilter');

		// Combine todos$ and visibilityFilter$
		this.todosModel$ = Observable
			.combineLatest(
				todos$,
				visibilityFilter$,
				(todos: Array<Todo>, visibilityFilter: any) => {
					return {
						filteredTodos: todos.filter(visibilityFilter),
						totalTodos: todos.length,
						completedTodos: todos.filter((todo : Todo) => todo.complete).length
					}
				}
			);
	}

	// Add, remove, toggle

	addTodo(description: string){
		this._store.dispatch({type: BEFORE_ADD_TODO, payload: {
			id: ++this.id,
			description,
			complete: false
		}});
	}

	removeTodo(id: number){
		this._store.dispatch({type: BEFORE_REMOVE_TODO, payload: id});
	}
	
	toggleTodo(id: number){
		this._store.dispatch({type: BEFORE_TOGGLE_TODO, payload: id});
	}

	// Filter
	
	updateFilter(filter){
		this._store.dispatch({type: filter});
	}

}
