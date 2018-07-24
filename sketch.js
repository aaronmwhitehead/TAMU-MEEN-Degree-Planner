//This function provides the sortable functionality of the semesters
$( function() {
	$( ".semester" ).sortable({
		connectWith: ".semester",
		items: '> li',
	    	revert: true
	}).disableSelection();
} );

//This is a shorthand for writing "document.getElementById(id)"
function _(id){
	return document.getElementById(id);
}

//This is a shorthand for writing "document.createElement(element)"
function create(element){
	return document.createElement(element);
}

function append()
{
	for(var i = 1; i < arguments.length; i++)
		arguments[0].appendChild(arguments[i]);
}

//Array of all engineering degree plans
var degreePlans = data.degree_plans;

//for loop to sort through all courses in specified degree plan
for(var i = 0; i < degreePlans[0].courses.length; i++)
{
	// Creating divs and list items to display course info
	var course = degreePlans[0].courses[i];
	var parentSemester = _(course.semester);
	var hoursCircle = create("DIV");
	var courseBox = create("LI");
	var prereqsBox = create("DIV");
	var coreqsBox = create("DIV");
	var infoCircle = create("I");
	var close = create("I");
	var descriptionBox = create("DIV");
	var title = create("H2");
	var header = create("H3");
	var body = create("P");
	var footer = create("H3");

	// hoursCircle is the small circle above the course name that displays the course hours
	hoursCircle.setAttribute("class", "hoursCircle");
	hoursCircle.innerHTML = course.hours;

	courseBox.setAttribute("id", course.id);
	courseBox.setAttribute("class", course.class);
	courseBox.dataset.hours = course.hours;
	//courseBox.dataset.description = [course.display_name, course.description_title, course.description_header, course.description_body, course.description_footer];
	//var description = courseBox.dataset.description.split(",");
	//console.log(description[0])
	courseBox.innerHTML = course.display_name + "<br>" + course.full_name;

	courseBox.appendChild(hoursCircle);


	//=========== Creating the Description Box ================
	descriptionBox.setAttribute("class","descriptionBox");
	close.setAttribute("class","fa fa-times");
	close.setAttribute("id","close-icon");
	close.setAttribute("onclick","closeDescription(event)");
	courseBox.appendChild(descriptionBox);
	title.innerHTML = course.description_title;
	header.innerHTML = course.description_header;
	body.innerHTML = course.description_body;
	footer.innerHTML = course.description_footer;
	append(descriptionBox, close, title, header, body, footer);
	//=========================================================


	//==== Add and change prereqs and coreqs only if they exist =====
	if(course.prereqs != ""){
		prereqsBox.setAttribute("id",course.prereqs_id);
		prereqsBox.setAttribute("class", "prereqs");

		for(var j = 0; j < course.prereqs.length; j++)
			prereqsBox.innerHTML += course.prereqs[j] + " ";
		courseBox.appendChild(prereqsBox);
	}

	if(course.coreqs != ""){
		coreqsBox.setAttribute("id",course.coreqs_id);
		coreqsBox.setAttribute("class","coreqs");

		for(var k = 0; k < course.coreqs.length; k++)
			coreqsBox.innerHTML += course.coreqs[k] + " ";
		courseBox.appendChild(coreqsBox);
	}
	//===============================================================


	//======== Append Course to Semester ==============
	parentSemester.appendChild(courseBox);
	//=================================================


	//============================ Color code ==============================
	if(course.core_course)
	{
		_(course.id).style.background = "#F4AF00";
	}

	if(course.major_specific)
	{
		_(course.id).style.background = "lightgrey";
	}

	if(course.freshman_year)
	{
		_(course.id).style.background = "radial-gradient(white,#104554)";
	}
	//======================================================================


	//====== Change positions of prereq/coreq boxes ======
	if(course.coreqs != "" && course.prereqs != "")
	{
		_(course.prereqs_id).style.top = "48px";
		_(course.coreqs_id).style.top = "68px";
	}
	//====================================================


	//=============== Small info circle ==================
	courseBox.appendChild(infoCircle);
	infoCircle.setAttribute("class","fa fa-info-circle");
	infoCircle.setAttribute("id", "info-icon");
	infoCircle.setAttribute("onclick","openDescription(event)");
	//====================================================
}


function checkCourses()
{	
	// var hoursBox = create("P");
	// var semesters = document.getElementsByClassName("semester");

	// for(var i = 0; i < semesters.length; i++)
	// {
	// 	for(var j = 0; j < semesters[i].children.length; j++)
	// 		//console.log(semesters[i].children[j]);
	// }
}


function closeDescription(event)
{
	event.target.parentNode.style.visibility = "hidden";
}

function openDescription(event)
{
	event.target.parentNode.children[2].style.visibility = "visible";
}

function addSemester(event){
	var semesterID = _(event.target.getAttribute("id"));
	var semesters = _("semesters");
	newSemester = create("UL");

	switch(semesterID.getAttribute("id")){
		case "Summer 1":
			newSemester.setAttribute("id", "semester25")
			semesters.insertBefore(newSemester, _("semester30"));
			break;

		case "Summer 2":
			newSemester.setAttribute("id", "semester45")
			semesters.insertBefore(newSemester, _("semester50"));
			break;

		case "Summer 3":
			newSemester.setAttribute("id", "semester65")
			semesters.insertBefore(newSemester, _("semester70"));
			break;

		case "Summer 4":
			newSemester.setAttribute("id", "semester85")
			semesters.insertBefore(newSemester, _("semester90"));
			break;
	}

	newSemester.setAttribute("class", "semester");
	 
	_("dropdown").removeChild(semesterID);
	$( ".semester" ).sortable({
		connectWith: ".semester",
		items: '> li',
		revert: true
	}).disableSelection();
}

function toggleSelect()
{
	_("dropdown").classList.toggle("show");
}

function hideDialog()
{
	_("formbox").style.visibility = "hidden";
}

function showDialog(){
	_("formbox").style.visibility = "visible";
}

function addCourse()
{
	var courseName = document.getElementsByName("coursename")[0].value;
	var courseHours = document.getElementsByName("hours")[0].value;

	if (courseName.length > 15) 
	{
		var warning = "<br>" + "Course name must be less than 15 characters."
		_("output").innerHTML += warning;
	}

	else if(courseName.length == 0)
	{
		var warning = "<br>" + "Please include the name of your course."
		_("output").innerHTML += warning;
	}

	else if(courseHours.length == 0)
	{
		var warning = "<br>" + "Please include the number of hours in your course."
		_("output").innerHTML += warning;
	}

	else
	{
		var course = create("LI");
		course.dataset.hours = courseHours;
		course.setAttribute("class","course ui-sortable-handle");
		course.setAttribute("id", "newCourse");
	}
}