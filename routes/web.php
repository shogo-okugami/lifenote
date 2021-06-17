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

// ホーム
Route::get('/', 'NoteController@index')->name('home')->middleware('auth');
// 認証
Auth::routes();
// ノート作成
Route::get('notes/create/{date?}', 'NoteController@create')->middleware('auth');
// ノート表示、更新、編集、削除
Route::resource('notes', 'NoteController')->except(['index', 'create'])->middleware('auth');
// カレンダー
Route::get('calendar', 'NoteController@indexByCalendar')->name('calendar')->middleware('auth');
// 設定
Route::get('settings', function () {
    return view('settings');
})->name('settings')->middleware('auth');
// アカウント削除
Route::post('delete/{id}', 'DeleteAccount')->middleware('auth');
