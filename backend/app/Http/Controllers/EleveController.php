<?php

namespace App\Http\Controllers;

use App\Models\Eleve;
use Illuminate\Http\Request;

class EleveController extends Controller
{
    /**
     * Afficher tous les élèves
     */
    public function index()
    {
        return response()->json(
            Eleve::with('classe')->get()
        );
    }


    /**
     * Créer un élève
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'date_naissance' => 'required|date',
            'classe_id' => 'required|exists:classes,id',
        ]);


        $eleve = Eleve::create($request->all());


        return response()->json([
            'message' => 'Élève créé avec succès',
            'eleve' => $eleve
        ], 201);
    }


    /**
     * Afficher un élève
     */
    public function show(Eleve $eleve)
    {
        return response()->json(
            $eleve->load('classe')
        );
    }


    /**
     * Modifier un élève
     */
    public function update(Request $request, Eleve $eleve)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'date_naissance' => 'required|date',
            'classe_id' => 'required|exists:classes,id',
        ]);


        $eleve->update($request->all());


        return response()->json([
            'message' => 'Élève modifié avec succès',
            'eleve' => $eleve
        ]);
    }


    /**
     * Supprimer un élève
     */
    public function destroy(Eleve $eleve)
    {
        $eleve->delete();


        return response()->json([
            'message' => 'Élève supprimé avec succès'
        ]);
    }


    /**
     * Calculer la moyenne d'un élève
     */
    public function moyenne($id)
    {
        $eleve = Eleve::with('notes.matiere')
            ->findOrFail($id);


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


        return response()->json([
            'eleve' => $eleve->nom . ' ' . $eleve->prenom,
            'moyenne' => round($moyenne, 2)
        ]);
    }
}