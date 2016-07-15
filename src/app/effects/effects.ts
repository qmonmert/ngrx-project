import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppState, Todo, TodoModel} from "./../common/interfaces";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './../common/actions';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects';

@Injectable()
export class Effects {

    constructor(private updates$: StateUpdates<AppState>) {}

    @Effect() 
    effectAddTodo$ = this.updates$.whenAction(ADD_TODO)
                        .do(action => console.info('Effect :', ADD_TODO, action))
                        .filter(() => false);

    @Effect()
    effectAddTodoToPayload$ = this.updates$.whenAction(ADD_TODO)
                                .map<string>(toPayload)
                                .do(action => console.info('Effect payload :', ADD_TODO, action))
                                .filter(() => false);

    @Effect()
    effectAddTodoToPayloadFilter$ = this.updates$.whenAction(ADD_TODO)
                                .map<string>(toPayload)
                                .filter((payload: any) => payload.description == 'test')
                                .do(action => console.info('Effect payload filter :', ADD_TODO, action))
                                .filter(() => false);  

    @Effect()
    effectAddTodoToPayloadMergeMap$ = this.updates$.whenAction(ADD_TODO)
                                .map<string>(toPayload)
                                .mergeMap((payload: any) => Observable.of(`description : ${payload.description}`))
                                .do(text => console.info('Effect payload merge map :', ADD_TODO, text))
                                .filter(() => false);                          
    @Effect() 
    effectRemoveTodo$ = this.updates$.whenAction(REMOVE_TODO)
                            .do(action => console.info('Effect :', REMOVE_TODO, action))
                            .filter(() => false);

    @Effect() 
    effectToggleTodo$ = this.updates$.whenAction(TOGGLE_TODO)
                            .do(action => console.info('Effect :', TOGGLE_TODO, action))
                            .filter(() => false);
    
}