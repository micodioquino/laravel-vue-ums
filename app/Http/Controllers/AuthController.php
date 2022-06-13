<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {

        $data = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        $username_parts = array_filter(explode(" ", strtolower($data['firstname'] . " " . $data['lastname'])));
        $username_parts = array_slice($username_parts, 0, 2);
        $firstname = (!empty($username_parts[0]))?substr($username_parts[0], 0,1):"";
        $lastname = (!empty($username_parts[1]))?substr($username_parts[1], 0,15):"";
        $number = (100000)?rand(1, 100000):""; 

        $username = $firstname . '.' . $lastname. $number;

        $user = User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            "username" => $username,
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',

            ],
            'remember' => 'boolean'
        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember)){
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;


        return response([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function logout()
    {

        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);

    }

}
