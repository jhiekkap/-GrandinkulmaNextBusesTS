import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopSearch from './StopSearch';


describe('<TimeTable />', () => {

    let component: any;

    beforeEach(() => {

        const setStopName = () => console.log('SETTING STOP NAME')
        const getStopsByName = () => console.log('GETTING STOPS BY NAME')

        component = render(
            <StopSearch setStopName={setStopName} getStopsByName={getStopsByName} />
        );
    });

    test('renders button label', () => {
        const buttonLabel = component.getByText(/Lähetä/i);
        expect(buttonLabel).toBeInTheDocument();
    }); 
});