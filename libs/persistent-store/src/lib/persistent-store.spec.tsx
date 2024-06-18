import { render } from '@testing-library/react';

import PersistentStore from './persistent-store';

describe('PersistentStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PersistentStore />);
    expect(baseElement).toBeTruthy();
  });
});
