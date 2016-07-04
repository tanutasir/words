<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Http\Requests;
use Auth; 

class SessionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function set()
    {
        $key = $_POST['key'];
        $value = $_POST['value'];
        Session::set($key, $value);
    }
    
    public function get()
    {
        $key = $_POST['key'];
        return Session::get($key);
    }
}
