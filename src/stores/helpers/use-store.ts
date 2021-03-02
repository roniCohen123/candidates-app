import { useContext } from 'react';
import { StoreContext } from './store-provider';
import RootStore from "../root-store";

export const useStore = (): RootStore => {
	return useContext(StoreContext);
};
