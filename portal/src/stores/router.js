import { observable, action, toJS } from "mobx";

class router {
    @observable path = "#signin";
    @observable state = {path: "#signin"};
    constructor(){
        window.history.pushState(toJS(this.state), "", this.path);
        window.onpopstate = (event) => {
            let path = event.state.path;
            this.path = path;
            this.state.path = path;
            console.log(this.path);
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