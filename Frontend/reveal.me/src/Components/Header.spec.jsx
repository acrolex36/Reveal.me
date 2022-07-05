import {describe, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Header from './Header'

describe("Header test", () => {
    test("Should show website name", () => {
        render(<Header></Header>);
        expect(screen.getByText(/Reveal.me/i)).toBeDefined()
    }, 10)
})