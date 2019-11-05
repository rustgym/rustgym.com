import {observable} from 'mobx'

class auth {
    @observable email = '';
    @observable password = '';
    @observable session = null;
    @observable first_name = '';
    @observable last_name = '';
    @observable accepted = false;
    @observable invitation_id = '';
    @observable helperText = {};

    constructor(){

    }

    onChangeFirstName = ({value}) => {
        this.first_name = value
    }

    onChangeLastName = ({value}) => {
        this.last_name = value
    }

    onChangeEmail = ({value}) => {
        this.email = value
    }

    onChangePassword = ({value}) => {
        this.password = value
    }

    onChangeAccepted = ({checked}) => {
        this.accepted = checked;
    }

    onClickSignIn = () => {
        this.helperText = {};
        S.client.signin(this.email, this.password)
            .then(res => S.router.navigate('#home'))
            .catch(err => {
                if (err.status == 400){
                    this.helperText = err.helperText;
                }
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }

    onClickSendInvitation = () => {
        this.helperText = {};
        S.client.sendInvitation(this.email)
            .then(res => {S.feedback.success('Email Sent')})
            .catch(err => {
                if (err.status == 400){
                    this.helperText = err.helperText;
                }
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }

    onClickSignUp = () => {
        this.helperText = {};
        S.client.signup(this.invitation_id, this.email, this.password, this.first_name, this.last_name)
            .then(res => S.router.redirect("#home"))
            .catch(err => {
                if (err.status == 400){
                    this.helperText = err.helperText;
                }
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }

    onClickSignOut = () => {
        this.session = null;
        S.client.signout()
            .then(res => S.router.navigate('#signin'))
            .catch(err => {
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }

    loadSession = async () => {
        this.session = JSON.parse(await S.client.session());
    }

    loadInvitation = () => {
        let email = S.router.query.get('email') || '';
        console.log(email)
        this.email = email;
    }

    loadSignUp = () => {
        let id = S.router.query.get('id');
        let email = S.router.query.get('email');
        this.email = email;
        this.invitation_id = id;
    }
}

export {auth}