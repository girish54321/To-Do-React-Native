import 'react-native';
import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { LoginScreen, loginTetIds } from '../loginScreen';
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('test Login Screen', () => {
    it('Render Login screen', () => {
        const item = render(<LoginScreen />);
        expect(item).toBeTruthy();
        const rootView = item.getByTestId(loginTetIds.rootView);
        expect(rootView).toBeTruthy();
    });
});
