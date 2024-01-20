<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\Bed;
use App\Models\Room;
use Illuminate\Database\Seeder;
use Plank\Mediable\Facades\MediaUploader;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSuperiorRoom();
        $this->seedStandartRoom();
        $this->seedLuxeRoom();
    }

    protected function seedSuperiorRoom(): void
    {
        /**
         * @var \App\Models\Room
         */
        $room = Room::factory()->create([
            'name' => 'Супериор',
            'description' => 'Наш супериор игровой номер, где роскошь встречается с удобствами, создавая идеальное пространство для вашего отдыха и развлечений..',
        ]);

        $this->attachMedia([
            app()->databasePath('/seeders/images/superior1.jfif'),
            app()->databasePath('/seeders/images/superior1.jfif'),
            app()->databasePath('/seeders/images/superior1.jfif'),
            app()->databasePath('/seeders/images/superior2.jfif'),
            app()->databasePath('/seeders/images/superior2.jfif'),
            app()->databasePath('/seeders/images/superior2.jfif'),
        ], $room);

        $room->beds()->attach([
            Bed::query()->where('slug', 'queen')->first()->getKey() => ['count' => 1],
        ]);

        $room->amenities()->attach(
            Amenity::query()->whereIn('slug', [
                'wifi',
                'air_conditioner',
                'neon_backlight',
                'refrigerator',
            ])->get(),
        );
    }

    protected function seedStandartRoom(): void
    {
        /**
         * @var \App\Models\Room
         */
        $room = Room::factory()->create([
            'name' => 'Стнадартная',
            'description' => 'Стандартный игровой номер, где комфорт и развлечения сочетаются, чтобы сделать ваше пребывание незабываемым.',
        ]);

        $this->attachMedia([
            app()->databasePath('/seeders/images/standart1.jfif'),
            app()->databasePath('/seeders/images/standart1.jfif'),
            app()->databasePath('/seeders/images/standart1.jfif'),
            app()->databasePath('/seeders/images/standart2.jfif'),
            app()->databasePath('/seeders/images/standart2.jfif'),
            app()->databasePath('/seeders/images/standart2.jfif'),
        ], $room);

        $room->beds()->attach([
            Bed::query()->where('slug', 'single')->first()->getKey() => ['count' => 2],
        ]);

        $room->amenities()->attach(
            Amenity::query()->whereIn('slug', [
                'wifi',
                'air_conditioner',
                'neon_backlight',
            ])->get(),
        );
    }

    protected function seedLuxeRoom(): void
    {
        /**
         * @var \App\Models\Room
         */
        $room = Room::factory()->create([
            'name' => 'Люкс',
            'description' => 'Роскошный игровой номер в нашем отеле, где роскошь и развлечения сочетаются в идеальном симбиозе. Этот номер предназначен для истинных ценителей удовольствий, готовых погрузиться в мир игр и роскоши.',
        ]);

        $this->attachMedia([
            app()->databasePath('/seeders/images/luxe1.jfif'),
            app()->databasePath('/seeders/images/luxe1.jfif'),
            app()->databasePath('/seeders/images/luxe1.jfif'),
            app()->databasePath('/seeders/images/luxe2.jfif'),
            app()->databasePath('/seeders/images/luxe2.jfif'),
            app()->databasePath('/seeders/images/luxe2.jfif'),
        ], $room);

        $room->beds()->attach(
            Bed::query()->whereIn('slug', [
                'king',
                'queen',
            ])->get(),
            ['count' => 1],
        );

        $room->amenities()->attach(
            Amenity::query()->whereIn('slug', [
                'wifi',
                'air_conditioner',
                'tv',
                'refrigerator',
                'neon_backlight',
                'game_console',
            ])->get(),
        );
    }

    protected function attachMedia(array $sources, Room $room)
    {
        collect($sources)->each(static function ($source) use ($room) {
            $image = MediaUploader::fromSource($source)
                ->useHashForFilename()
                ->onDuplicateUpdate()
                ->toDirectory('room/images')
                ->upload();

            $room->attachMedia($image, ['image']);
        });
    }
}
