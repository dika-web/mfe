import React , {lazy, Suspense, useState, useEffect} from "react";
import { Router, Route, Switch , Redirect} from "react-router-dom";
import {createBrowserHistory} from 'history'
import Header from "./components/Header";
import Progress from "./components/Progress";


import { StylesProvider , createGenerateClassName} from "@material-ui/core/styles";


const MarketingLazy = lazy(()=> import('./components/MarketingApp'))
const AuthLazy = lazy(()=> import('./components/AuthApp'))
const DashboardLazy = lazy(()=> import('./components/DashboardApp'))



const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();
export default () => {
    const  [ isSignedIn, setIsSignin ] = useState(false);
    useEffect(() => {
        if(isSignedIn) {
            history.push('/dashboard')
        }

    }, [isSignedIn]);

    return  (
     <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header onSignOut={ () => setIsSignin(false)} isSignedIn={ isSignedIn } />
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path ="/auth">
                            <AuthLazy onSignIn ={()=> setIsSignin(true)}/>
                        </Route>
                        <Route path ="/dashboard" > 
                            {!isSignedIn && <Redirect to='/'/>}
                            <DashboardLazy />
                        </Route>
                        <Route path ="/" component= { MarketingLazy }/>
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
    </Router>
    )
}

