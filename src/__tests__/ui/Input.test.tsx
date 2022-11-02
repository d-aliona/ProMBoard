import React, {useState} from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import Input from '../../ui/Input';

// afterEach(cleanup);

const Wrapper = (props: {children: React.ReactNode}) => {
  const [val, setVal] = useState('');

  return (
    <Input 
      type='text' 
      value={val} 
      onChange={(e) => {
        setVal(e.target.value);
      }} 
    />
  )
}

test('changes the value of input element', async() => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    const { getByRole } = render(
      <Wrapper>
        <Input type='text' value='' onChange={onChange} />
      </Wrapper>);

    // expect(getByRole("textbox").textContent).toBe('');
    // fireEvent.change(getByRole("textbox"), {target: {value: 'Text' }});
    // const el = await screen.findByRole("textbox");
    // expect((el as HTMLInputElement).value).toBe('Text');
    const input = getByRole('textbox');
    expect(input.textContent).toBe('');
    await user.type(input, 'Test');
    const inputChanged = await screen.findByRole("textbox");
    expect((inputChanged as HTMLInputElement).value).toBe('Test')
})
