import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";

export default function UserDashboard() {
  const { dataUser, loading, error } = useUser();
  const { logout } = useLogout();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">User Information</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {dataUser && (
          <div className="mt-4">
            <p className="text-lg">Name: {dataUser.name}</p>
            <p className="text-lg">Email: {dataUser.email}</p>
            <p className="text-lg">Role: {dataUser.role}</p>
          </div>
        )}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">User Actions</h2>
          <button
            onClick={logout}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
