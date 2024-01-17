<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function store(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'is_active' => 'required',
            'phone_number' => 'required|digits:11|unique:users',

        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        // Create user
        $users = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_active' => $request->is_active,
            'phone_number' => $request->phone_number,
        ]);

        return response(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('Successfull')->accessToken;
            return response(['token' => $token], 200);
        } else {
            return response(['error' => 'Unauthorized'], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->revoke();

        return response(['message' => 'Logged out successfully'], 200);
    }

    public function index(){
        $users = User::all();
        if ($users->count() > 0){
            return response()->json([
                'status' => 200,
                'users' => $users
            ], 200);
        } else {

            return response()->json([
                'status' => 404,
                'message' => "No Record Found"
            ], 404);
        }
    }

    public function show($id)
    {
        $users = User::find($id);
        if ($users){

            return response()->json([
                "status" => 200,
                "user" => $users
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" =>"No Such user found"
            ], 404);
        }
    }

    public function edit($id)
    {
        $users = User::find($id);
        if ($users){

            return response()->json([
                "status" => 200,
                "user" => $users
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" =>"No Such user found"
            ], 404);
        }
    }

    public function update(Request $request, int $id){
        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:191',
            'is_active' => 'required',
            'phone_number' => 'required|digits:11',
        ]);


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else{
            $users = User::find($id);

            if ($users){
                $users->update([
                    'name' => $request->name,
                    'is_active' => $request->is_active,
                    'phone_number' => $request->phone_number,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "User Updated Successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "NO User found"
                ], 404);
            }
        }

    }

    public function destroy($id)
    {
        $users = User::find($id);
        if ($users){
            $users->delete();
            return response()->json([
                'status' => 200,
                'message' => "User Deleted"
            ], 200);
        } else  {
            return response()->json([
                'status' => 404,
                'message' => "NO User found"
            ], 404);
        }

    }
}

