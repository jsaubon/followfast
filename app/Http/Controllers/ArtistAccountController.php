<?php

namespace App\Http\Controllers;

use App\ArtistAccount;
use Illuminate\Http\Request;

class ArtistAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $artist_accounts = ArtistAccount::orderBy('id','desc')->get();

        return response()->json([
            'success' => true,
            'data' => $artist_accounts
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

        $artist_account = ArtistAccount::create([
            'artist_id' => $request->artist_id,
            'spotify_id' => $request->spotify_id,
            'apple_id' => $request->apple_id,
            'itunes_id' => $request->itunes_id,
            'google_id' => $request->google_id,
            'amazon_id' => $request->amazon_id,
            'tidal_id' => $request->tidal_id,
            'Deezer_id' => $request->Deezer_id,
            'microsoft_id' => $request->microsoft_id,
            'napster_id' => $request->napster_id,
            'shazam_id' => $request->shazam_id,
            'iheartradio_id' => $request->iheartradio_id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $artist_account
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
        $artist_account = ArtistAccount::find($id);


        if (!$artist_account) {
            return response()->json([
                'success' => false,
                'message' => 'Artist Accounts with id ' . $id . ' not found'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $artist_account
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
        $artist_account = ArtistAccount::find($id);

        if (!$artist_account) {
            return response()->json([
                'success' => false,
                'message' => 'Artist Accounts with id ' . $id . ' not found'
            ], 400);
        }

        $updated = $artist_account->fill($request->all())->save();

        if ($updated)
            return response()->json([
                'success' => true,
                'data' => $artist_account
            ],200);
        else
            return response()->json([
                'success' => false,
                'message' => 'Artist Accounts could not be updated'
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
        $artist_account = ArtistAccount::find($id);

        if (!$artist_account) {
            return response()->json([
                'success' => false,
                'message' => 'Artist Accounts with id ' . $id . ' not found'
            ], 400);
        }

        if ($artist_account->delete()) {
            return response()->json([
                'success' => true
            ],200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Artist Accounts could not be deleted'
            ], 500);
        }
    }
}
