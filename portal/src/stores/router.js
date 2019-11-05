import { observable, action, toJS, computed } from 'mobx';

import {title} from '../routes.js';

class router {
    @observable path = '';
    @observable search = '';
    @observable state = null;

    constructor(){
        let hash = window.location.hash 
        let parts = hash.split('?');
        this.path = parts[0] || '#home';
        this.search = '?' + (parts[1] || '');
        document.title = title(this.path);
        let url = `${this.path}${this.search}`;
        window.history.pushState(toJS(this.state), '', url);
        window.onpopstate = (event) => {
            let hash = window.location.hash 
            let parts = hash.split('?');
            this.search = '?' + (parts[1] || '');
            let state = event.state;
            this.path = parts[0] || '#home';
            this.state = state;
            document.title = title(this.path);
            console.log(this.state, this.search, this.path, hash)
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