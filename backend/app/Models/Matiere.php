<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Matiere extends Model
{

    protected $fillable = [

        'nom',

        'coefficient'

    ];





    /**
     * Classes qui suivent cette matière
     */
    public function classes()
    {

        return $this->belongsToMany(
            Classe::class,
            'classe_matiere'
        )

        ->withPivot(
            'enseignant_id'
        )

        ->withTimestamps();

    }







    /**
     * Notes de cette matière
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
            'classe_id'
        )

        ->withTimestamps();

    }



}