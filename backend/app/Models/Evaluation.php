<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;


class Evaluation extends Model
{


    protected $fillable = [

        'libelle',

        'date',

        'coefficient',

        'matiere_id'

    ];





    public function matiere()
    {

        return $this->belongsTo(
            Matiere::class
        );

    }






    public function notes()
    {

        return $this->hasMany(
            Note::class
        );

    }


}
