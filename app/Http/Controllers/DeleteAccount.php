<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class DeleteAccount extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect('login');
    }
}
