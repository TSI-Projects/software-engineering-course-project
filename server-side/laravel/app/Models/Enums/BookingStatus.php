<?php

namespace App\Models\Enums;

enum BookingStatus: int
{
    case RESERVED = 2;
    case CANCELED = 3;
}
