import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./actions";

export default async function Admin() {
  const client = await clerkClient();

  const users = (await client.users.getUserList()).data;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl shadow-2xl border border-neutral-800 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-neutral-800">
          <h1 className="text-xl sm:text-2xl font-semibold text-white">User Management</h1>
        </div>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:p-4 p-6 transition-all duration-200 hover:bg-neutral-800/50 ${
                users.indexOf(user) % 2 === 0
                  ? "bg-neutral-900/50"
                  : "bg-neutral-950/50"
              } ${users.indexOf(user) !== users.length - 1 ? "border-b border-neutral-800" : ""}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 w-full lg:w-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <div className="text-neutral-200 font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                </div>

                <div className="text-neutral-400 text-sm sm:text-base">
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </div>

                <div className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 w-fit">
                  {user.publicMetadata.role as string || 'No Role'}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <form action={setRole} className="flex-1 sm:flex-none">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
                  >
                    Make Admin
                  </button>
                </form>

                <form action={setRole} className="flex-1 sm:flex-none">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="teacher" name="role" />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
                  >
                    Make Teacher
                  </button>
                </form>

                <form action={removeRole} className="flex-1 sm:flex-none">
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all duration-200 shadow-lg hover:shadow-red-500/20"
                  >
                    Remove Role
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
