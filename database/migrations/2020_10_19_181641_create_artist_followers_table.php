<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtistFollowersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artist_followers', function (Blueprint $table) {
            $table->id();
            $table->integer('artist_id')->unsigned();
            $table->string('display_name');
            $table->string('email');
            $table->string('platform');
            $table->string('user_url');
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
        Schema::dropIfExists('artist_followers');
    }
}
