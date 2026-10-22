<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\ClasseMatiereController;
use App\Http\Controllers\BulletinController;
use App\Http\Controllers\DashboardController;





/*
|--------------------------------------------------------------------------
| AUTHENTIFICATION
|--------------------------------------------------------------------------
*/


Route::post(
    '/register',
    [AuthController::class,'register']
);



Route::post(
    '/login',
    [AuthController::class,'login']
);









/*
|--------------------------------------------------------------------------
| ROUTES PROTEGEES
|--------------------------------------------------------------------------
*/


Route::middleware('auth:sanctum')->group(function(){





    /*
    |--------------------------------------------------------------------------
    | Utilisateur connecté
    |--------------------------------------------------------------------------
    */


    Route::get(
        '/user',
        function(Request $request){

            return $request->user();

        }
    );









    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    |
    | ADMIN + ENSEIGNANT
    |
    */


    Route::get(

        '/dashboard',

        [
            DashboardController::class,
            'index'
        ]

    );









    /*
    |--------------------------------------------------------------------------
    | ADMINISTRATION
    |--------------------------------------------------------------------------
    */


    Route::middleware('role:ADMIN')->group(function(){



        /*
        |--------------------------------------------------------------------------
        | Classes
        |--------------------------------------------------------------------------
        */


        Route::apiResource(

            'classes',

            ClasseController::class

        )

        ->parameters([

            'classes'=>'classe'

        ]);





        Route::get(

            'classes/{id}/moyenne',

            [

                ClasseController::class,

                'moyenne'

            ]

        );





        Route::get(

            'classes/{id}/classement',

            [

                ClasseController::class,

                'classement'

            ]

        );









        /*
        |--------------------------------------------------------------------------
        | Élèves
        |--------------------------------------------------------------------------
        */


        Route::apiResource(

            'eleves',

            EleveController::class

        )

        ->parameters([

            'eleves'=>'eleve'

        ]);





        Route::get(

            'eleves/{id}/moyenne',

            [

                EleveController::class,

                'moyenne'

            ]

        );









        /*
        |--------------------------------------------------------------------------
        | Matières
        |--------------------------------------------------------------------------
        */


        Route::apiResource(

            'matieres',

            MatiereController::class

        )

        ->parameters([

            'matieres'=>'matiere'

        ]);









        /*
        |--------------------------------------------------------------------------
        | Enseignants
        |--------------------------------------------------------------------------
        */


        Route::apiResource(

            'enseignants',

            EnseignantController::class

        )

        ->parameters([

            'enseignants'=>'enseignant'

        ]);









        /*
        |--------------------------------------------------------------------------
        | Affectations Classe - Matière - Enseignant
        |--------------------------------------------------------------------------
        */


        Route::apiResource(

            'classe-matieres',

            ClasseMatiereController::class

        )

        ->parameters([

            'classe-matieres'=>'classe_matiere'

        ]);




    });









    /*
    |--------------------------------------------------------------------------
    | NOTES
    |--------------------------------------------------------------------------
    |
    | ADMIN + ENSEIGNANT
    |
    */


    Route::apiResource(

        'notes',

        NoteController::class

    )

    ->parameters([

        'notes'=>'note'

    ]);









    /*
    |--------------------------------------------------------------------------
    | BULLETINS
    |--------------------------------------------------------------------------
    |
    | ADMIN + ENSEIGNANT
    |
    */


    Route::get(

        'eleves/{id}/bulletin',

        [

            BulletinController::class,

            'show'

        ]

    );





    Route::get(

        'eleves/{id}/bulletin/pdf',

        [

            BulletinController::class,

            'pdf'

        ]

    );









    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */


    Route::post(

        '/logout',

        [

            AuthController::class,

            'logout'

        ]

    );



});