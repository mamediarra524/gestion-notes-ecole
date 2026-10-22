import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

import { Eleves } from './pages/eleves/eleves';
import { Classes } from './pages/classes/classes';
import { Matieres } from './pages/matieres/matieres';
import { Notes } from './pages/notes/notes';
import { Enseignants } from './pages/enseignants/enseignants';
import { ClasseMatieres } from './pages/classe-matieres/classe-matieres';

import { authGuard } from './guards/auth-guard';



export const routes: Routes = [



  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },





  /*
  |--------------------------------------------------------------------------
  | Authentification
  |--------------------------------------------------------------------------
  */


  {
    path: 'login',
    component: Login
  },








  /*
  |--------------------------------------------------------------------------
  | Pages protégées
  |--------------------------------------------------------------------------
  */


  {
    path: 'dashboard',

    component: Dashboard,

    canActivate: [
      authGuard
    ]

  },




  {
    path: 'eleves',

    component: Eleves,

    canActivate: [
      authGuard
    ]

  },





  {
    path: 'classes',

    component: Classes,

    canActivate: [
      authGuard
    ]

  },






  {
    path: 'matieres',

    component: Matieres,

    canActivate: [
      authGuard
    ]

  },







  {
    path: 'enseignants',

    component: Enseignants,

    canActivate: [
      authGuard
    ]

  },







  {
    path: 'classe-matieres',

    component: ClasseMatieres,

    canActivate: [
      authGuard
    ]

  },







  {
    path: 'notes',

    component: Notes,

    canActivate: [
      authGuard
    ]

  }

];