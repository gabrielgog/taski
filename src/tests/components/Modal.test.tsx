import React from 'react';
import { render } from '@testing-library/react';
import Modal from '@/components/common/Modal';

describe('Modal component', () => {
  test('renders modal when isOpen is true', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(getByText('Modal Content')).toBeTruthy();
  });

  test('does not render modal when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(queryByText('Modal Content')).toBeNull();
  });
});
