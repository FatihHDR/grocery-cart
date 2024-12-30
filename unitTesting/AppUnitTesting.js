import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  
  beforeEach(() => {
    render(<App />);
  });

  
  test('renders grocery bud heading', () => {
    const heading = screen.getByText(/grocery bud/i);
    expect(heading).toBeInTheDocument();
  });

  
  test('shows alert when input is empty and submitted', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    const alertMessage = screen.getByText(/please enter value/i);
    expect(alertMessage).toBeInTheDocument();
  });

  
  test('adds item to the list', () => {
    const input = screen.getByPlaceholderText(/e.g. eggs/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'eggs' } });
    fireEvent.click(submitButton);

    const listItem = screen.getByText(/eggs/i);
    expect(listItem).toBeInTheDocument();
  });

  
  test('edits an item in the list', () => {
    const input = screen.getByPlaceholderText(/e.g. eggs/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'eggs' } });
    fireEvent.click(submitButton);

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    fireEvent.change(input, { target: { value: 'milk' } });
    fireEvent.click(submitButton);

    const updatedItem = screen.getByText(/milk/i);
    expect(updatedItem).toBeInTheDocument();
  });

  
  test('removes an item from the list', () => {
    const input = screen.getByPlaceholderText(/e.g. eggs/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'eggs' } });
    fireEvent.click(submitButton);

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    const listItem = screen.queryByText(/eggs/i);
    expect(listItem).not.toBeInTheDocument();
  });

  
  test('clears the list', () => {
    const input = screen.getByPlaceholderText(/e.g. eggs/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'eggs' } });
    fireEvent.click(submitButton);

    const clearButton = screen.getByRole('button', { name: /clear items/i });
    fireEvent.click(clearButton);

    const listItem = screen.queryByText(/eggs/i);
    expect(listItem).not.toBeInTheDocument();
  });

});