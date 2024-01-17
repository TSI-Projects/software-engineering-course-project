import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomManageComponent } from "./room-manage.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: 'room-manage',
        component: RoomManageComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomMangeRoutingModule { }