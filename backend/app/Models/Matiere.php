<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Matiere extends Model
{

    protected $fillable = [

        'nom'

    ];





    /**
     * Classes qui utilisent cette matière
     */
    public function classes()
    {

        return $this->belongsToMany(

            Classe::class,

            'classe_matiere'

        )

        ->withPivot(

            'enseignant_id',

            'coefficient'

        )

        ->withTimestamps();

    }







    /**
     * Notes liées à cette matière
     */
    public function notes()
    {

        return $this->hasMany(

            Note::class

        );

    }







    /**
     * Enseignants qui enseignent cette matière
     */
    public function enseignants()
    {

        return $this->belongsToMany(

            Enseignant::class,

            'classe_matiere'

        )

        ->withPivot(

            'classe_id',

            'coefficient'

        )

        ->withTimestamps();

    }


}