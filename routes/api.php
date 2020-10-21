<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Ixudra\Curl\Facades\Curl;

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

Route::get('test',function() {
    $artist = \App\Artist::find(1);
    $user = $artist->user;
    $data = [
            "api_key" => "pk_09264a59a51492060d75fb1165ac100954",
        ];
        
    $lists = Curl::to('https://a.klaviyo.com/api/v2/lists')
        ->withData($data)
        ->withHeader('Content-Type: application/json')
        ->get();
    $lists = json_decode($lists, true);
    $list_names = array_column($lists, 'list_name');
    $artist_list = array_search($user->name. ' followers',$list_names);
    
    // dd($lists[$artist_list]);
    if($artist_list) {
        $list_id = $lists[$artist_list]['list_id'];
    } else {
        $data = [
            "api_key" => "pk_09264a59a51492060d75fb1165ac100954",
            "list_name" => $user->name. ' followers'
        ];
        
        $newList = Curl::to('https://a.klaviyo.com/api/v2/lists')
            ->withData(json_encode($data))
            ->withHeader('Content-Type: application/json')
            ->post();
        
        $newList = json_decode($newList, true);
        $list_id = $newList['list_id'];
    }
    $data = [
        "api_key" => "pk_09264a59a51492060d75fb1165ac100954",
        "profiles" => [
            [
                "platform" =>  'Spotify',
                "user_url" =>  'https://open.spotify.com/user/22dplpm42s3333424fa2miqmq',
                "email" =>  'joshuasaubon@gmail.com',
                "first_name" =>  'Joshua',
                "last_name" =>  'Saubon',
            ]
        ]
    ];
    
    $response = Curl::to('https://a.klaviyo.com/api/v2/list/'.$list_id.'/members')
        ->withHeader('Content-Type: application/json')
        ->withData(json_encode($data))
        ->post();

        dd($response);
});