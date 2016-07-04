<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Auth;

//Route::group(array('before' => 'auth'), function(){
    
    Route::get('/', 'HomeController@index');
    
    Route::get('/welcome', function () {
        return view('welcome');
    });
    
    Route::get('/tree/data', 'NestedSetController@data');


    Route::post('/session/set', 'SessionController@set');
    Route::post('/session/get', 'SessionController@get');

    Route::post('/grid/structbyid', 'GridController@structbyid');
    Route::get('/grid/data', 'GridController@data');

    Route::get('/signout', 'ExtController@getLogout');
    
//});