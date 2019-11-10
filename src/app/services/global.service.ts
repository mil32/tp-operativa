import { Injectable } from "@angular/core";
import { NetworkNode } from "../model/networkNode";
import { Connection } from "../model/connection";
import { FullNode } from "../model/fullNode";
import LocalNodes from "../data/nodes.json";
import LocalConnections from "../data/connections.json";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  private nodes = new Array<NetworkNode>();
  private connections = new Array<Connection>();
  private fullNodes = new Array<FullNode>();
  private selectedNodes: NetworkNode[] = [];
  private startNode: string;
  private endNode: string;

  fullNodesSubject: BehaviorSubject<FullNode[]>;
  fullNodes$: Observable<FullNode[]>;

  constructor() {
    this.nodes = LocalNodes.map(
      n =>
        new NetworkNode(n.id, n.name, n.address, n.stock, n.isInitial, n.isEnd)
    );
    this.connections = LocalConnections.map(
      conn =>
        new Connection(conn.id, conn.originNode, conn.endNode, conn.distance)
    );
    this.fullNodesSubject = new BehaviorSubject<FullNode[]>(this.fullNodes);
    this.fullNodes$ = this.fullNodesSubject.asObservable();
    this.setFullNodes();
  }

  setFullNodes(selectedNodes: NetworkNode[] = this.nodes): void {
    console.log("[Building Full Nodes]");
    let finalArray: FullNode[] = [];

    selectedNodes.forEach(node => {
      finalArray.push(new FullNode(node, this.connections));
    });
    this.fullNodes = finalArray;
    this.fullNodesSubject.next(this.fullNodes);
  }

  getFullNodes(selectedNodes: NetworkNode[] = this.nodes): FullNode[] {
    this.setFullNodes(selectedNodes);
    return this.fullNodes;
  }

  getConnections(): Connection[] {
    return this.connections;
  }

  deleteConnection(id: number): void {
    this.connections = this.connections.filter(conn => conn.id != id);
    this.setFullNodes();
  }

  deleteNode(id: number): void {
    this.nodes = this.nodes.filter(node => node.id != id);
    this.connections = this.connections.filter(conn => conn.originNode != id);
    this.connections = this.connections.filter(conn => conn.endNode != id);
    this.setFullNodes();
  }

  getNodes(): NetworkNode[] {
    return this.nodes;
  }

  addNode(n: any): void {
    this.nodes.push(
      new NetworkNode(
        this.nodes.length,
        n.name,
        n.address,
        n.stock,
        n.isInitial,
        n.isEnd
      )
    );
    console.log("[GS] NODE ADDED >", this.nodes, this.connections);
    this.setFullNodes();
  }

  addConnection(con: any): void {
    this.connections.push(
      new Connection(
        this.connections.length,
        con.originNode,
        con.endNode,
        con.distance
      )
    );
    console.log("[GS] CONN ADDED >", this.nodes, this.connections);
    this.setFullNodes();
  }

  toggleStartNode(id: string): void {
    this.startNode = id;
    console.log("[START]> ", this.startNode);
  }
  toggleEndNode(id: string): void {
    this.endNode = id;
    console.log("[END]> ", this.endNode);
  }

  toggleNode(fullnode: any): void {
    if (this.selectedNodes.includes(fullnode)) {
      let index = this.selectedNodes.indexOf(fullnode);
      this.selectedNodes.splice(index, 1);
    } else {
      this.selectedNodes.push(fullnode);
    }
  }

  economicPath(): void {
    console.log("[ECONOMIC]", this.selectedNodes);
    console.log("[start / end]", this.startNode, this.endNode);
  }

  travelAgent(): void {
    console.log("[TRAVEL AGENT]", this.fullNodes);
  }
}
