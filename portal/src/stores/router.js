import { observable, action, toJS } from "mobx";

class router {
    @observable path = "";
    @observable state = null;
    constructor(){
        let hash = window.location.hash ? window.location.hash : "#home";
        this.path = hash;
        this.state = {};
        window.history.pushState(toJS(this.state), "", this.path);
        window.onpopstate = (event) => {
            this.state = event.state || {}
            this.path = window.location.hash;
        }; 
    }

    @action navigate(path) {
        if (path.match(/^#(\w)+$/)) {
            this.path = path;
            this.state.path = path;
            window.history.pushState(toJS(this.state), "", this.path);    
        }
    }
}

export { router }