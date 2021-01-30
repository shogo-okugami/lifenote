<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('home', 'NoteController@index');

Route::get('users/{id}/note/{date}','NoteController@getNote');

Route::get('users/{id}/notes/{date}', 'NoteController@getNotesByCalendar');
