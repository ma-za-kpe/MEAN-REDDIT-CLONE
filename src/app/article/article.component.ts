import { Component, OnInit, HostBinding, Input } from "@angular/core";

import { Article } from "./article.model";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  @HostBinding("attr.class") cssClass = "row";

  constructor() {
    // this.article = new Article("Angular 2", "http://angular.io", 10);
  }
  voteUp(): boolean {
    this.article.votes += 1;
    return false;
  }
  voteDown(): boolean {
    this.article.votes -= 1;
    return false;
  }

  ngOnInit() {}
}
