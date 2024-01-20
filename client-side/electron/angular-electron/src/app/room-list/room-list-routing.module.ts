import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomListComponent } from './room-list.component';
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: 'room-list',
        component: RoomListComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomListRoutingModule { }