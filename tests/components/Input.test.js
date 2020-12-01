import React from 'react';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import FakeTimers from '@sinonjs/fake-timers';

import Input from '../../src/components/Form/Input';
import { Default } from '../../src/components/Form/Input.stories';
import { act } from 'react-dom/test-utils';

describe('Input Component', () => {
  describe('Props', () => {
    test('Id prop sets id attribute of each input as expected', () => {
      render(<Input {...Default.args} />);

      expect(screen.getByLabelText(Default.args.label)).toHaveAttribute(
        'id',
        Default.args.id
      );
    });

    test('Label prop sets label of each input as expected', () => {
      render(<Input {...Default.args} />);

      expect(screen.getByLabelText(Default.args.label)).toBeInTheDocument();
    });

    test('Type prop sets the type of each input as expected', () => {
      const type = 'email';
      render(<Input {...Default.args} type={type} />);

      expect(screen.getByLabelText(Default.args.label)).toHaveAttribute(
        'type',
        'email'
      );
    });

    test('Type prop defaults to text', () => {
      render(<Input {...Default.args} />);

      expect(screen.getByLabelText(Default.args.label)).toHaveAttribute(
        'type',
        'text'
      );
    });

    test('Placeholder prop sets input placeholder as expected', () => {
      render(<Input {...Default.args} />);

      expect(
        screen.getByPlaceholderText(Default.args.placeholder)
      ).toBeInTheDocument();
    });

    test('Placeholder prop defaults to an empty string', () => {
      render(<Input {...Default.args} placeholder={undefined} />);

      expect(screen.getByLabelText(Default.args.label)).toHaveAttribute(
        'placeholder',
        ''
      );
    });

    test('Options prop sets miscellaneous input options as expected', () => {
      render(<Input {...Default.args} options={{ minLength: 10 }} />);

      expect(screen.getByLabelText(Default.args.label)).toHaveAttribute(
        'minLength',
        '10'
      );
    });

    test('Width prop sets component width as expected', () => {
      const width = '50%';
      render(<Input {...Default.args} width={width} />);

      expect(
        screen.getByTestId(`${Default.args.id}-input-wrapper`)
      ).toHaveStyleRule('width', '50%');
    });

    test('Width prop defaults to 100% of parent element', () => {
      render(<Input {...Default.args} />);

      expect(
        screen.getByTestId(`${Default.args.id}-input-wrapper`)
      ).toHaveStyleRule('width', '100%');
    });

    test('Border radius prop sets component border radius as expected', () => {
      const borderRadius = '0px';
      render(<Input {...Default.args} borderRadius={borderRadius} />);

      expect(
        screen.getByTestId(`${Default.args.id}-input-wrapper`)
      ).toHaveStyleRule('border-radius', '0px');
    });

    test('Border radius prop defaults to 12px', () => {
      render(<Input {...Default.args} />);

      expect(
        screen.getByTestId(`${Default.args.id}-input-wrapper`)
      ).toHaveStyleRule('border-radius', '12px');
    });

    test('Icon prop renders the proper icon', () => {
      const icon = 'person';
      const iconAltText = 'Person Icon';
      render(<Input {...Default.args} icon={icon} />);

      expect(screen.getByAltText(iconAltText)).toBeInTheDocument();
    });

    test('Icon prop defaults to null, resulting in no icon being rendered', () => {
      render(<Input {...Default.args} />);

      expect(screen.queryByAltText(/icon/i)).not.toBeInTheDocument();
    });

    test('If icon prop is not "location", "calendar", or "icon", it is seen as invalid and thus no icon is rendered', () => {
      const icon = 'hoax';
      render(<Input {...Default.args} icon={icon} />);

      expect(screen.queryByAltText(/icon/i)).not.toBeInTheDocument();
    });

    test('defaultValue prop sets the value of the input as expected', () => {
      const value = "I think I've seen this film before...";
      render(<Input {...Default.args} defaultValue={value} />);

      expect(screen.getByLabelText(Default.args.label)).toHaveValue(value);
    });

    test('defaultValue prop defaults to an empty string', () => {
      render(<Input {...Default.args} />);

      expect(screen.getByLabelText(Default.args.label)).toHaveValue('');
    });
  });

  describe('User Interactions', () => {
    let clock;

    beforeEach(() => {
      clock = FakeTimers.install();
    });

    afterEach(() => clock.uninstall());

    test('Validator function is called on input change', async () => {
      const validator = jest.fn();
      render(<Input {...Default.args} validator={validator} />);

      // Type input and advance clock by amount of debounce
      userEvent.type(screen.getByLabelText(Default.args.label), 'California');
      await act(async () => clock.tick(750));

      expect(validator).toHaveBeenCalledTimes(1);
    });

    test('Validator function is called is called on input blur', () => {
      const validator = jest.fn();
      render(<Input {...Default.args} validator={validator} />);

      // Put input field into focus
      userEvent.click(screen.getByLabelText(Default.args.label));
      expect(screen.getByLabelText(Default.args.label)).toHaveFocus();

      // Tab out of input field
      userEvent.tab();

      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
