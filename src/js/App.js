import Model from './Model';
import View from './View';
import Controller from './Controller';
import Util from './Util';
import '../css/App.css'

class App {
  constructor() {
    console.log("APP class constructor");
    this.controller = new Controller();
    let model = new Model();
    let view = new View();

    this.controller.set(model,view)
    view.set(this.controller)

  }
}
let app = new App();
let utilObj = new Util(app.controller)
