import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppState, Todo, TodoModel} from "./../common/interfaces";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './../common/actions';
import {BEFORE_ADD_TODO, BEFORE_REMOVE_TODO, BEFORE_TOGGLE_TODO} from './../common/actions';
import {Store} from '@ngrx/store';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects';

@Injectable()
export class Effects {

    constructor(private _store : Store<AppState>, private updates$: StateUpdates<AppState>) {}

    // Add

    @Effect() 
    effectAddTodo$ = this.updates$.whenAction(BEFORE_ADD_TODO)
                        .map<string>(toPayload)
                        .do((payload: any) => {
                            console.info('Effect add with filter', payload);
                            if (payload.description.indexOf('complete') !== -1) {
                                payload.complete = true;
                            }
                        })
                        .do(payload => {
                            this._store.dispatch({type: ADD_TODO, payload: payload})
                        })
                        .filter(() => false);

    // Remove

    @Effect() 
    effectRemoveTodo$ = this.updates$.whenAction(BEFORE_REMOVE_TODO)
                        .map<string>(toPayload)
                        .do(payload => console.info('Effect remove', payload))
                        .do(payload => {
                            this._store.dispatch({type: REMOVE_TODO, payload: payload})
                        })
                        .filter(() => false);

    // Toggle

    @Effect() 
    effectToggleTodo$ = this.updates$.whenAction(BEFORE_TOGGLE_TODO)
                        .map<string>(toPayload)
                        .do(payload => console.info('Effect toggle', payload))
                        .do(payload => {
                            this._store.dispatch({type: TOGGLE_TODO, payload: payload})
                        })
                        .filter(() => false);
                        
}