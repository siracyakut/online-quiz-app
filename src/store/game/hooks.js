import { useSelector } from "react-redux";

export const useGame = () => useSelector((state) => state.game);
