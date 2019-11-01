import { observable } from 'mobx';

class feedback {
    @observable openError = false;
    @observable openSuccess = false;
    @observable successMessage = '';
    @observable errorMessage = '';
    @observable status = null;

    success = (message) => {
        this.openSuccess = true;
        this.successMessage = message;
    }

    error = (message) => {
        this.openError = true;
        this.errorMessage = message;
    }

    onClickCloseError = () => {
        this.openError = false;
        this.errorMessage = '';
    }

    onClickCloseSuccess = (message) => {
        this.openSuccess = false;
        this.successMessage = '';
    }

    onCloseAll = () => {
        this.openError = false;
        this.openSuccess = false;
    }
}

export {feedback}