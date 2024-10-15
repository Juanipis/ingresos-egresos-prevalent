import Layout from '@/components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { withAuth, WithAuthProps } from '@/utils/withAuth'; // Asegurarse de importar el tipo WithAuthProps
import client from '@/lib/apolloClient';
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

// Definimos el tipo que incluirá los usuarios en los props
type UsersProps = WithAuthProps & {
  users: Array<{ id: string; name: string; email: string; role: string }>;
};

export default function Users({
  authData,
  users,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <Layout authData={authData}>
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

export const getServerSideProps = withAuth(async (ctx) => {
  // Hacemos la consulta de usuarios desde Apollo Client
  const { data } = await client.query({
    query: GET_USERS_QUERY,
  });

  return {
    props: {
      users: data.users, // Pasamos los usuarios como prop
    },
  };
}) as unknown as GetServerSideProps<UsersProps>; // Ajustar los tipos para incluir users
