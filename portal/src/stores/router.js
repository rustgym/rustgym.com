import { observable, action, toJS, computed } from 'mobx';

import {titles} from '../routes.js';

class router {
    @observable path = '';
    @observable search = '';
    @observable state = null;

    constructor(){
        let hash = window.location.hash ? window.location.hash : '#home';
        let search = window.location.search;
        this.path = hash;
        this.search = search;
        document.title = titles[hash];
        let url = `${this.search}${this.path}`;
        window.history.pushState(toJS(this.state), '', url);
        window.onpopstate = (event) => {
            let hash = window.location.hash ? window.location.hash : '#home';
            let search = window.location.search;
            let state = event.state;
            this.path = hash;
            this.search = search;
            this.state = state;
            document.title = titles[hash];
            console.log(this.state, search, hash)
        };
    }

    @computed get query() {
        return new URLSearchParams(this.search)
    }

    @action navigate(path, search='') {
        if (path.match(/^#(\w)+$/)) {
            this.path = path;
            this.search = search;
            let url = `${this.search}${this.path}`;
            window.history.pushState(toJS(this.state), '', url);
        }
    }

    @action redirect(path, search='') {
        if (path.match(/^#(\w)+$/)) {
            this.path = path;
            this.search = search;
            let url = `${this.search}${this.path}`;
            window.history.replaceState(toJS(this.state), '', url);
        }
    }
}

export { router }