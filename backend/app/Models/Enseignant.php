<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Classe;
use App\Models\ClasseMatiere;
use App\Models\Note;


class Enseignant extends Model
{


    protected $fillable = [

        'nom',
        'prenom',
        'email',
        'telephone',
        'user_id'

    ];







    /**
     * Un enseignant possède un compte utilisateur.
     */
    public function user()
    {

        return $this->belongsTo(
            User::class
        );

    }








    /**
     * Classes enseignées.
     *
     * Relation N-N :
     * Enseignant -> Classe
     * via classe_matiere
     */
    public function classes()
    {

        return $this->belongsToMany(

            Classe::class,

            'classe_matiere'

        )

        ->withPivot([

            'matiere_id',
            'coefficient'

        ])

        ->withTimestamps();

    }








    /**
     * Affectations enseignant / classe / matière
     */
    public function affectations()
    {

        return $this->hasMany(

            ClasseMatiere::class,

            'enseignant_id'

        );

    }








    /**
     * Notes saisies par l'enseignant
     */
    public function notes()
    {

        return $this->hasMany(

            Note::class,

            'enseignant_id'

        );

    }


}