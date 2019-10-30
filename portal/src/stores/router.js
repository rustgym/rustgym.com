import { observable, action, toJS } from "mobx";
import {observe, setter} from 'mobx-decorators'


class router {
    @observable path = "";
    @observable state = null;
    constructor(){
        let hash = window.location.hash ? window.location.hash : "#home";
        this.path = hash;
        this.state = {};
        window.history.pushState(toJS(this.state), "", this.path);
        window.onpopstate = (event) => {
            if (window.location.hash) {
                this.state = event.state || {}
                this.path = window.location.hash || "#home";
            }else{
                this.navigate("#signin")
            }
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