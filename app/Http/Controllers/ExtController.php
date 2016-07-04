<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Http\Requests;
use Auth;
use Illuminate\Support\Facades\Redirect;

class ExtController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function getLogout(){
        
        
        Auth::logout();
        Session::flush();
        return Redirect::to('/login');
    }
}
