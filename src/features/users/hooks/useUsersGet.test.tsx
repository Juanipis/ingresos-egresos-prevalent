import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USERS_QUERY } from '@/features/users/api/getUsers';
import { UserTable } from '@/components/users/UserTable';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

const mocks = [
  {
    request: {
      query: GET_USERS_QUERY,
    },
    result: {
      data: {
        users: mockUsers,
      },
    },
  },
];

it('renders user data after fetching', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserTable users={mockUsers} onEdit={jest.fn()} />
    </MockedProvider>
  );

  // Verifica que los usuarios se muestran una vez que se resuelve la consulta
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
});
