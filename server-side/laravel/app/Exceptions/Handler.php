<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Plank\Mediable\Exceptions\MediaUploadException;
use Plank\Mediable\HandlesMediaUploadExceptions;

class Handler extends ExceptionHandler
{
    use HandlesMediaUploadExceptions;

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->renderable(function (MediaUploadException $e) {
            return $this->transformMediaUploadException($e);
        });
    }
}
