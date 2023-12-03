import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { tap, mergeMap, catchError, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((res) => {
            if(!res.accessToken){
              alert(res.message)
            }
            if(res.accessToken){
              return AuthActions.loginSuccess({ token: res.accessToken, user: res.user })
            }
            return AuthActions.loginSuccess({ token: "", user: {userID: "", username: "", email: "", role:""} })
          }),
          catchError((error) => of(AuthActions.loginFailure()))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token, user }) => {
          if (isPlatformBrowser(this.platformId)) {
            if(token){
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/']);
              alert(`Welcome to Read Right, Mr. ${user.username.toUpperCase()}`);
            }
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
}