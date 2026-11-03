<?php

namespace App\Http\Controllers;

use App\Models\ClasseMatiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ClasseMatiereController extends Controller
{


    /**
     * Liste des affectations
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

                'message' =>
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
     * Ajouter une affectation
     */
    public function store(Request $request)
    {


        $data = $request->validate([


            'classe_id' =>

            'required|exists:classes,id',



            'matiere_id' =>

            'required|exists:matieres,id',



            'enseignant_id' =>

            'required|exists:enseignants,id',



            'coefficient' =>

            'required|integer|min:1|max:10'


        ]);








        $affectation = ClasseMatiere::create([


            'classe_id' =>

            $data['classe_id'],



            'matiere_id' =>

            $data['matiere_id'],



            'enseignant_id' =>

            $data['enseignant_id'],



            'coefficient' =>

            $data['coefficient']


        ]);









        return response()->json([


            'message' =>

            'Affectation créée avec succès',



            'affectation' =>

            $affectation->load([

                'classe',

                'matiere',

                'enseignant'

            ])


        ],201);


    }









    /**
     * Voir une affectation
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

        ClasseMatiere $classe_matiere

    )
    {


        $data = $request->validate([


            'classe_id' =>

            'required|exists:classes,id',



            'matiere_id' =>

            'required|exists:matieres,id',



            'enseignant_id' =>

            'required|exists:enseignants,id',



            'coefficient' =>

            'required|integer|min:1|max:10'


        ]);









        $classe_matiere->classe_id =

        $data['classe_id'];



        $classe_matiere->matiere_id =

        $data['matiere_id'];



        $classe_matiere->enseignant_id =

        $data['enseignant_id'];



        $classe_matiere->coefficient =

        $data['coefficient'];





        $classe_matiere->save();









        return response()->json([


            'message' =>

            'Affectation modifiée avec succès',



            'affectation' =>

            $classe_matiere

            ->fresh()

            ->load([

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


            'message' =>

            'Affectation supprimée avec succès'


        ]);


    }


}
