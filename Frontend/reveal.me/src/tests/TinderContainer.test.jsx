import TinderContainer from "../Components/TinderContainer";
import {fireEvent, getByTestId, render, screen} from '@testing-library/react';
import {FilteredUsers} from "../mocks/FilteredUsers.json"
import {UserData} from "../mocks/UserData.json"

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



})