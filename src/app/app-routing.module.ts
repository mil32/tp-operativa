import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CreateNodeComponent } from "./components/create-node/create-node.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "createNode", component: CreateNodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
