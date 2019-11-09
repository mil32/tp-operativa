import { Component, OnInit } from "@angular/core";
import { FullNode } from "src/app/model/fullNode";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-show-nodes",
  templateUrl: "./show-nodes.component.html",
  styleUrls: ["./show-nodes.component.scss"]
})
export class ShowNodesComponent implements OnInit {
  nodes: Array<FullNode>;

  constructor(private globalService: GlobalService) {
    this.nodes = globalService.getFullNodes();
    console.log("Show [Building] >", this.nodes);
  }

  ngOnInit() {
    console.log("HOLIS", this.nodes);
  }
}
