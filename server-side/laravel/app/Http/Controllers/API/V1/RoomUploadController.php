<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\RoomUploadDestoryRequest;
use App\Http\Requests\API\V1\RoomUploadStoreRequest;
use App\Models\Room;
use Illuminate\Support\Facades\Response;
use Plank\Mediable\Facades\MediaUploader;

class RoomUploadController extends Controller
{
    public function store(Room $room, RoomUploadStoreRequest $request)
    {
        $this->authorize('uploadMedia', $room);

        $media = array_map(function () {
            $media = MediaUploader::fromSource()
                ->useHashForFilename()
                ->onDuplicateUpdate()
                ->toDirectory('room/images')
                ->upload();

            return $media->getKey();
        }, $request->file('images'));

        $room->attachMedia($media, ['image']);

        return Response::noContent();
    }

    public function destroy(Room $room, RoomUploadDestoryRequest $request)
    {
        $this->authorize('deleteMedia', $room);

        $validated = $request->validated();

        $room->media()
            ->whereIn('id', $validated['media_ids'])
            ->delete();

        return Response::noContent();
    }
}
