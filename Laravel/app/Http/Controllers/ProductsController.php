<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Products::all();
        if ($products->count() > 0){
            return response()->json([
               'status' => 200,
               'message' => $products
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
        $validator = Validator::make($request->all(),[

            'category_id' => "required",
            'parent_id' => "required" ,
            'name' => "required|string" ,
            'details'=> "required",
            'price' => "required", 
            'weight'=> "required",
            'image' => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048" ,
            'is_active' => "required"

        ]);

        $imagePath = $request->file('image')->store('products_images', 'public');

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ], 422);
        } else {
            $products = Products::create([

                'category_id' => $request->category_id,
                'parent_id' => $request->parent_id,
                'name' => $request->name,
                'details' => $request->details,
                'price' => $request->price,
                'weight' =>$request->weight,
                'is_active' => $request->is_active,
                'image' => $imagePath,
                'image_name' => $fileName,
                
                      ]);

            if ($products){
                return response()->json([
                    'status' => 200,
                    'message' => "Product Added"
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Something went wrong"
                ],500);
            }
        }
    }

    public function show($id)
    {
        $products = Products::find($id);
        if ($products){
            return response()->json([
                'status' => 200,
                'message'=>$products
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
        $products = Products::find($id);
        if ($products){
            return response()->json([
                'status' => 200,
                'message'=>$products
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

    public function update(Request $request, Products $products, int $id)
    {
        $validator = Validator::make($request->all(), [

            'category_id' => "required",
            'parent_id' => "required" ,
            'name' => "required|string" ,
            'details'=> "required",
            'price' => "required", 
            'weight'=> "required",
            'image' => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048" ,
            'is_active' => "required"

        ]);

        $imagePath = $request->file('image')->store('products_images', 'public');

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {

            $products = Products::find($id);

            if ($products){
                $products->update([
                    'category_id' => $request->category_id,
                    'parent_id' => $request->parent_id,
                    'name' => $request->name,
                    'details' => $request->details,
                    'price' => $request->price,
                    'weight' =>$request->weight,
                    'is_active' => $request->is_active,
                    'image' => $imagePath,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Product Updated"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "No Product Found"
                ],404);
            }
        }
    }

    public function destroy($id)
    {
        $products = Products::find($id);
        if ($products){
            $products->delete();
            return response()->json([
                'status' => 200,
                'message' => "Products Deleted"
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No Record Found"
            ], 404);
        }
    }
}
