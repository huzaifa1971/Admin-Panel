<?php

namespace App\Http\Controllers;

use App\Models\BergerPaintsVideos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BergerPaintsVideosController extends Controller
{
    public function index()
    {
        $bergerpaintsvideos = BergerPaintsVideos::all();
        if ($bergerpaintsvideos->count() > 0){
            return response()->json([
                'status' => 200,
                'message' => $bergerpaintsvideos
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
            'description'=> "required|string",
            'file'=> "required|file|mimes:mp4,mov,avi",
            'is_active' => "required",

        ]);

        $videoPath = $request->file('file')->store('bergerpaintsvideos', 'public');

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();

        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $bergerpaintsvideos = BergerPaintsVideos::create([
                'title' => $request->title,
                'description' => $request->description,
                'is_active' => $request->is_active,
                'file' => $videoPath,

            ]);

            if ($bergerpaintsvideos) {

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
        $bergerpaintsvideos = BergerPaintsVideos::find($id);
        if ($bergerpaintsvideos){
            return response()->json([
                'status' => 200,
                'message'=>$bergerpaintsvideos
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
        $bergerpaintsvideos = BergerPaintsVideos::find($id);
        if ($bergerpaintsvideos){
            return response()->json([
                'status' => 200,
                'message'=>$bergerpaintsvideos
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [

            'title' => "required|string",
            'description'=> "required|string",
            'file'=> "required|file|mimes:mp4,mov,avi",
            'is_active' => "required",

        ]);
        $bergerpaintsvideos = BergerPaintsVideos::find($id);

        $videoPath = $request->file('file')->store('bergerpaintsvideos', 'public');

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();

        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {

            $bergerpaintsvideos = BergerPaintsVideos::find($id);

            if ($bergerpaintsvideos){
                $bergerpaintsvideos->update([
                    'title' => $request->title,
                    'description' => $request->description,
                    'is_active' => $request->is_active,
                    'file' => $videoPath,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Video Updated"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "No Video Found"
                ],404);
            }
        }
    }

    public function destroy($id)
    {
        $bergerpaintsvideos = BergerPaintsVideos::find($id);
        if ($bergerpaintsvideos){
            $bergerpaintsvideos->delete();
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
