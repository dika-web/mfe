import React , {lazy, Suspense} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";


import { StylesProvider , createGenerateClassName} from "@material-ui/core/styles";
import { useState } from "react";


const MarketingLazy = lazy(()=> import('./components/MarketingApp'))
const AuthLazy = lazy(()=> import('./components/AuthApp'))


const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})


export default () => {
    const  [ isSignedIn, setIsSignin ] = useState(false);
    return  (
    <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
            <div>
                < Header onSignOut={()=> setIsSignin(false)} isSignedIn={isSignedIn} />
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path ="/auth">
                             <AuthLazy onSignIn ={()=> setIsSignin(true)}/>
                        </Route>
                        <Route path ="/" component= {MarketingLazy}/>
                    </Switch>
                </Suspense>
            </div>
        </BrowserRouter>
    </StylesProvider>
    )
}

