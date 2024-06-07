import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { getPromotions } from "../../../slice/promotion.slice";

export const GetPromotions = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = dispatch(getPromotions());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return <></>;
};
