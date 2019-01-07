import {EventBus} from './EventBus';
class Util {
  constructor(controller) {
    console.log("Util class constructor");
    this.controller = controller;
    EventBus.addEventListener("setAssessmentUserData", () => {
      this.controller.setAssessmentUserData()
    });
    EventBus.addEventListener("completeScreen", () => {
      this.controller.completeScreen()
    });
  }
};
export default Util;
