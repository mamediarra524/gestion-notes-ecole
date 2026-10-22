<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;


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
     * Un enseignant est lié à un compte utilisateur.
     */
    public function user()
    {

        return $this->belongsTo(
            User::class
        );

    }








    /**
     * Classes et matières enseignées.
     *
     * Relation N-N via classe_matiere
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
     * Affectations complètes :
     *
     * Classe
     * Matière
     * Enseignant
     */
    public function affectations()
    {

        return $this->hasMany(

            ClasseMatiere::class

        );

    }








    /**
     * Notes saisies par cet enseignant.
     */
    public function notes()
    {

        return $this->hasMany(

            Note::class

        );

    }


}