import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TimeTable from './TimeTable';
import { ApolloProvider } from '@apollo/client'
import { client } from '../graphQL'
import '@testing-library/jest-dom/extend-expect'

test('renders search input label', () => {
    const { getByText } = render(
        <ApolloProvider client={client}>
            <TimeTable />
        </ApolloProvider>);
    const linkElement = getByText(/Hau/i);
    expect(linkElement).toBeInTheDocument();
});

