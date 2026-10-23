<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class Eleve extends Model
{

    use HasFactory;



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







    /**
     * Un élève possède plusieurs bulletins.
     */
    public function bulletins()
    {

        return $this->hasMany(

            Bulletin::class

        );

    }







    /**
     * Matières suivies par l'élève
     * via sa classe
     * avec coefficient et enseignant
     */
    public function matieres()
    {

        return $this->classe()

            ->with([

                'matieres'

            ]);

    }



}