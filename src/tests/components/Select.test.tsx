import React from 'react';
import { render } from '@testing-library/react';
import SelectDropdown from '@/components/common/Select';

describe('SelectDropdown component', () => {
  test('renders select dropdown with options correctly', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const value = 'Option 2';
    const { getByDisplayValue, getByText } = render(
      <SelectDropdown options={options} onSelect={() => {}} value={value} />
    );

    expect(getByDisplayValue(value)).toBeTruthy();
    options.forEach(option => {
      expect(getByText(option)).toBeTruthy();
    });
  });
});
