import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('it renders the flash message', () => {

  
  render(<App />)

  //navigate to the project page
  const linkElement = screen.getByText(/Project 444/)
  fireEvent.click(linkElement)
  expect(screen.getByText(/This is project id 444/)).toBeInTheDocument()

  //click the button which creates a flash message
  const button = screen.getByText(/Do Something/)
  fireEvent.click(button)

  //expect the flash message to be there
  expect(screen.getByText(/Flash message is Did something to object 444/)).toBeInTheDocument()
  
});
