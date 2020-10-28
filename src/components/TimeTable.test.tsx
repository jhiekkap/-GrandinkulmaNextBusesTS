import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react';
import TimeTable from './TimeTable';
import { ApolloProvider } from '@apollo/client'
import { client } from '../graphQL'



describe('<TimeTable />', () => {

    let component: any;

    beforeEach(() => {
        component = render(
            <ApolloProvider client={client}>
                <TimeTable />
            </ApolloProvider>);
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
        expect(component.container).toHaveTextContent(
            'Haun "Norotie" tulo- ja lähtöajat'
        );
    });
});