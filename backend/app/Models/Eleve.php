<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Eleve extends Model
{

    protected $fillable = [

        'nom',

        'prenom',

        'date_naissance',

        'classe_id',

    ];





    protected $casts = [

        'date_naissance' => 'date'

    ];







    /**
     * Un élève appartient à une classe.
     */
    public function classe()
    {

        return $this->belongsTo(
            Classe::class
        );

    }







    /**
     * Un élève possède plusieurs notes.
     */
    public function notes()
    {

        return $this->hasMany(
            Note::class
        );

    }



}