<?php

namespace App\Http\Controllers;

use App\Models\Matiere;
use Illuminate\Http\Request;


class MatiereController extends Controller
{


    /**
     * Afficher toutes les matières
     */
    public function index()
    {

        return response()->json(

            Matiere::all()

        );

    }







    /**
     * Créer une matière
     */
    public function store(Request $request)
    {


        $request->validate([


            'nom' => 'required|string|max:100'


        ],
        [


            'nom.required' =>
            'Le nom de la matière est obligatoire',


            'nom.string' =>
            'Le nom doit être un texte',


            'nom.max' =>
            'Le nom ne peut pas dépasser 100 caractères'


        ]);







        $matiere = Matiere::create([


            'nom' => $request->nom


        ]);








        return response()->json([


            'message' =>
            'Matière créée avec succès',


            'matiere' =>
            $matiere


        ],201);



    }









    /**
     * Afficher une matière
     */
    public function show(Matiere $matiere)
    {


        return response()->json(

            $matiere

        );


    }









    /**
     * Modifier une matière
     */
    public function update(Request $request, Matiere $matiere)
    {


        $request->validate([


            'nom' => 'required|string|max:100'


        ],
        [


            'nom.required' =>
            'Le nom de la matière est obligatoire',


            'nom.string' =>
            'Le nom doit être un texte',


            'nom.max' =>
            'Le nom ne peut pas dépasser 100 caractères'


        ]);








        $matiere->update([


            'nom' => $request->nom


        ]);








        return response()->json([


            'message' =>
            'Matière modifiée avec succès',


            'matiere' =>
            $matiere


        ]);



    }









    /**
     * Supprimer une matière
     */
    public function destroy(Matiere $matiere)
    {


        $matiere->delete();




        return response()->json([


            'message' =>
            'Matière supprimée avec succès'


        ]);



    }



}