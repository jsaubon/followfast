<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\ArtistAlbumLike;
use Ixudra\Curl\Facades\Curl;


class ArtistAlbumLikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $this->validate($request, [
            'artist_id' => 'required',
            'email' => 'required',
            'display_name' => 'required',
            'platform' => 'required',
            'user_url' => 'required',
            'album_name'=>'required',
            'album_id'=>'required'
        ]);

        $artist_album_likes = ArtistAlbumLike::where('artist_id',$request->artist_id)
                                          ->where('album_id',$request->album_id)
                                          ->where('email',$request->email)
                                          ->where('platform',$request->platform)
                                          ->where('album_name',$request->album_name)
                                          ->get()->first();
        

         if(!$artist_album_likes) {
            $artist_album_likes = ArtistAlbumLike::create([
                'artist_id' => $request->artist_id,
                'album_id' => $request->album_id,
                'album_name' => $request->album_name,
                'album_image' => $request->album_image,
                'email' => $request->email,
                'display_name' => $request->display_name,
                'platform' => $request->platform,
                'user_url' => $request->user_url,
                'type'=>$request->type

            ]);
            
            return response()->json([
                'success' => true,
                'data' => $artist_album_likes,
            ],200);
        } else {
            return response()->json([
                'success' => true,
                'data' => 'already like'
            ],200);
        } 



    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id,Request $request)
    {
        //

        $columns = [
            'display_name',
            'email',
        ];
        $artist_album_likes = ArtistAlbumLike::where('artist_id',$id);
        foreach ($columns as $key => $column) {
            $artist_album_likes->where($column,'LIKE','%'.$request->search.'%');
        }

        $artist_album_likes = $artist_album_likes->orderBy('created_at','desc')->get();


        if (!$artist_album_likes) {
            return response()->json([
                'success' => false,
                'message' => 'Likes with id ' . $id . ' not found'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $artist_album_likes,
            'hi'=>'hi'
        ],200);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
