import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { FullNode } from "src/app/model/fullNode";

@Component({
  selector: "app-nodes-page",
  templateUrl: "./nodes-page.component.html",
  styleUrls: ["./nodes-page.component.scss"]
})
export class NodesPageComponent implements OnInit {
  selectedNodes: FullNode[] = [];
  response: any = undefined;
  constructor(private globalService: GlobalService) {}

  generateEconomicPath() {
    this.globalService.economicPath();
  }
  generateTravelAgent() {
    let response = this.globalService.travelAgent();
    response.path.splice(0, 1);
    this.response = response;
  }

  ngOnInit() {}
}
