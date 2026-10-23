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

import { Bulletins } from './pages/bulletins/bulletins';

import { NotFound } from './pages/not-found/not-found';

import { authGuard } from './guards/auth-guard';




export const routes: Routes = [



  /*
  ==========================
  REDIRECTION
  ==========================
  */


  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },









  /*
  ==========================
  CONNEXION
  ==========================
  */


  {
    path:'login',
    component:Login
  },









  /*
  ==========================
  DASHBOARD
  ==========================
  */


  {
    path:'dashboard',
    component:Dashboard,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  ELEVES
  ==========================
  */


  {
    path:'eleves',
    component:Eleves,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  CLASSES
  ==========================
  */


  {
    path:'classes',
    component:Classes,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  MATIERES
  ==========================
  */


  {
    path:'matieres',
    component:Matieres,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  ENSEIGNANTS
  ==========================
  */


  {
    path:'enseignants',
    component:Enseignants,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  AFFECTATIONS
  ==========================
  */


  {
    path:'classe-matieres',
    component:ClasseMatieres,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  NOTES
  ==========================
  */


  {
    path:'notes',
    component:Notes,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  BULLETINS
  ==========================
  */


  {
    path:'bulletins',
    component:Bulletins,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  STATISTIQUES
  ==========================
  */


  {
    path:'statistiques',
    component:Statistiques,
    canActivate:[
      authGuard
    ]
  },









  /*
  ==========================
  PAGE NON TROUVEE
  ==========================
  */


  {
    path:'**',
    component:NotFound
  }



];