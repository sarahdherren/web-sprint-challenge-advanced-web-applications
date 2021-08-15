import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import ColorList from './ColorList';
import { resetRetrieveHandlers } from 'source-map-support';

export const testColors = [
    {
      color: "aliceblue",
      code: {
        hex: "#f0f8ff",
      },
      id: 1,
    },
    {
      color: "limegreen",
      code: {
        hex: "#99ddbc",
      },
      id: 2,
    },
    {
      color: "aqua",
      code: {
        hex: "#00ffff",
      },
      id: 3,
    },
    {
      color: "aquamarine",
      code: {
        hex: "#7fffd4",
      },
      id: 4,
    }];

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]} />)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testColors} />)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const{ rerender } = render(<ColorList colors={testColors} editing={true}/>)
    const editTrue = screen.queryByTestId('edit_menu');
    expect(editTrue).not.toBeNull();
    rerender(<ColorList colors={testColors} editing={false} />);
    const editFalse = screen.queryByTestId('edit_menu');
    expect(editFalse).toBeNull();
});
