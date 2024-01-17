<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\DealerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BergerPaintsVideosController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\NewsAndEventsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'store']);
Route::get('users', [AuthController::class, 'index']);
Route::get('users/{id}', [AuthController::class, 'show']);
Route::get('users/edit/{id}', [AuthController::class, 'edit']);
Route::post('users/edit/{id}', [AuthController::class, 'update']);
Route::delete('users/delete/{id}', [AuthController::class, 'destroy']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
//user
Route::get('employees', [EmployeesController::class, 'index']);
Route::post('employees', [EmployeesController::class, 'store']);
Route::get('employees/{id}', [EmployeesController::class, 'show']);
Route::get('employees/edit/{id}', [EmployeesController::class, 'edit']);
Route::put('employees/edit/{id}', [EmployeesController::class, 'update']);
Route::delete('employees/delete/{id}', [EmployeesController::class, 'destroy']);
//dealer
Route::get('dealer', [DealerController::class, 'index']);
Route::post('dealer', [DealerController::class, 'store']);
Route::get('dealer/{id}', [DealerController::class, 'show']);
Route::get('dealer/edit/{id}', [DealerController::class, 'edit']);
Route::post('dealer/edit/{id}', [DealerController::class, 'update']);
Route::delete('dealer/delete/{id}', [DealerController::class, 'destroy']);
//bergerpaintsvideos
Route::get('bergerpaintsvideos', [BergerPaintsVideosController::class, 'index']);
Route::post('bergerpaintsvideos', [BergerPaintsVideosController::class, 'store']);
Route::get('bergerpaintsvideos/{id}', [BergerPaintsVideosController::class, 'show']);
Route::get('bergerpaintsvideos/edit/{id}', [BergerPaintsVideosController::class, 'edit']);
Route::post('bergerpaintsvideos/edit/{id}', [BergerPaintsVideosController::class, 'update']);
Route::delete('bergerpaintsvideos/delete/{id}', [BergerPaintsVideosController::class, 'destroy']);
//faq
Route::get('faq', [FAQController::class, 'index']);
Route::post('faq', [FAQController::class, 'store']);
Route::get('faq/{id}', [FAQController::class, 'show']);
Route::get('faq/edit/{id}', [FAQController::class, 'edit']);
Route::post('faq/edit/{id}', [FAQController::class, 'update']);
Route::delete('faq/delete/{id}', [FAQController::class, 'destroy']);
//newsandevents
Route::get('newsandevents', [NewsAndEventsController::class, 'index']);
Route::post('newsandevents', [NewsAndEventsController::class, 'store']);
Route::get('newsandevents/{id}', [NewsAndEventsController::class, 'show']);
Route::get('newsandevents/edit/{id}', [NewsAndEventsController::class, 'edit']);
Route::post('newsandevents/edit/{id}', [NewsAndEventsController::class, 'update']);
Route::delete('newsandevents/delete/{id}', [NewsAndEventsController::class, 'destroy']);
//category
Route::get('category', [CategoryController::class, 'index']);
Route::post('category', [CategoryController::class, 'store']);
Route::get('category/{id}', [CategoryController::class, 'show']);
Route::get('category/edit/{id}', [CategoryController::class, 'edit']);
Route::post('category/edit/{id}', [CategoryController::class, 'update']);
Route::delete('category/delete/{id}', [CategoryController::class, 'destroy']);
//product
Route::get('product', [ProductsController::class, 'index']);
Route::post('product', [ProductsController::class, 'store']);
Route::get('product/{id}', [ProductsController::class, 'show']);
Route::get('product/edit/{id}', [ProductsController::class, 'edit']);
Route::post('product/edit/{id}', [ProductsController::class, 'update']);
Route::delete('product/delete/{id}', [ProductsController::class, 'destroy']);



