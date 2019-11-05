import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { CreateNodeComponent } from "./components/create-node/create-node.component";
import { CreateConecctionComponent } from "./components/create-conecction/create-conecction.component";
import { ShowNodesComponent } from "./components/show-nodes/show-nodes.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreateNodeComponent,
    CreateConecctionComponent,
    ShowNodesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
