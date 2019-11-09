import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NetworkNode } from "../../model/networkNode";
import LocalNodes from "../../data/nodes.json";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-create-node",
  templateUrl: "./create-node.component.html",
  styleUrls: ["./create-node.component.scss"]
})
export class CreateNodeComponent implements OnInit {
  node: NetworkNode = new NetworkNode();
  nodeForm: FormGroup;
  nodes: Array<NetworkNode> = [];

  constructor(private globalService: GlobalService) {
    if (this.nodes.length < 1) {
      this.nodes = globalService.getNodes();
    }
  }

  ngOnInit(): void {
    this.nodeForm = new FormGroup({
      name: new FormControl(this.node.name, Validators.required),
      address: new FormControl(this.node.address, Validators.required),
      stock: new FormControl(this.node.stock, Validators.required)
    });
  }
  onSubmit() {
    let n = this.nodeForm.value;
    n.id = this.nodes.length;
    this.nodes = this.globalService.addNode(n);
    console.log("PUSHED!", this.nodes);
  }
}
