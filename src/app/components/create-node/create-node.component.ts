import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NetworkNode } from "../../model/networkNode";

@Component({
  selector: "app-create-node",
  templateUrl: "./create-node.component.html",
  styleUrls: ["./create-node.component.scss"]
})
export class CreateNodeComponent implements OnInit {
  node: NetworkNode = new NetworkNode();
  nodeForm: FormGroup;
  nodes: Array<NetworkNode> = [];

  constructor() {
    this.nodeForm = new FormGroup({
      name: new FormControl(this.node.name, Validators.required),
      address: new FormControl(this.node.address, Validators.required),
      stock: new FormControl(this.node.stock, Validators.email)
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.node.id = this.nodes.length;
    this.nodes.push(this.node);
    console.log("PUSHED!", this.nodes);
  }
}
