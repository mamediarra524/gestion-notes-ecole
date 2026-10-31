<?php

namespace App\Http\Controllers;


use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;





class AuthController extends Controller
{



    /**
     * Inscription utilisateur
     */
    public function register(Request $request)
    {


        $request->validate([


            'name'=>'required|string',


            'email'=>'required|email|unique:users,email',


            'password'=>'required|min:6',


            'role'=>'required|in:ADMIN,ENSEIGNANT'


        ]);








        $user = User::create([



            'name'=>$request->name,


            'email'=>$request->email,


            'password'=>Hash::make(
                $request->password
            ),


            'role'=>$request->role



        ]);








        $token = $user

            ->createToken('auth_token')

            ->plainTextToken;









        return response()->json([



            'message'=>'Utilisateur créé avec succès',




            'user'=>[


                'id'=>$user->id,


                'name'=>$user->name,


                'email'=>$user->email,


                'role'=>$user->role


            ],




            'token'=>$token



        ],201);



    }













    /**
     * Connexion utilisateur
     */
    public function login(Request $request)
    {


        $request->validate([



            'email'=>'required|email',


            'password'=>'required'



        ]);









        $user = User::where(

            'email',

            $request->email

        )->first();









        if(


            !$user ||


            !Hash::check(

                $request->password,

                $user->password

            )


        ){



            return response()->json([



                'message'=>'Email ou mot de passe incorrect'



            ],401);



        }









        // Supprimer les anciens tokens

        $user->tokens()->delete();









        // Nouveau token Sanctum

        $token = $user

            ->createToken('auth_token')

            ->plainTextToken;









        return response()->json([



            'message'=>'Connexion réussie',





            'user'=>[



                'id'=>$user->id,


                'name'=>$user->name,


                'email'=>$user->email,


                'role'=>$user->role



            ],





            'token'=>$token



        ]);



    }












    /**
     * Utilisateur connecté
     */
    public function user(Request $request)
    {


        return response()->json([



            'user'=>$request->user()



        ]);



    }












    /**
     * Déconnexion
     */
    public function logout(Request $request)
    {



        $request->user()

            ->tokens()

            ->delete();








        return response()->json([



            'message'=>'Déconnexion réussie'



        ]);



    }





}