import {observable} from 'mobx'

class signin {
    @observable email = '';
    @observable password = '';

    constructor(){

    }

    onChangeEmail = ({value}) => {
        this.email = value
    }

    onChangePassword = ({value}) => {
        this.password = value
    }

    onClickSignIn = async () => {
        let res = await S.client.signin(this.email, this.password)
        console.log(res)
        
    }
}

export {signin}