import { Routes } from '@angular/router';


import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

import { Eleves } from './pages/eleves/eleves';
import { Classes } from './pages/classes/classes';
import { Matieres } from './pages/matieres/matieres';
import { Notes } from './pages/notes/notes';
import { Enseignants } from './pages/enseignants/enseignants';
import { ClasseMatieres } from './pages/classe-matieres/classe-matieres';

import { Statistiques } from './pages/statistiques/statistiques';

import { NotFound } from './pages/not-found/not-found';

import { authGuard } from './guards/auth-guard';



export const routes: Routes = [



  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },





  // Connexion

  {
    path: 'login',
    component: Login
  },









  // Dashboard principal


  {
    path: 'dashboard',
    component: Dashboard,
    canActivate:[
      authGuard
    ]
  },









  // Élèves


  {
    path:'eleves',
    component:Eleves,
    canActivate:[
      authGuard
    ]
  },









  // Classes


  {
    path:'classes',
    component:Classes,
    canActivate:[
      authGuard
    ]
  },









  // Matières


  {
    path:'matieres',
    component:Matieres,
    canActivate:[
      authGuard
    ]
  },









  // Enseignants


  {
    path:'enseignants',
    component:Enseignants,
    canActivate:[
      authGuard
    ]
  },









  // Affectations


  {
    path:'classe-matieres',
    component:ClasseMatieres,
    canActivate:[
      authGuard
    ]
  },









  // Notes


  {
    path:'notes',
    component:Notes,
    canActivate:[
      authGuard
    ]
  },









  // Statistiques


  {
    path:'statistiques',
    component:Statistiques,
    canActivate:[
      authGuard
    ]
  },









  // Page inexistante


  {
    path:'**',
    component:NotFound
  }



];