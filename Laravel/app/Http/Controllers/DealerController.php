<?php

namespace App\Http\Controllers;

use App\Models\Dealer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DealerController extends Controller
{
    public function index()
    {
        $dealer = Dealer::all();
        if ($dealer->count() > 0){
            return response()->json([
                'status' => 200,
                'message' => $dealer
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'firstname' => "required|string",
            'lastname'=> "required|string",
            'address'=> "required|string",
            'email' => "required|email|unique:dealer",
            'phone'=> "required|digits:11|unique:dealer",
            'country'=>"required",
            'city' =>"required",
            'message' =>"required",
            'file' => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048"

        ]);

        $imagePath = $request->file('file')->store('dealer_images', 'public');

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();

        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $dealer = Dealer::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'country' => $request->country,
                'city' => $request->city,
                'message' => $request->message,
                'file' => $imagePath,
            ]);

            if ($dealer) {

                return response()->json([
                    'status' => 200,
                    'message' => "Dealer Added"
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Something went Wrong"
                ], 500);
            }
        }
    }

    public function show($id)
    {
        $dealer = Dealer::find($id);
        if ($dealer){
            return response()->json([
                'status' => 200,
                'message'=>$dealer
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

    public function edit($id)
    {
        $dealer = Dealer::find($id);
        if ($dealer){
            return response()->json([
                'status' => 200,
                'message'=>$dealer
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

    public function update(Request $request, Dealer $dealer, int $id)
    {
        $validator = Validator::make($request->all(), [

            'firstname' => "required|string",
            'lastname'=> "required|string",
            'address'=> "required|string",
            'email' => "required|email|unique:dealer,email," . $id,
            'phone'=> "required|digits:11|unique:dealer,email," .$id,
            'country'=>"required",
            'city' =>"required",
            'message' =>"required",
            'file' => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048"

        ]);

        $imagePath = $request->file('file')->store('dealer_images', 'public');

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {

            $dealer = Dealer::find($id);

            if ($dealer){
                $dealer->update([
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'address' => $request->address,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'country' => $request->country,
                    'city' => $request->city,
                    'message' => $request->message,
                    'file' => $imagePath,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Dealer Updated"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "No Dealer Found"
                ],404);
            }
        }
    }

    public function destroy($id)
    {
        $dealer = Dealer::find($id);
        if ($dealer){
            $dealer->delete();
            return response()->json([
                'status' => 200,
                'message' => "Dealer Deleted"
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

}
