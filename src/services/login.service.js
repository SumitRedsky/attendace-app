import {
    Subject
} from 'rxjs';

const isLogin = new Subject();
const isExpended = new Subject();
const isShowDialog = new Subject();

export const loginService = {

    // for show dialog
    showDialogs: state => isShowDialog.next(state),
    getShowDialogs: () => isShowDialog.asObservable(),

    // for login
    loggedIn: state => isLogin.next(state),
    getLoggedIn: () => isLogin.asObservable(),

    // for expension panel
    expended: state => isExpended.next(state),
    getExpanded: () => isExpended.asObservable(),

    

};