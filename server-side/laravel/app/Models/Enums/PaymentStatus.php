<?php

namespace App\Models\Enums;

enum PaymentStatus: int
{
    case AWAITING = 1;
    case PAID = 2;
    case FAILED = 3;
    case REFUNDED = 4;
}
