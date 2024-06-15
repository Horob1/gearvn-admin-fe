import { Delete, Lock, SquarePen } from "lucide-react";
import { GetStaffs } from "./components/GetStaffs";
import { setCurrent } from "../../slice/staff.slice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AddStaffModal } from "./components/AddStaffModal";
import { EditStaffModal } from "./components/EditStaffModal";
import { DeleteStaffModal } from "./components/DeleteStaffModal";

export const AdminPage = () => {
  const staffs = useSelector((state: RootState) => state.admin.list);
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.admin.isLoading);
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-red-600">
          <Lock size={28} />
          <h1 className="text-2xl font-semibold">ADMIN</h1>
        </div>
        <AddStaffModal />
      </div>
      {!isLoading ? (
        <div className="flex flex-col gap-3 w-full">
          <div className="h-[500px] overflow-y-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>STAFFCODE</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                    <td>{item.staffCode}</td>{" "}
                    <td>
                      <label
                        htmlFor="update-staff-modal"
                        className="cursor-pointer"
                      >
                        <SquarePen
                          onClick={() => {
                            dispatch(setCurrent(item._id));
                          }}
                        />
                      </label>
                    </td>
                    <td>
                      <label
                        htmlFor="delete-staff-modal"
                        className="cursor-pointer"
                      >
                        <Delete
                          onClick={() => {
                            dispatch(setCurrent(item._id));
                          }}
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="skeleton h-[500px] rounded-md"></div>
      )}
      <DeleteStaffModal/>
      <EditStaffModal/>
      <GetStaffs />
    </div>
  );
};
