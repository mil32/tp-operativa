import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-nodes-page",
  templateUrl: "./nodes-page.component.html",
  styleUrls: ["./nodes-page.component.scss"]
})
export class NodesPageComponent implements OnInit {
  constructor(private globalService: GlobalService) {}

  ngOnInit() {}
}
