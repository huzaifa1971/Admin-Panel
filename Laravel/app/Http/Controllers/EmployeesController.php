<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class EmployeesController extends Controller
{

    public function index(){
        $employees = Employees::all();
        if ($employees->count() > 0){
            return response()->json([
                'status' => 200,
                'employees' => $employees
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

            'name' => 'required|string|max:191',
            'email' => 'required|email|unique:employees',
            'joining_date' => 'required|date',
            'joining_salary' => 'required|int',
            'password' => 'required',
            'is_active' => 'required',
            'phone_number' => 'required|digits:11|unique:employees',
        ]);


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else{
            $employees = Employees::create([
                'name' => $request->name,
                'email' => $request->email,
                'joining_date' => $request->joining_date,
                'joining_salary' => $request->joining_salary,
                'password' => bcrypt($request->password),
                'is_active' => $request->is_active,
                'phone_number' => $request->phone_number,
            ]);

            if ($employees){

                return response()->json([
                    'status' => 200,
                    'message' => "Student Created Successfully"
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
        $employees = Employees::find($id);
        if ($employees){

            return response()->json([
                "status" => 200,
                "employee" => $employees
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" =>"No Such employee found"
            ], 404);
        }
    }

    public function edit($id)
    {
        $employees = Employees::find($id);
        if ($employees){

            return response()->json([
                "status" => 200,
                "employee" => $employees
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" =>"No Such employee found"
            ], 404);
        }
    }

    public function update(Request $request, int $id){
        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:191',
            'email' => 'required|email|unique:employees,email,' . $id,
            'joining_date' => 'required|date',
            'joining_salary' => 'required|int',
            'password' => 'required',
            'is_active' => 'required',
            'phone_number' => 'required|digits:11|unique:employees,phone_number,' . $id,
        ]);


        if ($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else{
            $employees = Employees::find($id);

            if ($employees){
                $employees->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'joining_date' => $request->joining_date,
                    'joining_salary' => $request->joining_salary,
                    'password' => $request->password,
                    'is_active' => $request->is_active,
                    'phone_number' => $request->phone_number,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Student Updated Successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "NO Employee found"
                ], 404);
            }
        }

    }

    public function destroy($id)
    {
        $employees = Employees::find($id);
        if ($employees){
            $employees->delete();
            return response()->json([
                'status' => 200,
                'message' => "Employee Deleted"
            ], 200);
        } else  {
            return response()->json([
                'status' => 404,
                'message' => "NO Employee found"
            ], 404);
        }

    }



}
