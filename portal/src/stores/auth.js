import {observable} from 'mobx'

class auth {
    @observable email = "";
    @observable password = "";
    @observable error = false;
    @observable errMessage = "";
    @observable session = null;

    constructor(){

    }

    onChangeEmail = ({value}) => {
        this.email = value
    }

    onChangePassword = ({value}) => {
        this.password = value
    }

    onClickSignIn = () => {
        S.auth.error = false;
        S.client.signin(this.email, this.password)
            .then(res => S.router.navigate("#home"))
            .catch(err => {
                if (err.status == 400){
                    S.auth.error = true;
                }
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }
    onClickSignOut = () => {
        S.auth.session = null;
        S.client.signout()
            .then(res => S.router.navigate("#signin"))
            .catch(err => {
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }
    loadSession = async () => {
        console.log("loadSession");
        S.auth.session = JSON.parse(await S.client.session());
    }
}

export {auth}