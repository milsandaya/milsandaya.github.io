/******f**********
    
    Final Project Javascript
    Name: Milary Andaya
    Date: April 2020
    Last Updated: 04/27/2020
    Description: Handles the validation of form elements on the feedbackform in contact markup.

*****************/


/*
 * Handles the submit event of the survey form.
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	//Hide all error elements on the page
	hideErrors();

	//Determine if form has errors
	if(formHasErrors()){

		//Prevents submission
		e.preventDefault();
		//false prevents form from submitting
		return false;
	}

	return true;
}


/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Clear?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("name").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}


function formHasErrors()
{
	//Validate user entered required information
	var errorFlag = false;

	var requiredTextFields = ["name", "phone", "email"];

	for (var i = 0; i < requiredTextFields.length; i++){
		//get the textfield
		var textField = document.getElementById(requiredTextFields[i]);
		if(!formFieldHasInput(textField)){

			//error message (_error appends on)
			document.getElementById(requiredTextFields[i] + "_error").style.display = "block";

			//set focus on error
			if(!errorFlag){
				textField.focus();
				textField.select();
			}

			//Raise error flag
			errorFlag = true;
		}
	}

	//Validate valid email address was entered
	//Regular expressoin for an email address
	var regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

	var emailFieldValue = document.getElementById("email").value;

	//Determine if value passes email regex
	if(!regex.test(emailFieldValue)){
		document.getElementById("validemail_error").style.display = "block";

		if(!errorFlag){
			textField.focus();
			textField.select();
		}

		//Raise error flag
		errorFlag = true;
	}

	return errorFlag;
}


function formFieldHasInput(fieldElement)
{

	//Check if the text field has a value input
	if (fieldElement.value == null || trim(fieldElement.value) == "")
	{

		//invalid input
		return false;
	}

	//valid input
	return true;
}


/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	// Get an array of error elements
	var errorFields = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for ( var i = 0; i < errorFields.length; i++ )
	{
		// Hide the error element by setting it's display style to "none"
		errorFields[i].style.display = "none";
	}
}


function load()
{

	hideErrors();

	//Add event listener for the submit button
	document.getElementById("feedbackform").addEventListener("submit", validate, false);

	//Reset the form with the default 
	document.getElementById("feedbackform").reset();

	//Add event listener for the reset button
	document.getElementById("feedbackform").addEventListener("reset", resetForm, false);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load, false);