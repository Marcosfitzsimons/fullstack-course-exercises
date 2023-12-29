import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import usersService from "../services/users";
import loginService from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUserDispatch, useUserValue } from "../context/LoginContext";
import { sortedByMostBlogsCreated } from "../lib/utils";

export function UsersTable() {
  const { token } = useUserValue();

  usersService.setToken(token);

  const navigate = useNavigate();

  const userDispatch = useUserDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="w-8/12 mx-auto text-center my-2">loading data...</div>
    );
  }

  if (error) {
    if (error.response && error.response.status === 401) {
      loginService.logout();
      userDispatch({ type: "LOGOUT" });
      navigate("/login", { replace: true }); // Redirect to login
    } else {
      return error.message ? (
        <p>{error.message}</p>
      ) : (
        <p>
          Blog service not available due to specific problems. Try again later
        </p>
      ); // Handle other errors
    }
  }

  const users = data;

  return (
    <Table>
      <TableCaption>A list of users with basic information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Name</TableHead>
          <TableHead>Blogs created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedByMostBlogsCreated(users).map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
