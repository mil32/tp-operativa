import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { NodesPageComponent } from "./pages/nodes-page/nodes-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "nodes", component: NodesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
