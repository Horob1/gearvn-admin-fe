import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { getMe } from "../slice/user.slice";

export const GetUserInfo = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = dispatch(getMe());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return <></>;
};
