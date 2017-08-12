import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IssuesService } from './issues.service';
import { AppComponent } from './app.component';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { IntrospectionFragmentMatcher } from 'apollo-client';

const networkInterface = createNetworkInterface('https://api.github.com/graphql');

const myFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "ISSUE",
          possibleTypes: [],
        }, // this is just an example, put your own INTERFACE and UNION types here!
      ],
    },
  }
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    req.options.headers.authorization = 'Bearer 12fcbf1a94aeba6a8d4cfd1ce771be46ade18366';
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher: myFragmentMatcher
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [IssuesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
