<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    /**
     * Afficher toutes les classes
     */
    public function index()
    {
        return response()->json(
            Classe::all()
        );
    }


    /**
     * Créer une classe
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'niveau' => 'required|string'
        ]);


        $classe = Classe::create([
            'nom' => $request->nom,
            'niveau' => $request->niveau
        ]);


        return response()->json([
            'message' => 'Classe créée avec succès',
            'classe' => $classe
        ], 201);
    }


    /**
     * Afficher une classe
     */
    public function show(Classe $classe)
    {
        return response()->json(
            $classe->load('eleves')
        );
    }


    /**
     * Modifier une classe
     */
    public function update(Request $request, Classe $classe)
    {
        $request->validate([
            'nom' => 'required|string',
            'niveau' => 'required|string'
        ]);


        $classe->update([
            'nom' => $request->nom,
            'niveau' => $request->niveau
        ]);


        return response()->json([
            'message' => 'Classe modifiée avec succès',
            'classe' => $classe
        ]);
    }


    /**
     * Supprimer une classe
     */
    public function destroy(Classe $classe)
    {
        $classe->delete();


        return response()->json([
            'message' => 'Classe supprimée avec succès'
        ]);
    }


    /**
     * Moyenne générale d'une classe
     */
    public function moyenne($id)
    {
        $classe = Classe::with('eleves.notes.matiere')
            ->findOrFail($id);


        $totalPoints = 0;
        $totalCoefficients = 0;


        foreach ($classe->eleves as $eleve) {

            foreach ($eleve->notes as $note) {

                $coefficient = $note->matiere->coefficient;

                $totalPoints += $note->note * $coefficient;

                $totalCoefficients += $coefficient;
            }
        }


        $moyenne = 0;


        if ($totalCoefficients > 0) {

            $moyenne = $totalPoints / $totalCoefficients;

        }


        return response()->json([
            'classe' => $classe->nom,
            'moyenne_classe' => round($moyenne, 2)
        ]);
    }



    /**
     * Classement des élèves d'une classe
     */
    public function classement($id)
    {
        $classe = Classe::with('eleves.notes.matiere')
            ->findOrFail($id);


        $classement = [];


        foreach ($classe->eleves as $eleve) {

            $totalPoints = 0;
            $totalCoefficients = 0;


            foreach ($eleve->notes as $note) {

                $coefficient = $note->matiere->coefficient;

                $totalPoints += $note->note * $coefficient;

                $totalCoefficients += $coefficient;
            }


            $moyenne = 0;


            if ($totalCoefficients > 0) {

                $moyenne = $totalPoints / $totalCoefficients;

            }


            $classement[] = [
                'nom' => $eleve->nom,
                'prenom' => $eleve->prenom,
                'moyenne' => round($moyenne, 2)
            ];
        }


        // Tri décroissant
        usort($classement, function ($a, $b) {

            return $b['moyenne'] <=> $a['moyenne'];

        });


        // Ajout du rang
        foreach ($classement as $index => &$eleve) {

            $eleve['rang'] = $index + 1;

        }


        return response()->json($classement);
    }
}