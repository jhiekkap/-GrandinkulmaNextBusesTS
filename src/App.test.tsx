import React from 'react';
import { render, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import { ApolloProvider } from '@apollo/client'
import { client } from '../src/graphQL'
import { prettyDOM } from '@testing-library/dom'

 
describe('<App />', () => { 

  let component:any;

  beforeEach(() => { 
    component = render(
      <ApolloProvider client={client}>
      <App />
    </ApolloProvider>); 
  });

  test('renders search title', () => {
      
    const linkElement = component.getByText(/PYSÄKKIHAKU/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders page title', () => { 
 
    const body = component.container.querySelector('body')
    //console.log(prettyDOM(body))
    //component.debug()

    // tapa 1
    expect(component.container).toHaveTextContent(
      'PYSÄKKIHAKU'
    );

    // tapa 2
    const element = component.getByText(
      'PYSÄKKIHAKU'
    )
    expect(element).toBeDefined();

    // tapa 3
     const app = component.container.querySelector('.App');
     expect(app).toHaveTextContent(
       'PYSÄKKIHAKU'
     ); 
  }); 
  test('renders search input label', () => {
    const inputLabel = component.getByText(/Hau/i);
    expect(inputLabel).toBeInTheDocument();
});


    test('fill and submit stop search form', async () => {

        const input = component.container.querySelector('input')
        const form = component.container.querySelector('form') 

        fireEvent.change(input, {
            target: { value: 'Norotie' }
        })
        fireEvent.submit(form)

        await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

        expect(component.container).toHaveTextContent(
            'Loading...'
        ); 
    });
});

