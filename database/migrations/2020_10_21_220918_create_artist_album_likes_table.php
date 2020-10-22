<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtistAlbumLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artist_album_likes', function (Blueprint $table) {
            $table->id();
            $table->integer('artist_id')->unsigned();
            $table->string('album_id');
            $table->string('album_name');
            $table->string('display_name');
            $table->string('email');
            $table->string('platform');
            $table->string('user_url');
            $table->longText('album_image');
            $table->string('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('artist_album_likes');
    }
}
