import { Component, OnInit } from "@angular/core";
import { Connection } from "src/app/model/connection";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import LocalConnections from "../../data/connections.json";

@Component({
  selector: "app-create-conecction",
  templateUrl: "./create-conecction.component.html",
  styleUrls: ["./create-conecction.component.scss"]
})
export class CreateConecctionComponent implements OnInit {
  connection: Connection = new Connection();
  connectionForm: FormGroup;
  connections: Array<Connection> = [];

  constructor() {
    if (this.connections.length < 1) {
      this.connections = LocalConnections;
    }
  }

  ngOnInit(): void {
    this.connectionForm = new FormGroup({
      originNode: new FormControl(
        this.connection.originNode,
        Validators.required
      ),
      endNode: new FormControl(this.connection.endNode, Validators.required),
      distance: new FormControl(this.connection.distance, Validators.required)
    });
  }

  onSubmit() {
    this.connection = this.connectionForm.value;
    this.connection.id = this.connections.length;
    this.connections.push(this.connection);
    console.log("PUSHED!", this.connections);
  }
}
