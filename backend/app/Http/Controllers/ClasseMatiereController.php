<?php

namespace App\Http\Controllers;

use App\Models\ClasseMatiere;
use Illuminate\Http\Request;


class ClasseMatiereController extends Controller
{


    /**
     * Afficher toutes les affectations
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
     * Créer une affectation
     */
    public function store(Request $request)
    {


        $request->validate([


            'classe_id' =>
            'required|exists:classes,id',


            'matiere_id' =>
            'required|exists:matieres,id',


            'enseignant_id' =>
            'required|exists:enseignants,id',


            'coefficient' =>
            'required|integer|min:1|max:10'


        ],
        [


            'classe_id.required' =>
            'La classe est obligatoire',


            'matiere_id.required' =>
            'La matière est obligatoire',


            'enseignant_id.required' =>
            'L’enseignant est obligatoire',


            'coefficient.required' =>
            'Le coefficient est obligatoire',


            'coefficient.integer' =>
            'Le coefficient doit être un nombre entier',


            'coefficient.min' =>
            'Le coefficient doit être au minimum 1',


            'coefficient.max' =>
            'Le coefficient ne peut pas dépasser 10'


        ]);







        $affectation = ClasseMatiere::create([


            'classe_id' =>
            $request->classe_id,


            'matiere_id' =>
            $request->matiere_id,


            'enseignant_id' =>
            $request->enseignant_id,


            'coefficient' =>
            $request->coefficient


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
        ClasseMatiere $classe_matiere
    )
    {


        $request->validate([


            'classe_id' =>
            'required|exists:classes,id',


            'matiere_id' =>
            'required|exists:matieres,id',


            'enseignant_id' =>
            'required|exists:enseignants,id',


            'coefficient' =>
            'required|integer|min:1|max:10'


        ]);







        $classe_matiere->update([


            'classe_id' =>
            $request->classe_id,


            'matiere_id' =>
            $request->matiere_id,


            'enseignant_id' =>
            $request->enseignant_id,


            'coefficient' =>
            $request->coefficient


        ]);







        return response()->json([


            'message' =>
            'Affectation modifiée avec succès',


            'affectation' =>
            $classe_matiere->load([
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
