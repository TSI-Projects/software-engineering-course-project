import { RouterModule, Routes } from "@angular/router";
import { RoomComponent } from "./room.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: 'room',
        component: RoomComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomRoutingModule { }