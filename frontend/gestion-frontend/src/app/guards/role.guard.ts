import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth';



export const roleGuard = (
  roles: string[]
): CanActivateFn => {


  return () => {


    const authService = inject(AuthService);

    const router = inject(Router);



    const user = authService.getUser();





    if(!user){


      router.navigate([
        '/login'
      ]);


      return false;


    }





    if(
      roles.includes(user.role)
    ){


      return true;


    }





    router.navigate([

      '/dashboard'

    ]);


    return false;


  };


};