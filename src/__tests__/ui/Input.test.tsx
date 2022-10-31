import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import Input from '../../ui/Input';


test('changes the value of input element', async() => {
    // const [val, setVal] = useState('')
//   const onChange = setVal('Hello'); 
    const user = userEvent.setup();
    // const onChange = jest.fn().mockImplementation(() => {setVal('Hello')}); 
    const onChange = jest.fn();
  render(<Input type='text' value='' onChange={onChange} />);
  
//   const el = screen.getByRole('textbox');
//   fireEvent.change(el, {target: {value: 'Hello, World!'}})
//   userEvent.type(el, 'Hello, World!');
//   fireEvent.change(el);
   await user.type(screen.getByRole('textbox'), 'a');
    // {target: {value: 'Text'}});
   
//    userEvent.clear(screen.getByRole('textbox'))
//    expect(onChange).toHaveBeenCalled()
//    screen.debug();
   expect(screen.getByRole('textbox')).toHaveValue('')
//   expect().toBe('Hello');


//   expect(screen.queryByRole('textbox')).toBe('Hello, World!');
//   expect(el).toBe('Hello, World!');
//   expect(divEl).toBeInTheDocument;
})

// userEvent.type(input, 'matti')

// test('type', () => {
//   render(<textarea />)

//   userEvent.type(screen.getByRole('textbox'), 'Hello,{enter}World!')
//   expect(screen.getByRole('textbox')).toHaveValue('Hello,\nWorld!')
// })

// test('clear', async() => {
//     const user = userEvent.setup()
//   render(<MyComponent />)

//   await user.click(screen.getByRole('button', {name: /click me!/i}))
//     render(<textarea defaultValue="Hello, World!" />)
  
//     userEvent.clear(screen.getByRole('textbox'))
  
//     expect(screen.getByRole('textbox')).toHaveValue('')
//   })
// afterEach(cleanup);