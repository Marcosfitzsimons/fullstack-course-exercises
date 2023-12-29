import { UsersTable } from "./UsersTable";

const Users = () => {
  return (
    <div className="w-8/12 mx-auto flex flex-col items-center justify-center">
      <h2 className="my-4 text-2xl">Users</h2>
      <div className="w-1/2 mx-auto">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
