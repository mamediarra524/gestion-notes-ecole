<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Un utilisateur non connecté ne peut pas consulter les notes.
     */
    public function test_un_utilisateur_non_connecte_ne_peut_pas_acceder_aux_notes(): void
    {
        $response = $this->getJson('/api/notes');

        $response->assertUnauthorized();
    }

    /**
     * Un enseignant ne peut pas gérer les classes.
     */
    public function test_un_enseignant_ne_peut_pas_acceder_aux_classes_admin(): void
    {
        $enseignant = User::factory()->create([
            'role' => 'ENSEIGNANT',
        ]);

        $this->actingAs($enseignant, 'sanctum');

        $response = $this->getJson('/api/classes');

        $response->assertForbidden();
    }

    /**
     * Un administrateur ne peut pas accéder aux affectations réservées
     * aux enseignants.
     */
    public function test_un_administrateur_ne_peut_pas_acceder_aux_affectations_enseignant(): void
    {
        $admin = User::factory()->create([
            'role' => 'ADMIN',
        ]);

        $this->actingAs($admin, 'sanctum');

        $response = $this->getJson('/api/mes-affectations');

        $response->assertForbidden();
    }
}
