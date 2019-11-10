import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NetworkNode } from "../../model/networkNode";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-create-node",
  templateUrl: "./create-node.component.html",
  styleUrls: ["./create-node.component.scss"]
})
export class CreateNodeComponent implements OnInit {
  @Input() globalService: GlobalService;
  node: NetworkNode = new NetworkNode();
  nodeForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.nodeForm = new FormGroup({
      name: new FormControl(this.node.name, Validators.required),
      address: new FormControl(this.node.address, Validators.required),
      stock: new FormControl(this.node.stock, Validators.required)
    });
  }
  onSubmit() {
    let n = this.nodeForm.value;
    this.globalService.addNode(n);
  }
}
