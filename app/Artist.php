<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $guarded = [];

    public function user() {
        return $this->belongsTo('\App\User','user_id');
    }
    
    public function artist_account() {
        return $this->hasOne('\App\ArtistAccount','artist_id');
    }
    public function artist_social() {
        return $this->hasOne('\App\ArtistSocial','artist_id');
    }
}
