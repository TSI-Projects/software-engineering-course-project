import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { BookingComponent } from "./booking.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: 'book',
        component: BookingComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookingRoutingModule { }