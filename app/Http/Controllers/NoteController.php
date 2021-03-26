<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Note;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Resources\Note as NoteResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user_id = $request->input('user_id');
        $offset = $request->input('page');

        return NoteResource::collection(
            Note::where('user_id', $user_id)
                ->orderBy('created_at', 'desc')
                ->offset($offset)
                ->limit(20)
                ->get()
        );
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
                ->whereBetween('created_at', [$startOfCalendar, $lastOfCalendar])
                ->orderBy('created_at')
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
            ->whereBetween('created_at', [$startOfCalendar, $lastOfCalendar])
            ->orderBy('created_at')
            ->get());

        return view('calendar', ['notes' => $notes]);
    }

    public function getNote($id, $date)
    {

        $note = NoteResource::collection(
            Note::where('user_id', $id)
                ->whereDate('created_at', $date)
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
        $note = Note::updateOrCreate(
            ['created_at' => $request->created_at],
            $request->all()
        );
        $note->save();
        return redirect()->route('notes.show', ['id' => $note->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Note $note)
    {
        $this->authorize('view', $note);
        $note = Note::find($id);

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
        $date = $note->created_at->toDateString();

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
        Note::where('id', $id)->delete();

        return redirect()->route('home');
    }
}
