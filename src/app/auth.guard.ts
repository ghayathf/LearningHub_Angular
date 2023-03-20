import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private toastr:ToastrService,private router:Router) {

  }
  gh:any
  loggedUser:any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    let user:any = localStorage.getItem('user')
    user = JSON.parse(user)


    if(token)
    {
      if(state.url.includes('Admin'))
      {
        if(user.RoleId == 1)
        {
          this.toastr.success('Welcome Admin '+user.Username)
          this.gh = parseInt(user.Userid)
          this.loggedUser = user
          return true
        }
        else
        {
          this.toastr.error("This page for Admin")
          this.router.navigate([''])
          return false
        }
      }
      else if(state.url.includes('Trainee'))
      {
        if(user.RoleId == 2)
        {
          this.toastr.success('Welcome Trainee '+user.Username)
          return true
        }
        else
        {
          this.toastr.error("This page for Trainee")
          this.router.navigate([''])
          return false
        }
      }
      else if(state.url.includes('Trainer'))
      {
        if(user.RoleId == 3)
        {
          this.toastr.success('Welcome Trainer '+user.Username)
          return true
        }
        else
        {
          this.toastr.error("This page for Trainer")
          this.router.navigate([''])
          return false
        }
      }
      return true
    }
    else{
      this.toastr.error("You Are Not Authorized")
      this.router.navigate([''])
      return false
    }
  }

}
