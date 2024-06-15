import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { getWarranties } from "../../../slice/warranty.slice";

export const GetWarranties = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = dispatch(getWarranties());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return <></>;
};
