import { observable } from "mobx";

class errors {
    @observable open = false;
    @observable status = null;

    onClickClose = () => {
        this.open = false;
    }
}

export {errors}