<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bulletin extends Model
{

    protected $fillable = [

        'eleve_id',

        'semestre',

        'moyenne_generale',

        'rang',

        'appreciation'

    ];





    protected $casts = [

        'moyenne_generale' => 'float',

    ];





    /**
     * Un bulletin appartient à un élève
     */
    public function eleve()
    {

        return $this->belongsTo(
            Eleve::class
        );

    }


}