import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { getBanners } from "../../../slice/banner.slice";

export const GetBanners = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = dispatch(getBanners());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return <></>;
};
