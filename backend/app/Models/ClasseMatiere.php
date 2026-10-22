<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ClasseMatiere extends Model
{

    protected $table = 'classe_matiere';




    protected $fillable = [

        'classe_id',

        'matiere_id',

        'enseignant_id',

        'coefficient'

    ];







    /**
     * Classe associée
     */
    public function classe()
    {

        return $this->belongsTo(

            Classe::class

        );

    }







    /**
     * Matière associée
     */
    public function matiere()
    {

        return $this->belongsTo(

            Matiere::class

        );

    }







    /**
     * Enseignant associé
     */
    public function enseignant()
    {

        return $this->belongsTo(

            Enseignant::class

        );

    }


}