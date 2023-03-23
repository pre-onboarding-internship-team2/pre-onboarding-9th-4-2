import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

configure({ asyncUtilTimeout: 5000 });

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
