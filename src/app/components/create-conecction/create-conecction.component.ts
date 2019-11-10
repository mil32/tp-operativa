import { Component, OnInit, Input } from "@angular/core";
import { Connection } from "src/app/model/connection";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GlobalService } from "src/app/services/global.service.js";

@Component({
  selector: "app-create-conecction",
  templateUrl: "./create-conecction.component.html",
  styleUrls: ["./create-conecction.component.scss"]
})
export class CreateConecctionComponent implements OnInit {
  @Input() globalService: GlobalService;
  connection: Connection = new Connection();
  connectionForm: FormGroup;

  constructor() {}

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
    let con = this.connectionForm.value;
    this.globalService.addConnection(con);
  }
}
