class View {
  constructor() {
    console.log("View class constructor");
    this.templateWrapper=undefined;
  }
  set(controller){
    this.controller = controller;
  }
  init(){
    let configData = this.controller.getActivityData();
    let textData = this.controller.getTextData();

    this.mainWrapper = $('<div>', { id: '', class: 'main_wrapper' });
    $(this.mainWrapper).appendTo($('body'));

    const heading = $('<div>', { class: 'heading' });

    const headingText = textData.heading;
    heading.append(headingText);
    this.mainWrapper.append(heading);

    const subHeading = $('<div>', { class: 'subHeading' });

    const subHeadingText = textData.subHeading;
    this.mainWrapper.append(subHeading);
    subHeading.append(subHeadingText);

    this.templateWrapper = $('<div>', { id: ''  , class: 'template_wrapper' });
    $(this.templateWrapper).appendTo($(this.mainWrapper));

    const nextButtonDiv = $('<div>', { id: 'nextButtonDiv', class: 'buttonDiv' });
    $(nextButtonDiv).appendTo($(this.mainWrapper));

    const nextButton = $('<button>', { id: 'nextButton', class: 'button' });
    $(nextButton).appendTo($(nextButtonDiv));
    $(nextButton).addClass('disabled');
    $(nextButton).attr('disabled', 'true');
    if ((this.count - 1) === 3) $(nextButton).html('Submit');
    else $(nextButton).html('Next');

    this.nextEvent = this.next.bind(this);
    $(nextButton).on('click',this.nextEvent);

    const resetButtonDiv = $('<div>', { id: 'resetButtonDiv', class: 'buttonDiv' });
    $(resetButtonDiv).appendTo($(this.mainWrapper));

    const resetButton = $('<button>', { id: 'resetButton', class: 'button' });
    $(resetButton).appendTo($(resetButtonDiv));
    $(resetButton).html('Reset');

    this.resetEvent = this.reset.bind(this);
    $(resetButton).on('click',this.resetEvent);

    const submitButtonDiv = $('<div>', { id: '', class: 'submitAssessmentDiv' });
    $(submitButtonDiv).appendTo($(this.mainWrapper));
    $(submitButtonDiv).css('display','none');

    const submitButton = $('<button>', { id: '', class: 'submitAssessment' });
    $(submitButton).appendTo($(submitButtonDiv));
    $(submitButton).html('Submit assessment');

     this.submitEvent = this.next.bind(this);
    $(submitButton).on('click',this.submitEvent);

  }
  reset() {
    this.controller.resetAssessment();
  }
  next(){
    this.controller.nextScreen();
  }


}
export default View;
