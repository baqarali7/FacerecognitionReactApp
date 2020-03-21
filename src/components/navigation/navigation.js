import React from 'react'

const navigation = ({ OnRouteChange, isSignedIn }) => {
    if(isSignedIn){
        return (
            <nav style = {{display: 'flex', justifyContent: "flex-end"}}>
                <p onClick = {() => OnRouteChange('signout')} className = "f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav style = {{display: 'flex', justifyContent: "flex-end"}}>
            <p onClick = {() => OnRouteChange('signin')} className = "f3 link dim black underline pa3 pointer">Sign In</p>
            <p onClick = {() => OnRouteChange('registor')} className = "f3 link dim black underline pa3 pointer">Registor</p>
            </nav>
        );
    }
}

export default navigation;