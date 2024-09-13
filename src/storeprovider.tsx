import {Provider} from 'react-redux';
import {store} from './hooks';
import {ReactNode} from 'react';

export type InferredStore = typeof store;
export function StoreProvider({children}: {children: ReactNode}): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
