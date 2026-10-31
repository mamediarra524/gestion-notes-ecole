import { Routes } from '@angular/router';


import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

import { Eleves } from './pages/eleves/eleves';
import { Classes } from './pages/classes/classes';
import { Matieres } from './pages/matieres/matieres';
import { Notes } from './pages/notes/notes';
import { Enseignants } from './pages/enseignants/enseignants';
import { ClasseMatieres } from './pages/classe-matieres/classe-matieres';
import { Evaluations } from './pages/evaluations/evaluations';

import { Statistiques } from './pages/statistiques/statistiques';
import { Bulletins } from './pages/bulletins/bulletins';

import { NotFound } from './pages/not-found/not-found';


import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role.guard';





export const routes: Routes = [



// ==========================
// REDIRECTION
// ==========================


{
path:'',
redirectTo:'login',
pathMatch:'full'
},







// ==========================
// CONNEXION
// ==========================


{
path:'login',
component:Login
},







// ==========================
// DASHBOARD
// ==========================


{
path:'dashboard',

component:Dashboard,

canActivate:[

authGuard

]

},







// ==========================
// ADMINISTRATION
// ==========================


{
path:'classes',

component:Classes,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},






{
path:'eleves',

component:Eleves,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},






{
path:'matieres',

component:Matieres,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},







{
path:'enseignants',

component:Enseignants,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},







{
path:'classe-matieres',

component:ClasseMatieres,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},







{
path:'evaluations',

component:Evaluations,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},







// ==========================
// NOTES ENSEIGNANT
// ==========================


{
path:'notes',

component:Notes,

canActivate:[

authGuard,

roleGuard([

'ENSEIGNANT'

])

]

},







// ==========================
// BULLETINS ADMIN UNIQUEMENT
// ==========================


{
path:'bulletins',

component:Bulletins,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},







// ==========================
// STATISTIQUES ADMIN
// ==========================


{
path:'statistiques',

component:Statistiques,

canActivate:[

authGuard,

roleGuard([

'ADMIN'

])

]

},







// ==========================
// PAGE NON TROUVEE
// ==========================


{
path:'**',

component:NotFound

}



];