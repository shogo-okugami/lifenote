<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Note;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Resources\Note as NoteResource;
use Carbon\Carbon;

class NoteController extends Controller
{
    /**
     * ユーザーの投稿したノート一覧を取得
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = Auth::id();
        $notes = Note::where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->offset(0)
            ->limit(20)
            ->get();

        return view('home', ['notes' => $notes]);
    }

    public function getNotesByCalendar($id, $date)
    {

        $date = explode('-', $date);
        $year = (int)($date[0]);
        $month = (int)($date[1]);
        $date = Carbon::createFromDate($year, $month, 1);
        $startOfMonth = Carbon::createFromDate($year, $month, 1)->startOfMonth();
        $startOfCalendar = $startOfMonth->subDays($startOfMonth->dayOfWeek)->toDateString();
        $lastOfMonth = Carbon::createFromDate($year, $month, 1)->lastOfMonth();
        $lastOfCalendar = $lastOfMonth->addDays(6 - $lastOfMonth->dayOfWeek)->toDateString();

        return NoteResource::collection(
            Note::where('user_id', $id)
                ->whereBetween('date', [$startOfCalendar, $lastOfCalendar])
                ->orderBy('date')
                ->get()
        );
    }

    public function indexByCalendar()
    {

        $user_id = Auth::id();

        $startOfMonth = Carbon::now()->startOfMonth();
        $startOfCalendar = $startOfMonth->subDays($startOfMonth->dayOfWeek)->toDateString();
        $lastOfMonth = Carbon::now()->lastOfMonth();
        $lastOfCalendar = $lastOfMonth->addDays(6 - $lastOfMonth->dayOfWeek)->toDateString();

        $notes = NoteResource::collection(Note::where('user_id', $user_id)
            ->whereBetween('date', [$startOfCalendar, $lastOfCalendar])
            ->orderBy('date')
            ->get());

        return view('calendar', ['notes' => $notes]);
    }

    public function getNote($id, $date)
    {

        $note = NoteResource::collection(
            Note::where('user_id', $id)
                ->whereDate('date', $date)
                ->get()
        );

        return $note;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(string $date = null)
    {
        $date = $date ?: date('Y-m-d');
        return view('notes.form', ['note' => null, 'date' => $date]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNoteRequest $request)
    {
        $note = Note::updateOrCreate(['user_id' => $request->user_id, 'date' => $request->date], $request->all());
        return redirect()->route('notes.show', ['note' => $note->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $note = Note::find($id);
        $this->authorize('view', $note);
        if (isset($note)) {

            return view('notes.note', ['note' => $note]);
        } else {
            return redirect()->route('home');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $note = Note::find($id);
        $this->authorize('edit', $note);
        $date = $note->date->toDateString();

        if (isset($note)) {

            return view(
                'notes.form',
                [
                    'note' => $note,
                    'date' => $date,
                ]
            );
        } else {
            return redirect()->route('home');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreNoteRequest $request, $id)
    {
        $note = Note::find($id);
        $this->authorize('update', $note);
        $note->update($request->all());
        return redirect()->route('notes.show', ['id' => $note->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $note = Note::find($id);
        $this->authorize('delete', $note);
        $note->delete();

        return redirect()->route('home');
    }
}
