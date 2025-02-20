//Hooks
import useUsers from "../../hooks/users/useUsers";

const Users = () => {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log("Error fetching users", error.message);
  }
  return (
    <div className="users-container">
      <p>List of all users</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
