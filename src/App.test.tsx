import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { ApolloProvider } from '@apollo/client'
import { client } from '../src/graphQL'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'



describe('<App />', () => {

  let component:any;

  beforeEach(() => { 
    component = render(
      <ApolloProvider client={client}>
      <App />
    </ApolloProvider>); 
  })

  test('renders search title', () => {
    /* const { getByText } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>); */


    const linkElement = component.getByText(/PYSÄKKIHAKU/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders content', () => {


    /*  component = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>);
 */

    const body = component.container.querySelector('body')
    //console.log(prettyDOM(body))
    // component.debug()

    // tapa 1
    expect(component.container).toHaveTextContent(
      'PYSÄKKIHAKU'
    )

    // tapa 2
    const element = component.getByText(
      'PYSÄKKIHAKU'
    )
    expect(element).toBeDefined()

    // tapa 3
    /*  const div = component.container.querySelector('body')
     expect(div).toHaveTextContent(
       'PYSÄKKIHAKU'
     ) */

  }); 
});

/* test('clicking the button calls event handler once', async () => {


  const mockHandler = jest.fn()

  const component = render(
    <ApolloProvider client={client}>
      <App /> */
/*  <StopSearch setStopName={() => console.log('SET STOP NAME')} getStopsByName={() => console.log('GET STOPS BY NAME')} />
 *//*  </ApolloProvider>);


const input = component.container.querySelector('input')
const form = component.container.querySelector('form')

fireEvent.change(input, {
target: { value: 'Norotie' }
})
fireEvent.submit(form)

expect(mockHandler.mock.calls).toHaveLength(0)
expect(mockHandler.mock.calls[0][0].content).toBe('Norotie')
}) */

