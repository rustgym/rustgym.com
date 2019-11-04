import {observable} from 'mobx'

class auth {
    @observable email = '';
    @observable password = '';
    @observable session = null;
    @observable first_name = '';
    @observable last_name = '';
    @observable accepted = false;
    @observable invitation_id = '';
    @observable helperTextInfo = '';
    @observable helperTextEmail = '';
    @observable helperTextPassword = '';

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
        this.error = false;
        S.client.signin(this.email, this.password)
            .then(res => S.router.navigate('#home'))
            .catch(err => {
                if (err.status == 400){
                    if (err.helperText.password) {
                        S.auth.helperTextPassword = err.helperText.password
                    }
                    if (err.helperText.email) {
                        S.auth.helperTextEmail = err.helperText.email
                    }
                    if (err.helperText.info) {
                        S.auth.helperTextInfo = err.helperText.info
                    }
                }
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }

    onClickSendInvitation = () => {
        this.error = false;
        S.client.sendInvitation(this.email)
            .then(res => {S.feedback.success('Email Sent')})
            .catch(err => {
                if (err.status == 400){
                    S.auth.error = true;
                }
                console.log(JSON.stringify(err, null, 2))
            })
        ;
    }

    onClickSignUp = () => {
        this.error = false;
        S.client.signup(this.invitation_id, this.email, this.password, this.first_name, this.last_name)
            .then(res => S.router.redirect("#home"))
            .catch(err => {
                console.log(err.response.text)
                S.feedback.error(err.response.text)
                // console.log(JSON.stringify(err, null, 2))
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
        this.email = S.router.query.get('email') || '';
    }

    loadSignUp = () => {
        let id = S.router.query.get('id');
        let email = S.router.query.get('email');
        this.email = email;
        this.invitation_id = id;
    }
}

export {auth}