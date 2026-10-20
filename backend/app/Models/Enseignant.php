<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
     * Un enseignant appartient à un compte utilisateur.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Un enseignant peut enseigner plusieurs matières
     * dans plusieurs classes.
     */
    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'classe_matiere')
            ->withPivot('matiere_id')
            ->withTimestamps();
    }


    /**
     * Les affectations de l'enseignant.
     *
     * Exemple :
     * Moussa → 6ème B → Mathématiques
     */
    public function affectations()
    {
        return $this->hasMany(ClasseMatiere::class);
    }


    /**
     * Notes saisies par l'enseignant.
     */
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}