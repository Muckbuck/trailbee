import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';


const query = gql`{
  search(query: "language:JavaScript", type: ISSUE, first: 20) {
    nodes {
      ... on Issue {
        createdAt
        title
        url
        id
        bodyText
        repository {
          url
        }
        author {
          avatarUrl
          url
        }
      }
    }
  }
}
`;

interface QueryResponse{
  issues
  loading
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading: boolean;
  issues: any;
  showHide: string = ' ';
  toggleButton: string = 'Expand';
  tempIssuesArray: object[] = [];

  constructor(private apollo: Apollo) {}

  extractData(issuesObject): void{
    for (let i=0; i < issuesObject.length; i++) {
        if(issuesObject[i].__typename == 'Issue'){
          this.tempIssuesArray.push(issuesObject[i])
        }
    }
  } 
  toggleByID(id): void{
    if(this.showHide == id){
      this.showHide = ' ';
      this.toggleButton = 'Expand';
    }else{
      this.showHide = id;
      this.toggleButton = 'Minimize';
    }
    
  }
  ngOnInit() {
    this.apollo.watchQuery<QueryResponse>({
      query: query
    }).subscribe(({data}) => {
      this.loading = data.loading;
      this.issues = data;
      console.log(this.issues.search.nodes)
      this.extractData(this.issues.search.nodes);
    });
  }

}
