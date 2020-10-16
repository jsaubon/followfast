<?php

namespace App\Http\Controllers;

use App\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $artists = Artist::orderBy('id','desc')->get();

        return response()->json([
            'success' => true,
            'data' => $artists
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
            'user_id' => 'required',
            'song_title' => 'required',
            'song_image' => 'required',
        ]);

        if($request->song_image) {
            if(strpos($request->song_image, 'data:image') === 0) {
                $song_image = $this->saveImage($request->song_image);
            } else {
                $song_image = $request->song_image;
            }
        } 
        $artist = Artist::create([
            'user_id' => $request->user_id,
            'song_title' => $request->song_title,
            'song_description' => $request->song_description,
            'song_image' => $song_image
        ]);

        return response()->json([
            'success' => true,
            'data' => $artist
        ],200);
    }


    private function saveImage($imageData) {
        $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
        $imageData = str_replace('data:image/png;base64,', '', $imageData);
        $imageData = str_replace(' ', '+', $imageData);
        $imageData = base64_decode($imageData);
        $source = imagecreatefromstring($imageData);
        $rotate = imagerotate($source, 0, 0); // if want to rotate the image
        $imageName = 'assets/images/'.rand().'.png';
        $imageSave = imagejpeg($rotate,$imageName,100);
        imagedestroy($source);

        return $imageName;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $artist = Artist::find($id);


        if (!$artist) {
            return response()->json([
                'success' => false,
                'message' => 'Artist with id ' . $id . ' not found'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $artist
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
        $artist = Artist::find($id);

        if (!$artist) {
            return response()->json([
                'success' => false,
                'message' => 'Artist with id ' . $id . ' not found'
            ], 400);
        }

        if($request->song_image) {
            if(strpos($request->song_image, 'data:image') === 0) {
                $song_image = $this->saveImage($request->song_image);
            } else {
                $song_image = $request->song_image;
            }
        } 
        $artist->user_id = $request->user_id;
        $artist->song_title = $request->song_title;
        $artist->song_description = $request->song_description;
        $artist->notes = $request->notes;
        
        $artist->song_image = $song_image;
        $artist->save();

        if ($artist->save())
            return response()->json([
                'success' => true,
                'data' => $artist
            ],200);
        else
            return response()->json([
                'success' => false,
                'message' => 'Artist could not be updated'
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
        $artist = Artist::find($id);

        if (!$artist) {
            return response()->json([
                'success' => false,
                'message' => 'Artist with id ' . $id . ' not found'
            ], 400);
        }

        if ($artist->delete()) {
            return response()->json([
                'success' => true
            ],200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Artist could not be deleted'
            ], 500);
        }
    }
}
