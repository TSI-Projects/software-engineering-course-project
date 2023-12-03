<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddVariantsToMedia extends Migration
{
    public function up()
    {
        Schema::table(
            'media',
            function (Blueprint $table) {
                $table->string('variant_name', 255)
                    ->after('size')
                    ->nullable();
                $table->foreignUuid('original_media_id', 'original_media_id')
                    ->nullable()
                    ->after('variant_name')
                    ->constrained('media')
                    ->cascadeOnUpdate()
                    ->nullOnDelete();
            }
        );
    }

    public function down()
    {
        Schema::table(
            'media',
            function (Blueprint $table) {
                if (DB::getDriverName() !== 'sqlite') {
                    $table->dropForeign('original_media_id');
                }
                $table->dropColumn('original_media_id');
            }
        );
        Schema::table(
            'media',
            function (Blueprint $table) {
                $table->dropColumn('variant_name');
            }
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getConnection()
    {
        return config('mediable.connection_name', parent::getConnection());
    }
}
