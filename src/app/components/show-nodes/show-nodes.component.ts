import { Component, OnInit, Input } from "@angular/core";
import { FullNode } from "src/app/model/fullNode";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-show-nodes",
  templateUrl: "./show-nodes.component.html",
  styleUrls: ["./show-nodes.component.scss"]
})
export class ShowNodesComponent implements OnInit {
  @Input() globalService: GlobalService;
  nodes: Array<FullNode>;

  constructor() {}

  delete(id: any) {
    this.globalService.deleteConnection(id);
  }

  ngOnInit() {
    this.nodes = this.globalService.getFullNodes();
    this.globalService.fullNodes$.subscribe(resp => {
      console.log("= SHOW NOTIFIED=", resp);
      this.nodes = resp;
    });
  }
}
