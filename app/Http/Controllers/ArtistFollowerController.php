<?php

namespace App\Http\Controllers;

use App\ArtistFollower;
use Illuminate\Http\Request;
use Ixudra\Curl\Facades\Curl;

class ArtistFollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $artist_followers = ArtistFollower::all();

        return response()->json([
            'success' => true,
            'data' => $artist_followers
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
            'email' => 'required',
            'display_name' => 'required',
            'platform' => 'required',
            'user_url' => 'required',
        ]);

        $artist_follower = ArtistFollower::where('artist_id',$request->artist_id)
                                        ->where('email',$request->email)
                                        ->where('platform',$request->platform)
                                        ->get()->first();
        if(!$artist_follower) {
            $artist_follower = ArtistFollower::create([
                'artist_id' => $request->artist_id,
                'email' => $request->email,
                'display_name' => $request->display_name,
                'platform' => $request->platform,
                'user_url' => $request->user_url,
            ]);
            
            return response()->json([
                'success' => true,
                'data' => $response,
            ],200);
        } else {
            return response()->json([
                'success' => true,
                'data' => 'already followed'
            ],200);
        } 
    }

    private function split_name($name) {
        $name = trim($name);
        $last_name = (strpos($name, ' ') === false) ? '' : preg_replace('#.*\s([\w-]*)$#', '$1', $name);
        $first_name = trim( preg_replace('#'.$last_name.'#', '', $name ) );
        return array($first_name, $last_name);
    }


    public function follow(Request $request)
    {
        $this->validate($request, [
            'artist_id' => 'required',
            'email' => 'required',
            'display_name' => 'required',
            'platform' => 'required',
            'user_url' => 'required',
        ]);

        $artist_follower = ArtistFollower::where('artist_id',$request->artist_id)
                                        ->where('email',$request->email)
                                        ->where('platform',$request->platform)
                                        ->get()->first();
        if(!$artist_follower) {
            $artist_follower = ArtistFollower::create([
                'artist_id' => $request->artist_id,
                'email' => $request->email,
                'display_name' => $request->display_name,
                'platform' => $request->platform,
                'user_url' => $request->user_url,
            ]);

            $display_name = split_name($request->display_name);
            $first_name = $display_name[0];
            $last_name = $display_name[1];

            $data = [
                "api_key" => "pk_09264a59a51492060d75fb1165ac100954",
                "profiles" => [
                    [
                        "platform" =>  $request->platform,
                        "user_url" =>  $request->user_url,
                        "email" =>  $request->email,
                        "first_name" =>  $first_name,
                        'last_name' => $last_name
                    ]
                ]
            ];

            $response = Curl::to('https://a.klaviyo.com/api/v2/list/XxLXUR/members')
                ->withHeader('Content-Type: application/json')
                ->withData(json_encode($data))
                ->post();
            return response()->json([
                'success' => true,
                'data' => $response
            ],200);
        } else {
            return response()->json([
                'success' => true,
                'data' => 'already followed'
            ],200);
        } 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $columns = [
            'display_name',
            'email'
        ];
        $artist_follower = ArtistFollower::where('artist_id',$id);
        foreach ($columns as $key => $column) {
            $artist_follower->where($column,'LIKE','%'.$request->search.'%');
        }

        $artist_follower = $artist_follower->orderBy('created_at','desc')->get();


        if (!$artist_follower) {
            return response()->json([
                'success' => false,
                'message' => 'Follower with id ' . $id . ' not found'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $artist_follower
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
        $artist_follower = ArtistFollower::find($id);

        if (!$artist_follower) {
            return response()->json([
                'success' => false,
                'message' => 'ArtistFollower with id ' . $id . ' not found'
            ], 400);
        }

        $updated = $artist_follower->fill($request->all())->save();

        if ($updated)
            return response()->json([
                'success' => true,
                'data' => $artist_follower
            ],200);
        else
            return response()->json([
                'success' => false,
                'message' => 'ArtistFollower could not be updated'
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
        $artist_follower = ArtistFollower::find($id);

        if (!$artist_follower) {
            return response()->json([
                'success' => false,
                'message' => 'ArtistFollower with id ' . $id . ' not found'
            ], 400);
        }

        if ($artist_follower->delete()) {
            return response()->json([
                'success' => true
            ],200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'ArtistFollower could not be deleted'
            ], 500);
        }
    }
}
