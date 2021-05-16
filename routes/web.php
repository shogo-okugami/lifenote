<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
})->name('home')->middleware('auth');

Auth::routes();

Route::resource('notes', 'NoteController')->except(['index', 'show', 'create'])->middleware('auth');

Route::get('notes/create/{date?}', 'NoteController@create')->middleware('auth');

Route::get('notes/{id}', 'NoteController@show')->name('notes.show')->middleware('auth');

Route::get('calendar', 'NoteController@indexByCalendar')->name('calendar')->middleware('auth');

Route::get('settings', function () {
    return view('settings');
})->name('settings')->middleware('auth');
