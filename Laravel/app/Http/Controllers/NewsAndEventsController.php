<?php

namespace App\Http\Controllers;

use App\Models\NewsAndEvents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsAndEventsController extends Controller
{
    public function index()
    {
        $newsandevents = NewsAndEvents::all();
        if ($newsandevents->count() > 0){
            return response()->json([
                'status' => 200,
                'message' => $newsandevents
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

            'title' => "required|string",
            'short_description'=> "required|string",
            'long_description'=> "required|string",
            'is_active'=> "required",
            'image' => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048"

        ]);

        $imagePath = $request->file('image')->store('newsandevents_images', 'public');

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();

        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $newsandevents = NewsAndEvents::create([
                'title' => $request->title,
                'short_description' => $request->short_description,
                'long_description' => $request->long_description,
                'is_active' => $request->is_active,
                'image' => $imagePath,
            ]);

            if ($newsandevents) {

                return response()->json([
                    'status' => 200,
                    'message' => "NewsAndEvents Added"
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
        $newsandevents = NewsAndEvents::find($id);
        if ($newsandevents){
            return response()->json([
                'status' => 200,
                'message'=>$newsandevents
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
        $newsandevents = NewsAndEvents::find($id);
        if ($newsandevents){
            return response()->json([
                'status' => 200,
                'message'=>$newsandevents
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

    public function update(Request $request, NewsAndEvents $newsandevents, int $id)
    {
        $validator = Validator::make($request->all(), [

            'title' => "required|string",
            'short_description'=> "required|string",
            'long_description'=> "required|string",
            'is_active'=> "required",
            'image' => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048"

        ]);

        $imagePath = $request->file('image')->store('newsandevents_images', 'public');

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {

            $newsandevents = NewsAndEvents::find($id);

            if ($newsandevents){
                $newsandevents->update([
                    'title' => $request->title,
                    'short_description' => $request->short_description,
                    'long_description' => $request->long_description,
                    'is_active' => $request->is_active,
                    'image' => $imagePath,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "NewsAndEvents Updated"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "No NewsAndEvents Found"
                ],404);
            }
        }
    }

    public function destroy($id)
    {
        $newsandevents = NewsAndEvents::find($id);
        if ($newsandevents){
            $newsandevents->delete();
            return response()->json([
                'status' => 200,
                'message' => "NewsAndEvents Deleted"
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

}
