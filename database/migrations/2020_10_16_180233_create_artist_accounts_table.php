<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtistAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artist_accounts', function (Blueprint $table) {
            $table->id();
            $table->integer('artist_id')->unsigned();
            $table->string('spotify_id')->nullable();
            $table->string('apple_id')->nullable();
            $table->string('itunes_id')->nullable();
            $table->string('google_id')->nullable();
            $table->string('amazon_id')->nullable();
            $table->string('tidal_id')->nullable();
            $table->string('Deezer_id')->nullable();
            $table->string('microsoft_id')->nullable();
            $table->string('napster_id')->nullable();
            $table->string('shazam_id')->nullable();
            $table->string('iheartradio_id')->nullable();
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
        Schema::dropIfExists('artist_accounts');
    }
}
