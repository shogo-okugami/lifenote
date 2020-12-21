<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Note;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreNoteRequest;
use DebugBar\DebugBar;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user_id = Auth::id();

    $notes = Note::where('user_id', $user_id)
      ->orderBy('updated_at', 'desc')
      ->get();

    return view('home', ['notes' => $notes]);
    
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return view('notes.form');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreNoteRequest $request)
  {
    $user_id = Auth::id();
    $note = Note::updateOrCreate(
      ['created_at' => $request->created_at],
      ['text' => $request->text, 'user_id' => $user_id, 'created_at' => $request->created_at,]
    );
    $note->save();
    return redirect()->route('home');
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(StoreNoteRequest $request, $id, ?Note $note)
  {
    $note->where('id', $id);
    $note->text = $request->text;
    $note->user_id = Auth::id();
    $note->save();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }
}
