import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onNavigate , defaultHistory}) => {
    const history = defaultHistory || createMemoryHistory()

    if(onNavigate) {
         history.listen(onNavigate)
    }

     ReactDOM.render(
        <App history={history}/>, el
    )

    return  {
        onParentNavigate({pathname: nextPathName}) {
            const {pathname} = history.location

            if(pathname !== nextPathName) {
                history.push(nextPathName)
            }
        }
    }
}

if (process.env.NODE_ENV === "development") {
    const devRoot = document.querySelector('#_marketing-dev-root')
   
    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory()})
    }

}




export { mount }