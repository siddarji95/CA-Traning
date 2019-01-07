class Model {
  constructor() {
    console.log("Model class constructor");
    console.log(localStorage['lastVisitedSlide']);
    if(localStorage['lastVisitedSlide']){
      let r = confirm("Do you want to resume!");
      if (r == false) {
        localStorage.removeItem('lastVisitedSlide');
        localStorage.removeItem('assessmentUserData');
      }
    }
    this.slideData = {
      lastVisitedSlide: (localStorage['lastVisitedSlide'] || 0)
    };
    if(localStorage['assessmentUserData'])
    this.assessmentUserData = JSON.parse(localStorage['assessmentUserData']);
    else{
      this.assessmentUserData= {
        slideScore: [],
        totalScore: 0
      };
    }
  }
  getScore() {
    //calculate
    this.assessmentUserData.totalScore=0;
    this.assessmentUserData.slideScore.forEach((element,index)=> {
      if(element){this.assessmentUserData.totalScore++}
    });
    return this.assessmentUserData.totalScore;
  }
  getCourseData(callback) {
    $.getJSON("../config/config.json", (_data) => {
    }).done((_data) => {
      callback(_data);
    }).fail(()=>{
      console.error("Error in loading config.json");
    })

  }
  getTextData(callback) {
    $.getJSON("../config/text.json", (_data) => {
    }).done((_data) => {
      callback(_data);
    }).fail(()=>{
      console.error("Error in loading text.json");
    })

  }
  setAssessmentData(_data){
    this.assessmentUserData=_data;
  }
  getAssessmentData(){
    return this.assessmentUserData;
  }
}
export default Model;
