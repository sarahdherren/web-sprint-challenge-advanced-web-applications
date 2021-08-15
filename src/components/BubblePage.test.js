import React from 'react';
import mockColorService from '../services/fetchColorService';
import { testColors } from './ColorList.test';
import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

jest.mock("../services/fetchColorService");

test("Renders without errors", () => {
    mockColorService.mockResolvedValueOnce({data: []})
    render(<BubblePage />)
    
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    mockColorService.mockResolvedValueOnce({data: testColors})
    //Keep in mind that our service is called on mount for this component.
   
    render(<BubblePage />)
    await waitFor(() => {
        expect(screen.getAllByTestId('color')).toHaveLength(4);
    })
    
});