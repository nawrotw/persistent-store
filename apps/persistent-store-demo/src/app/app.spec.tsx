import { render, screen } from '@testing-library/react';

import { describe, it, expect } from "vitest";
import App from './app';
import { Provider } from "react-redux";
import { store } from "../store/store";
import { userEvent } from "@testing-library/user-event";

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Provider store={store}><App /></Provider>);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const user = userEvent.setup();

    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByTestId('primitive-values')).toHaveTextContent('Persisted: 0');

    // await user.click(screen.getByTestId("Increment counters"));
    // expect(screen.getByText(/Persisted: 1/gi)).toBeTruthy();

    //Increment counters
  });
});
