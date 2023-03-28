"use client";

import { Provider } from "react-redux";
import {store} from '../authentication-project/store/page';


export function Providers({children} : {children:React.ReactNode}) {


    console.log('-------providers',children)
    return <Provider store={store}>

{children}
    </Provider>
}