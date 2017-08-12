import { Component, OnInit } from '@angular/core';
import { IssuesService } from './issues.service'




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading: boolean;
  issues: any;
  showHide: string = ' ';
  tempIssuesArray: object[] = [];
  
  constructor(private _issuesService: IssuesService) {}


  extractIssues(issuesObject): void{
    for (let i=0; i < issuesObject.length; i++) {
        if(issuesObject[i].__typename == 'Issue'){
          this.tempIssuesArray.push(issuesObject[i]);
        }
    }
  } 
  toggleByID(id): void{
    if(this.showHide == id){
      this.showHide = ' ';
    }else{
      this.showHide = id;
    }
    
  }
  ngOnInit() {
    this._issuesService.query().subscribe(({data}) => {
      this.loading = data.loading;
      this.issues = data;
      console.log(this.issues)
      this.extractIssues(this.issues.search.nodes);
    }); ;
  }

}
