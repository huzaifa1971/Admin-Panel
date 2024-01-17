<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class FAQController extends Controller
{

    public function index(){
        $faq = FAQ::all();
        if ($faq->count() > 0){
            return response()->json([
                'status' => 200,
                'FAQ' => $faq
            ], 200);
        } else {

            return response()->json([
                'status' => 404,
                'message' => "No Record Found"
            ], 404);
        }



    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [

            'question' => 'required|string',
            'answer' => 'required|string',
            'is_active' => 'required',
        ]);


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else{
            $faq = FAQ::create([
                'question' => $request->question,
                'answer' => $request->answer,
                'is_active' => $request->is_active,

            ]);

            if ($faq){

                return response()->json([
                    'status' => 200,
                    'message' => "FAQ Created Successfully"
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
        $faq = FAQ::find($id);
        if ($faq){

            return response()->json([
                "status" => 200,
                "faq" => $faq
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" =>"No Such faq found"
            ], 404);
        }
    }

    public function edit($id)
    {
        $faq = FAQ::find($id);
        if ($faq){

            return response()->json([
                "status" => 200,
                "faq" => $faq
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" =>"No Such faq found"
            ], 404);
        }
    }

    public function update(Request $request, int $id){
        $validator = Validator::make($request->all(), [

            'question' => 'required|string',
            'answer' => 'required|string',
            'is_active' => 'required',
        ]);


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else{
            $faq = FAQ::find($id);

            if ($faq){
                $faq->update([
                    'question' => $request->question,
                    'answer' => $request->answer,
                    'is_active' => $request->is_active,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "faq Updated Successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "NO faq found"
                ], 404);
            }
        }

    }

    public function destroy($id)
    {
        $faq = FAQ::find($id);
        if ($faq){
            $faq->delete();
            return response()->json([
                'status' => 200,
                'message' => "faq Deleted"
            ], 200);
        } else  {
            return response()->json([
                'status' => 404,
                'message' => "NO faq found"
            ], 404);
        }

    }

}
