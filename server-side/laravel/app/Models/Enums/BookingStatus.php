<?php

namespace App\Models\Enums;

enum BookingStatus: int
{
    case AWAITING_PAYMENT = 1;
    case RESERVED = 2;
    case CANCELED = 3;
}
