import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';

import Register from './pages/Register';

import Profile from './pages/Profile';

import Newusers from './pages/Newusers';

import Rent from './pages/Rent';

import Rents from './pages/Rents';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />

                <Route path="/register" component={Register} />

                <Route path="/profile" component={Profile} />

                <Route path="/users/new" component={Newusers} />

                <Route path="/rent/new" component={Rent} />

                <Route path="/rents" component={Rents} />
            </Switch>  
        </BrowserRouter>
    );
}
