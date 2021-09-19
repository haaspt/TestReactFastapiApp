import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders correctly', () => {
    render(<App />)
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
});
