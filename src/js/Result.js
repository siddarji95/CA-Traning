import {EventBus} from './EventBus';
class Result {
  constructor() {
    console.log("Result class constructor");
  }
  init(_dataObj){
    this.dataObj=_dataObj
    this.score=this.dataObj.score;
    this.templateWrapper = $(this.dataObj.templateWrapper);
    $('.submitAssessmentDiv').css('display','none');
    const content = $('<div>', { id: '', class: 'content' });
    $(content).appendTo($(this.templateWrapper));

    const component = $('<div>', { id: '', class: 'componentContainer' });
    $(component).appendTo($(content));

    const mcqDiv = $('<div>', { id: '', class: 'component-left' });
    $(mcqDiv).css({
      width: '100%'
    });
    $(mcqDiv).appendTo($(component));

    const mcqContainer = $('<div>', { id: '', class: 'component-inner' });
    $(mcqContainer).appendTo($(mcqDiv));

    const mcqHeader = $('<div>', { id: '', class: 'mcqHeader' });
    $(mcqHeader).appendTo($(mcqContainer));

    const contentHeading = $('<div>', { id: '', class: 'contentHeading' });
    $(contentHeading).appendTo($(mcqHeader));
    $(contentHeading).html(this.dataObj.textData.heading);
    $(contentHeading).css({
      color: '#489fd4',
    });

    const contentDesc = $('<p>', { id: '', class: 'contentDesc' });
    $(contentDesc).appendTo($(mcqHeader));
    $(contentDesc).html(`You have finished the assessment.<br>You scored ${this.score} out of 3.`)
   }
}
export default Result;
