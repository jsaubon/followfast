<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArtistSocial extends Model
{
    protected $guarded = [];

    public function artist() {
        return $this->belongsTo('\App\Artist','artist_id');
    }
}
