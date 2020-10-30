import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import { ApolloProvider } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing';
import { client, STOP_QUERY  } from '../src/graphQL'
import { prettyDOM } from '@testing-library/dom'




describe('<App />', () => {

  let component: any;

  beforeEach(() => {
    component = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>);
  });

  test('renders page title', () => {

    const body = component.container.querySelector('body')
    //console.log(prettyDOM(body))
    //component.debug()

    // tapa 1
    expect(component.container).toHaveTextContent('PYSÄKKIHAKU');

    // tapa 2
    const element = component.getByText('PYSÄKKIHAKU')
    expect(element).toBeDefined();
    expect(element).toBeInTheDocument();

    // tapa 3
    const app = component.container.querySelector('.App');
    expect(app).toHaveTextContent('PYSÄKKIHAKU');
  });


  test('fill and submit stop search form', async () => {

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
      target: { value: 'Norotie' }
    })
    fireEvent.submit(form)

    expect(component.container).toHaveTextContent(
      'Loading...'
    );
  });
});

