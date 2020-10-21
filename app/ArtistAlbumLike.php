<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArtistAlbumLike extends Model
{
    //
    protected $guarded = [];
    public function artist() {
        return $this->belongsTo('\App\Artist','artist_id');
    }
}
