<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use Illuminate\Http\Request;

class EnseignantController extends Controller
{
    /**
     * Afficher tous les enseignants
     */
    public function index()
    {
        return response()->json(
            Enseignant::all()
        );
    }


    /**
     * Créer un enseignant
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:enseignants,email',
            'telephone' => 'nullable|string'
        ]);


        $enseignant = Enseignant::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone
        ]);


        return response()->json([
            'message' => 'Enseignant créé avec succès',
            'enseignant' => $enseignant
        ], 201);
    }


    /**
     * Afficher un enseignant
     */
    public function show(Enseignant $enseignant)
    {
        return response()->json(
            $enseignant
        );
    }


    /**
     * Modifier un enseignant
     */
    public function update(Request $request, Enseignant $enseignant)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:enseignants,email,' . $enseignant->id,
            'telephone' => 'nullable|string'
        ]);


        $enseignant->update([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone
        ]);


        return response()->json([
            'message' => 'Enseignant modifié avec succès',
            'enseignant' => $enseignant
        ]);
    }


    /**
     * Supprimer un enseignant
     */
    public function destroy(Enseignant $enseignant)
    {
        $enseignant->delete();


        return response()->json([
            'message' => 'Enseignant supprimé avec succès'
        ]);
    }
}