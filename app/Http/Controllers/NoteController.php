<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Note;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreNoteRequest;
use Carbon\Carbon;

class NoteController extends Controller
{

    public function __construct()
    {
        // CRUDメソッド実行前に認可処理を実行
        $this->authorizeResource(Note::class, 'note');
    }
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

    /**
     * ノートを指定されたoffsetから20件取得する
     *
     * @return \Illuminate\Http\Response
     */

    public function getMoreIndex(Request $request)
    {
        $userId = $request->input('user_id');
        $offset = $request->input('page');

        $notes = Note::where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->offset($offset)
            ->limit(20)
            ->get();
        return response()->json($notes);
    }

    public function getNotesByCalendar(int $id, string $date)
    {
        $date = explode('-', $date);
        $year = (int)($date[0]);
        $month = (int)($date[1]);
        $date = Carbon::createFromDate($year, $month, 1);
        $startOfMonth = Carbon::createFromDate($year, $month, 1)->startOfMonth();
        $startOfCalendar = $startOfMonth->subDays($startOfMonth->dayOfWeek)->toDateString();
        $lastOfMonth = Carbon::createFromDate($year, $month, 1)->lastOfMonth();
        $lastOfCalendar = $lastOfMonth->addDays(6 - $lastOfMonth->dayOfWeek)->toDateString();

        $notes = Note::where('user_id', $id)
            ->whereBetween('date', [$startOfCalendar, $lastOfCalendar])
            ->orderBy('date')
            ->get();
        return response()->json($notes);
    }

    public function indexByCalendar()
    {
        $user_id = Auth::id();

        $startOfMonth = Carbon::now()->startOfMonth();
        $startOfCalendar = $startOfMonth->subDays($startOfMonth->dayOfWeek)->toDateString();
        $lastOfMonth = Carbon::now()->lastOfMonth();
        $lastOfCalendar = $lastOfMonth->addDays(6 - $lastOfMonth->dayOfWeek)->toDateString();

        $notes = Note::where('user_id', $user_id)
            ->whereBetween('date', [$startOfCalendar, $lastOfCalendar])
            ->orderBy('date')
            ->get();

        return view('calendar', ['notes' => $notes]);
    }

    public function getNote(int $id, string $date)
    {
        $note = Note::where('user_id', $id)
            ->whereDate('date', $date)
            ->get();

        return response()->json($note);
    }

    /**
     * ノート投稿フォームを表示
     *
     * @param string $date ノートの日付
     * @return \Illuminate\Http\Response
     */
    public function create(string $date = null)
    {
        $date = $date ?: date('Y-m-d'); // 引数がnullの場合は現在の日付を取得する
        return view('notes.form', ['note' => null, 'date' => $date]);
    }

    /**
     * ノートを保存
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNoteRequest $request)
    {
        // 投稿した日付と同じ日付のノートが存在する場合は更新、存在しない場合は作成する
        $note = Note::updateOrCreate(['user_id' => $request->user_id, 'date' => $request->date], $request->all());
        return redirect()->route('notes.show', ['note' => $note->id]);
    }

    /**
     * ノートを表示
     *
     * @param  Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Note $note)
    {
        return view('notes.note', ['note' => $note]);
    }

    /**
     * ノート編集フォームを表示
     *
     * @param  Note  $note
     * @return \Illuminate\Http\Response
     */
    public function edit(Note $note)
    {
        return view(
            'notes.form',
            [
                'note' => $note,
                'date' => $note->date->toDateString(),
            ]
        );
    }

    /**
     * ノートを更新
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(StoreNoteRequest $request, Note $note)
    {
        $note->update($request->all());
        return redirect()->route('notes.show', ['note' => $note->id]);
    }

    /**
     * ノートを削除
     *
     * @param  Note $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return redirect()->route('home');
    }
}
