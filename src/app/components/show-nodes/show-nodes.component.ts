import { Component, OnInit, Input, Output } from "@angular/core";
import { FullNode } from "src/app/model/fullNode";
import { GlobalService } from "src/app/services/global.service";
import { EventEmitter } from "events";
import { NetworkNode } from "src/app/model/networkNode";

@Component({
  selector: "app-show-nodes",
  templateUrl: "./show-nodes.component.html",
  styleUrls: ["./show-nodes.component.scss"]
})
export class ShowNodesComponent implements OnInit {
  @Input() globalService: GlobalService;
  @Output() selectedEvent = new EventEmitter();
  nodes: Array<FullNode>;

  constructor() {}

  toggleStartNode(id: string) {
    this.globalService.toggleStartNode(id);
  }
  toggleEndNode(id: string) {
    this.globalService.toggleEndNode(id);
  }

  toggleSelected(id: any) {
    this.globalService.toggleNode(id);
  }

  deleteConnection(id: any) {
    this.globalService.deleteConnection(id);
  }

  deleteNode(id: any) {
    this.globalService.deleteNode(id);
  }

  ngOnInit() {
    this.nodes = this.globalService.getFullNodes();
    this.globalService.fullNodes$.subscribe(resp => {
      console.log("= SHOW NOTIFIED=", resp);
      this.nodes = resp;
    });
  }
}
