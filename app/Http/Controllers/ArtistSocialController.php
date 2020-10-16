<?php

namespace App\Http\Controllers;

use App\ArtistSocial;
use Illuminate\Http\Request;

class ArtistSocialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $artist_socials = ArtistSocial::orderBy('id','desc')->get();

        return response()->json([
            'success' => true,
            'data' => $artist_socials
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'artist_id' => 'required',
        ]);

        $artist_social = ArtistSocial::create([
            'artist_id' => $request->artist_id,
            'instagram' => $request->instagram,
            'facebook' => $request->facebook,
            'twitter' => $request->twitter,
            'youtube' => $request->youtube
        ]);

        return response()->json([
            'success' => true,
            'data' => $artist_social
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $artist_social = ArtistSocial::find($id);


        if (!$artist_social) {
            return response()->json([
                'success' => false,
                'message' => 'Artist Socials with id ' . $id . ' not found'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $artist_social
        ],200);
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
        $artist_social = ArtistSocial::find($id);

        if (!$artist_social) {
            return response()->json([
                'success' => false,
                'message' => 'Artist Socials with id ' . $id . ' not found'
            ], 400);
        }

        $updated = $artist_social->fill($request->all())->save();

        if ($updated)
            return response()->json([
                'success' => true,
                'data' => $artist_social
            ],200);
        else
            return response()->json([
                'success' => false,
                'message' => 'Artist Socials could not be updated'
            ], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $artist_social = ArtistSocial::find($id);

        if (!$artist_social) {
            return response()->json([
                'success' => false,
                'message' => 'Artist Socials with id ' . $id . ' not found'
            ], 400);
        }

        if ($artist_social->delete()) {
            return response()->json([
                'success' => true
            ],200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Artist Socials could not be deleted'
            ], 500);
        }
    }
}
