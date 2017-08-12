import { Component, OnInit, Injectable } from '@angular/core';
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


@Injectable()
export class IssuesService {

  loading: boolean;
  issues: any;
  showHide: string = ' ';
  toggleButton: string = 'Expand';
  tempIssuesArray: object[] = [];

  constructor(private apollo: Apollo) {}


    query(){
        return this.apollo.watchQuery<QueryResponse>({
            query: query
          })
    }

}
