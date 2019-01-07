import {EventBus} from './EventBus';
class MCSS {
  constructor() {
     console.log("MCSS class constructor");
  }
  init(_dataObj) {
    this.dataObj=_dataObj
    this.templateWrapper = $(this.dataObj.templateWrapper);
    this.ans;
    this.status;
    this.quiz();
  }
  quiz() {

    const component = $('<div>', { id: '', class: 'componentContainer' });
    $(component).appendTo($(this.templateWrapper));

    const mcqDiv = $('<div>', { id: '', class: 'component-left' });
    $(mcqDiv).appendTo($(component));

    const mcqContainer = $('<div>', { id: '', class: 'component-inner' });
    $(mcqContainer).appendTo($(mcqDiv));

    const mcqHeader = $('<div>', { id: '', class: 'mcqHeader' });
    $(mcqHeader).appendTo($(mcqContainer));

    const contentHeading = $('<div>', { id: '', class: 'contentHeading' });
    $(contentHeading).appendTo($(mcqHeader));
    $(contentHeading).html(`${this.dataObj.screenName.split('_')[1]}/${Object.keys(this.dataObj.textData.quizObj).length}`);
    $(contentHeading).css({
      color: '#489fd4',
    });

    const contentDesc = $('<p>', { id: '', class: 'contentDesc' });
    $(contentDesc).appendTo($(mcqHeader));
    $(contentDesc).html(this.dataObj.textData.quizObj.desc);

    const mcqOptionsDiv = $('<div>', { id: '', class: 'mcqOptionsDiv' });
    $(mcqOptionsDiv).appendTo($(mcqContainer));

    const option1 = this.mcqOption(this.dataObj.textData.quizObj.options[0]);
    $(option1).appendTo($(mcqOptionsDiv));

    const option2 = this.mcqOption(this.dataObj.textData.quizObj.options[1]);
    $(option2).appendTo($(mcqOptionsDiv));

    const option3 = this.mcqOption(this.dataObj.textData.quizObj.options[2]);
    $(option3).appendTo($(mcqOptionsDiv));

    const submitButtonDiv = $('<div>', { id: '', class: 'submitButtonDiv' });
    $(submitButtonDiv).appendTo($(mcqContainer));

    const submitButton = $('<button>', { id: '', class: 'submitButton' });
    $(submitButton).appendTo($(submitButtonDiv));
    $(submitButton).addClass('disabled');
    $(submitButton).attr('disabled', 'true');
    $(submitButton).html('Submit');

    $('html, body').animate({ scrollTop: document.body.scrollHeight }, 500);

     this.submitEvent = this.submit.bind(this);
    $(submitButton).on('click',this.submitEvent);
  }


  mcqOption(option) {
    const mcqItem = $('<div>', { id: '', class: 'mcqItem' });

    const circleDiv = $('<div>', { id: '', class: 'circleDiv' });
    $(circleDiv).appendTo($(mcqItem));

    const circle = $('<div>', { id: '', class: 'circle' });
    $(circle).appendTo($(circleDiv));

    const mcqContent = $('<div>', { id: '', class: 'mcqContent' });
    $(mcqContent).appendTo($(mcqItem));
    $(mcqContent).html(option);

    $(mcqItem).on('click', () => {
      $(mcqItem).addClass('selected');
      $(mcqItem).find('.circle').css({
        display: 'block'
      });
      $(mcqItem).siblings().find('.circle').css({
        display: 'none'
      });
      $(mcqItem).siblings().removeClass('selected');
      $(".submitButton").removeAttr("disabled").removeClass("disabled");
      this.ans = $(mcqItem).find('.mcqContent').text();

    });

    return mcqItem;
  }

  submit(event) {
    const submitButton = event.currentTarget;
    $(submitButton).addClass('disabled');
    $(submitButton).off('click');
    $(submitButton).css({
      'pointer-events': 'none'
    });
    $('.circleDiv').remove();
    $(submitButton).css({
      color: '#ccc'
    });
    $('.mcqItem').css({
      'pointer-events': 'none'
    });
    if(this.dataObj.textData.quizObj.correctAns == this.ans){
        console.log("true");
        this.status=true;
      }
      else{
        console.log("false");
        this.status=false;
      }
      EventBus.dispatch("setAssessmentUserData");
      EventBus.dispatch("completeScreen");
  }

}
export default MCSS;
