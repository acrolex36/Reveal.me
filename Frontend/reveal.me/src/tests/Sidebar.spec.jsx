import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import Sidebar from '../Components/Sidebar'

describe("Sidebar test", () => {
    it("Should show all sidebar menu", () => {
        render(<Sidebar></Sidebar>);
        expect(screen.getByText(/My Profile/i)).toBeDefined()
        expect(screen.getByText(/Messages/i)).toBeDefined()
        expect(screen.getByText(/Explore Users/i)).toBeDefined()
        expect(screen.getByText(/Settings/i)).toBeDefined()
    }, 10)
    // it("Should all be clickable menu", () => {
    //     render(<Sidebar></Sidebar>);
    //     expect(screen.getByRole('link')).toBeInTheDocument();
    // }, 10)
})