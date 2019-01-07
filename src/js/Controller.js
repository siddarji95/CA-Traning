class Controller {
  constructor() {
    console.log("Controller class constructor");
    this.currentScreen=  (localStorage['lastVisitedSlide'] || 0);
    this.templateClassObj;
  }
  set(model,view){
    this.model=model;
    this.view=view;
    if(this.model.slideData.lastVisitedSlide !== this.currentScreen){
      this.currentScreen = this.model.slideData.lastVisitedSlide;
    }
    let elemObj = {};
    let promise = new Promise(function (resolve, reject) {

      model.getCourseData((_activityData) => {
        elemObj.activityData = _activityData;
        model.getTextData((_textData) => {
          elemObj.textData = _textData;
          if (elemObj) {
            resolve(elemObj)
          }
        });
      });
    });
    promise.then((res) => {
      this.init(res.activityData,res.textData);
    });
  }
  init(activityData,textData){
    this.model.activityData=activityData;
    this.model.textData=textData;
    let currentScreenClass = this.model.activityData.courseStructure.screens[this.currentScreen].className;
    let screenName = this.model.activityData.courseStructure.screens[this.currentScreen].name;
    this.view.init();
    this.loadTemplate(currentScreenClass,screenName);

  }
  getActivityData(){
    return this.model.activityData;
  }
  getTextData(){
    return this.model.textData;
  }
  setAssessmentUserData(){
    console.log(this.model.assessmentUserData);
    this.model.assessmentUserData.slideScore[this.currentScreen]=this.templateObj.status;
    localStorage['assessmentUserData'] = JSON.stringify(this.model.assessmentUserData);
  }
  getScore(){
    return this.model.getScore();
  }
  resetAssessment(){
    this.destroy();
    $('#nextButtonDiv').css('display','');
    $('.submitAssessmentDiv').css('display','none');
    this.model.slideData = {
      lastVisitedSlide: 0
    };
     this.model.assessmentUserData= {
       slideScore: [],
       totalScore: 0
     };
    this.currentScreen=0;
    localStorage.removeItem('lastVisitedSlide');
    localStorage.removeItem('assessmentUserData');
    let currentScreenClass = this.model.activityData.courseStructure.screens[this.currentScreen].className;
    let screenName = this.model.activityData.courseStructure.screens[this.currentScreen].name;
    this.loadTemplate(currentScreenClass,screenName);
  }
  completeScreen(){
    console.log('completeScreen');
    $('#nextButton').removeClass('disabled');
    $('#nextButton').removeAttr('disabled');
    if(this.currentScreen==this.model.activityData.courseStructure.screens.length-2){
      $('#nextButtonDiv').css('display','none');
      this.completeAssessment();
    }
  }
  completeAssessment(){
    console.log("completeAssessment");
    $('.submitAssessmentDiv').css('display','');
  }
  nextScreen(){
    $('#nextButton').addClass('disabled');
    $('#nextButton').attr('disabled', 'true');
    console.log('nextScreen');
    this.destroy();
    this.currentScreen++;
    this.model.slideData.lastVisitedSlide++;
    localStorage['lastVisitedSlide'] =this.model.slideData.lastVisitedSlide;
    this.loadTemplate();
  }
  loadTemplate(){
    console.log('loadTemplate');
    this.currentScreenClass = this.model.activityData.courseStructure.screens[this.currentScreen].className;
    this.currentScreenName = this.model.activityData.courseStructure.screens[this.currentScreen].name;
    let dataObj={};
    let configData = this.getActivityData()
    let textData = this.getTextData()
    dataObj.activityData = configData[this.currentScreenName].activityData
    dataObj.textData = textData[this.currentScreenName];
    dataObj.screenName = this.currentScreenName;
    this.view.templateWrapper.attr('id',this.currentScreenClass);
    dataObj.templateWrapper = this.view.templateWrapper;
    dataObj.score = this.getScore();
    import(`./${this.currentScreenClass}`).then(module => {
            let template = module.default;
            this.templateObj = new template();
            this.templateObj.init(dataObj);
           console.log("loaded "+this.currentScreenName+" "+this.currentScreenClass);
    });
  }
  destroy() {
    console.log("destroy");
    $(this.view.templateWrapper).empty();

  }

}

export default Controller;
