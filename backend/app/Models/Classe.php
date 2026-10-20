<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Classe extends Model
{


    protected $fillable = [

        'nom',

        'niveau',

    ];





    /**
     * Une classe possède plusieurs élèves.
     */
    public function eleves()
    {

        return $this->hasMany(
            Eleve::class
        );

    }







    /**
     * Matières enseignées dans cette classe.
     */
    public function matieres()
    {

        return $this->belongsToMany(
            Matiere::class,
            'classe_matiere'
        )

        ->withPivot(
            'enseignant_id'
        )

        ->withTimestamps();

    }







    /**
     * Affectations classe-matière-enseignant.
     */
    public function affectations()
    {

        return $this->hasMany(
            ClasseMatiere::class
        );

    }



}