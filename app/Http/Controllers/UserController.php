<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Artist;
use DB;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $role = $request->role;
       
        if($role == 'Artist') {
            $users = User::where('role',$role);
            $users->with(['artist' => function($q) {
                $q->with(['artist_account','artist_social','artist_followers' => function($q1) {
                    $q1->orderBy('created_at','desc');
                }]);
            }]);
            $users = $users->orderBy('id','desc')->get();
        }else{
            $users = User::where('role','Admin')->orWhere('role','Super Admin')->get();
        }

    



        return response()->json([
            'success' => true,
            'role'=> $role ,
            'data' => $users
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
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'active' => true,
            'role' => $request->role
        ]);

        return response()->json([
            'success' => true,
            'data' => $user
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
        $user = User::find($id);


        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Product with id ' . $id . ' not found'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $user
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
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User with id ' . $id . ' not found'
            ], 400);
        }

        $updated = $user->fill($request->all())->save();

        if ($updated)
            return response()->json([
                'success' => true,
                'data' => $user
            ],200);
        else
            return response()->json([
                'success' => false,
                'message' => 'User could not be updated'
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
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User with id ' . $id . ' not found'
            ], 400);
        }

        if ($user->delete()) {
            return response()->json([
                'success' => true
            ],200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User could not be deleted'
            ], 500);
        }
    }

    public function search(Request $request){


        $data= User::where('role','<>','Artist')
        ->where(function($query) use($request) {
            $query->where('name','like','%'.$request->search.'%')
            ->orWhere('email','like','%'.$request->search.'%');
        })
        ->get();
      

        return response()->json([
            'success' => true,
            'data' => $data,
            'search' => $request->search
        ],200);
    }
}
