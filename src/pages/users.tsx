import Layout from '@/components/layout';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query
const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  // Use Apollo's useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_USERS_QUERY);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users: User[] = data.users;

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
