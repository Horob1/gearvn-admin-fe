import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { getStaffList } from "../../../slice/staff.slice";

export const GetStaffs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = dispatch(getStaffList());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return <></>;
};
