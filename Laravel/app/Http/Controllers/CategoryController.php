<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::all();
        if ($category->count() > 0){
            return response()->json([
               'status' => 200,
               'message' => $category
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

            'parent_id' => "required" ,
            'name' => "required|string" ,
            'image' => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048" ,
            'is_active' => "required"

        ]);

        $imagePath = $request->file('image')->store('category_images', 'public');

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();
        //$ = '/category_images/'.$fileName;


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ], 422);
        } else {
            $category = Category::create([
                'parent_id' => $request->parent_id,
                'name' => $request->name,
                'is_active' => $request->is_active,
                'image' => $imagePath,
            ]);

            if ($category){
                return response()->json([
                    'status' => 200,
                    'message' => "Category Added"
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
        $category = Category::find($id);
        if ($category){
            return response()->json([
                'status' => 200,
                'message'=>$category
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
        $category = Category::find($id);
        if ($category){
            return response()->json([
                'status' => 200,
                'message'=>$category
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No record found"
            ], 404);
        }
    }

    public function update(Request $request, Category $category, int $id)
    {
        $validator = Validator::make($request->all(), [
            'parent_id' => 'required',
            'name' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_active' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }
    
        $imagePath = $request->file('image')->store('category_images', 'public');

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $fileName = $file->getClientOriginalName();
        //$ = '/category_images/'.$fileName;
    
        $category = Category::find($id);
    
        if ($category) {
            $category->update([
                'parent_id' => $request->parent_id,
                'name' => $request->name,
                'is_active' => $request->is_active,
                'image' => $imagePath,
            ]);
    
            return response()->json([
                'status' => 200,
                'message' => 'Category Updated',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Category Found',
            ], 404);
        }
    }
    

    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category){
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => "Category Deleted"
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No Record Found"
            ], 404);
        }
    }
}
