import { Injectable } from '@angular/core';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import { IntrospectionFragmentMatcher } from 'apollo-client';

const networkInterface = createNetworkInterface('https://api.github.com/graphql');

@Injectable()
export class IssuesService{
   
    
    
}