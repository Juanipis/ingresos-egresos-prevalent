import Layout from '@/components/layout';
import apolloClient from '@/lib/apolloClient';
import { gql } from '@apollo/client';

// Definimos la consulta GraphQL para obtener usuarios
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

interface UsersProps {
  users: User[];
}

export default function Users({ users }: Readonly<UsersProps>) {
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

// Con getServerSideProps obtenemos los datos de la consulta GraphQL
export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_USERS_QUERY,
  });

  return {
    props: {
      users: data.users,
    },
  };
}
