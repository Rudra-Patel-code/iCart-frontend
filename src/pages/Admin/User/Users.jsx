import { useEffect } from "react";
import AdminHeader from "../Components/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  changeRole,
  deleteUser,
  getAllUsers,
} from "../../../redux/actions/utilsAction";
import Loader from "../../../utils/Loader";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
// import UserCard from "./UserCard";

const Users = () => {
  const dispatch = useDispatch();
  const {
    users,
    getUserLoading,
    roleLoading,
    changingId,
    deleteLoading,
    deletingId,
    message,
    error,
  } = useSelector((state) => state.utils);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  const roleChange = (id, role) => {
    dispatch(changeRole(id, role));
  };

  const userDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <AdminHeader />

      {getUserLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center text-xl border-b-2 w-fit px-3 mx-auto border-slate-400">
            List of All Users
          </h2>

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users?.map((user) => (
                        <tr key={user.userId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user._id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-wrap">
                            <div className="text-sm text-gray-900">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-wrap">
                            <div className="text-sm text-gray-900">
                              {user.role}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-wrap">
                            <div className="text-sm flex gap-3 text-gray-900">
                              <button
                                onClick={() => roleChange(user._id, user.role)}
                                className="border-2 flex flex-row bg-purple-600 text-white p-1 rounded-md"
                              >
                                {roleLoading &&
                                changingId?.toString() ===
                                  user._id.toString() ? (
                                  <span className="p-2">
                                    <FaSpinner className="animate-spin " />
                                  </span>
                                ) : (
                                  <>Change Role</>
                                )}
                              </button>
                              <button
                                onClick={() => userDelete(user._id)}
                                className="border-2 bg-red-600 text-white p-1 rounded-md"
                              >
                                {deleteLoading &&
                                deletingId?.toString() ===
                                  user._id.toString() ? (
                                  <span className="p-2">
                                    <FaSpinner className="animate-spin " />
                                  </span>
                                ) : (
                                  <>Delete</>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Users;
