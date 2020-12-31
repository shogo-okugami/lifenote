<?php

use Illuminate\Database\Seeder;
use App\Note;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $notes = factory(Note::class,100)->create();
    }
}
