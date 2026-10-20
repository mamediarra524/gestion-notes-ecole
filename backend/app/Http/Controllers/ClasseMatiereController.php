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

            'classe_id' => 'required|exists:classes,id',

            'matiere_id' => 'required|exists:matieres,id',

            'enseignant_id' => 'required|exists:enseignants,id',

        ]);


        $affectation = ClasseMatiere::create([

            'classe_id' => $request->classe_id,

            'matiere_id' => $request->matiere_id,

            'enseignant_id' => $request->enseignant_id,

        ]);


        return response()->json([

            'message' => 'Affectation créée avec succès',

            'affectation' => $affectation

        ], 201);

    }




    /**
     * Afficher une affectation
     */
    public function show(ClasseMatiere $classeMatiere)
    {
        return response()->json(

            $classeMatiere->load([
                'classe',
                'matiere',
                'enseignant'
            ])

        );
    }





    /**
     * Modifier une affectation
     */
    public function update(Request $request, ClasseMatiere $classeMatiere)
    {

        $request->validate([

            'classe_id' => 'required|exists:classes,id',

            'matiere_id' => 'required|exists:matieres,id',

            'enseignant_id' => 'required|exists:enseignants,id',

        ]);



        $classeMatiere->update([

            'classe_id' => $request->classe_id,

            'matiere_id' => $request->matiere_id,

            'enseignant_id' => $request->enseignant_id,

        ]);



        return response()->json([

            'message' => 'Affectation modifiée avec succès',

            'affectation' => $classeMatiere

        ]);

    }





    /**
     * Supprimer une affectation
     */
    public function destroy(ClasseMatiere $classeMatiere)
    {

        $classeMatiere->delete();


        return response()->json([

            'message' => 'Affectation supprimée avec succès'

        ]);

    }

}
