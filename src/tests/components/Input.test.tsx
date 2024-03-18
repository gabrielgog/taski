import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '@/components/common/Input';

describe('Input component', () => {
  test('renders input with placeholder correctly', () => {
    const placeholderText = 'Enter text here';
    const { getByPlaceholderText } = render(<Input placeholder={placeholderText} value={''} />);
    const inputElement = getByPlaceholderText(placeholderText);
    expect(inputElement).toBeTruthy();
  });

  test('renders input with value correctly', () => {
    const value = 'Test Value';
    const { getByDisplayValue } = render(<Input value={value} />);
    const inputElement = getByDisplayValue(value);
    expect(inputElement).toBeTruthy();
  });

  test('triggers onChange event correctly', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" onChange={handleChange} value={''} />);
    const inputElement = getByPlaceholderText('Enter text');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('renders search icon correctly for type="search"', () => {
    const { getByAltText } = render(<Input type="search" value={''} />);
    const searchIcon = getByAltText('search-icon');
    expect(searchIcon).toBeTruthy();
  });
});
