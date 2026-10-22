<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class Note extends Model
{

    use HasFactory;



    protected $fillable = [

        'eleve_id',

        'matiere_id',

        'enseignant_id',

        'note'

    ];





    protected $casts = [

        'note' => 'decimal:2'

    ];







    /**
     * Une note appartient à un élève.
     */
    public function eleve()
    {

        return $this->belongsTo(
            Eleve::class
        );

    }







    /**
     * Une note appartient à une matière.
     */
    public function matiere()
    {

        return $this->belongsTo(
            Matiere::class
        );

    }







    /**
     * Une note est saisie par un enseignant.
     */
    public function enseignant()
    {

        return $this->belongsTo(
            Enseignant::class
        );

    }



}