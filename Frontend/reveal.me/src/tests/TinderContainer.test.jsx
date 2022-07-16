import TinderContainer from "../Components/TinderContainer";
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import {FilteredUsers} from "../../cypress/fixtures/FilteredUsers.json"
import {UserData} from "../../cypress/fixtures/UserData.json"

describe('TinderContainer test', () => {

    test('Filtereduser data should be fetched and displayed', async () => {
        render(<TinderContainer></TinderContainer>);
        expect(await screen.findByText(/Frontend/)).toBeDefined();
        expect(await screen.findByText(/David/)).toBeDefined();
        expect(await screen.findByText(/Jen/)).toBeDefined();
    });

    test('Remove from swipe should be called when swipe left', async () => {
        render(<TinderContainer></TinderContainer>);
        const rejectButton = await screen.getByTestId('swipeLeftButton');
        fireEvent.click(rejectButton);
    });

    // test('should call fetchData', () => {
    //     const fetchDataSpy = vi.spyOn(TinderContainer.prototype, 'fetchData');
    //     render(<TinderContainer/>);
    //     expect(fetchDataSpy).toHaveBeenCalledTimes(1)
    // });


})