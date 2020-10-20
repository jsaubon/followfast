<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('login', 'PassportController@login');
Route::post('register', 'PassportController@register');
Route::get('artist/song/{song}', 'ArtistController@getBySong');
Route::post('artist_follower/follow', 'ArtistFollowerController@follow');

Route::middleware('auth:api')->group(function () {
    // Route::get('user', 'PassportController@details');

    Route::apiResource('user','UserController');
    Route::post('user/search','UserController@search');
    Route::apiResource('artist','ArtistController');
    Route::apiResource('artist_account','ArtistAccountController');
    Route::apiResource('artist_social','ArtistSocialController');
    Route::apiResource('artist_follower','ArtistFollowerController');
});