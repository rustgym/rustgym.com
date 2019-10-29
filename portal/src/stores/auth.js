import {observable} from 'mobx'

class auth {
    @observable email = "";
    @observable password = "";
    @observable error = false;
    @observable errMessage = "";

    constructor(){

    }

    onChangeEmail = ({value}) => {
        this.email = value
    }

    onChangePassword = ({value}) => {
        this.password = value
    }

    onClickSignIn = () => {
        S.client.signin(this.email, this.password)
            .then(res => S.router.navigate("#home"))
            .catch(err => {
                if (err.status == 400){
                    S.signin.error = true;
                }
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }
    onClickSignOut = () => {
        S.client.signout()
            .then(res => S.router.navigate("#signin"))
            .catch(err => {
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }
}

export {auth}