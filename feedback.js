// defining function
function OnFormSubmit() {
    // function to display the feedback form with the email inputted
    console.log(document.feedbackform.Email.value);
    document.feedbackform.action = "mailto:" + document.feedbackform.Email.value;
}
