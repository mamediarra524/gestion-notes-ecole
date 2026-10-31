<?php

namespace App\Http\Controllers;

use App\Models\ClasseMatiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ClasseMatiereController extends Controller
{


    /**
     * Afficher toutes les affectations
     * ADMIN
     */
    public function index()
    {

        return response()->json(

            ClasseMatiere::with([

                'classe',
                'matiere',
                'enseignant'

            ])->get()

        );

    }







    /**
     * Affectations de l'enseignant connecté
     */
    public function mesAffectations()
    {


        $user = Auth::user();



        $enseignant = $user->enseignant;



        if(!$enseignant)
        {

            return response()->json([


                'message'=>
                'Aucun enseignant associé à ce compte.'


            ],403);


        }







        $affectations = ClasseMatiere::with([


            'classe',

            'matiere'


        ])

        ->where(


            'enseignant_id',


            $enseignant->id


        )

        ->get();








        return response()->json($affectations);


    }









    /**
     * Créer une affectation
     */
    public function store(Request $request)
    {


        $request->validate([


            'classe_id'=>

            'required|exists:classes,id',



            'matiere_id'=>

            'required|exists:matieres,id',



            'enseignant_id'=>

            'required|exists:enseignants,id',



            'coefficient'=>

            'required|integer|min:1|max:10'


        ]);








        $affectation = ClasseMatiere::create([



            'classe_id'=>

            $request->classe_id,



            'matiere_id'=>

            $request->matiere_id,



            'enseignant_id'=>

            $request->enseignant_id,



            'coefficient'=>

            $request->coefficient



        ]);









        return response()->json([


            'message'=>

            'Affectation créée avec succès',



            'affectation'=>

            $affectation->load([


                'classe',

                'matiere',

                'enseignant'


            ])



        ],201);


    }









    /**
     * Afficher une affectation
     */
    public function show(ClasseMatiere $classe_matiere)
    {


        return response()->json(


            $classe_matiere->load([


                'classe',

                'matiere',

                'enseignant'


            ])


        );


    }









    /**
     * Modifier une affectation
     */
    public function update(

        Request $request,

        ClasseMatiere $classe_matière

    )
    {


        $request->validate([



            'classe_id'=>

            'required|exists:classes,id',



            'matiere_id'=>

            'required|exists:matieres,id',



            'enseignant_id'=>

            'required|exists:enseignants,id',



            'coefficient'=>

            'required|integer|min:1|max:10'



        ]);









        $classe_matière->update([



            'classe_id'=>

            $request->classe_id,



            'matiere_id'=>

            $request->matiere_id,



            'enseignant_id'=>

            $request->enseignant_id,



            'coefficient'=>

            $request->coefficient



        ]);









        return response()->json([



            'message'=>

            'Affectation modifiée avec succès',



            'affectation'=>

            $classe_matière->load([


                'classe',

                'matiere',

                'enseignant'


            ])



        ]);



    }









    /**
     * Supprimer une affectation
     */
    public function destroy(ClasseMatiere $classe_matiere)
    {


        $classe_matiere->delete();




        return response()->json([


            'message'=>

            'Affectation supprimée avec succès'


        ]);


    }


}
