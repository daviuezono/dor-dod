$(document).ready(function() {
  var idForm = "#comment";
  $("#dordod-status0").hide();
  $("#dordod-status1").hide();
  $("#dordod-status2").hide();
  $("#dordod-status3").hide();
  $("#dordod-status4").hide();
  $("#dordod-status5").hide();
  $("#dordod-status6").hide();
  $("#dordod-status7").hide();
  $("#dordod-status8").hide();
  $("#dordod-status9").hide();
  $("#dordod-status10").hide();
  $("#dordod-status11").hide();
  $("#dordod-status12").hide();
  $("#dordod-status13").hide();
  $("#dordod-status14").hide();
  $("#dordod-status15").hide();
  $("#dordod-buttons").hide();
  $("#dordod-results").hide();
  

  $(idForm).submit(function( event ) {
    event.preventDefault();

    // Head and variables.
    var newLine = '\n';
    var doubleNewLine = '\n\n';
    var hr = '--' + newLine;
    var html = '';

    html += 'h2. {color:#ad1b31}Check-list for DoR and DoD{color}' + doubleNewLine;

    // ====== STATUS TRANSITION
    var status_transition = $('input[name=status_transition]:checked', idForm).val();
    html += 'h3. {color:#1B809E}' + status_transition + '{color}' + doubleNewLine;



    /***************************************************************************************************
     ********************************************* Comment *********************************************
     **************************************************************************************************/



    // We have code changes?
    html += '*Do we have code changes?*' + newLine;
    html += $('input[name=code_changes]:checked', idForm).val() + doubleNewLine;

    // Changes Type:
    html += '*Technology:*' + newLine;
    var code_changes_type = $('input:checkbox[name^=code_changes_type]:checked');
    if(code_changes_type.length > 0){
      code_changes_type.each(function(){
        html += '* ' + $(this).val() + newLine;
      });
      html += newLine;
    }

    // More details:
    var more_details = $('textarea[name=code_more_details]', idForm).val();
    if (more_details.length > 0) {
      html += '*More Details:*' + newLine;
      html += more_details + doubleNewLine;
    }

    // ====== CMS CHANGES
    html += 'h2. {color:#CE4844}CMS Changes{color}' + doubleNewLine;

    // We have CMS changes?
    html += '*Do we have CMS changes?*' + newLine;
    var cms_changes_answer = $('input[name=cms_changes]:checked', idForm).val();
    html += cms_changes_answer + doubleNewLine;
      
    if (cms_changes_answer != 'No') {
      // Steps
      html += 'h3. Steps' + doubleNewLine;
      var array_cms_changes_steps_title = [];
      var array_cms_changes_steps_description = [];
      $('input[name^="cms_changes_steps_title"]').each(function() {
        array_cms_changes_steps_title.push($(this).val());
      });
      $('textarea[name^="cms_changes_steps_description"]').each(function() {
        array_cms_changes_steps_description.push($(this).val());
      });
      $('input[name^="cms_changes_steps_title"]').each(function(index) {
        html += '*' + (index + 1) + ') ' + array_cms_changes_steps_title[index] + '*' + newLine;
        html += array_cms_changes_steps_description[index] + doubleNewLine;
      });
    }

    // Comments
    var cms_comments = $('textarea[name=comments]', idForm).val();
    if (cms_comments.length > 0) {
      html += 'h2. {color:#222}Comments{color}' + doubleNewLine;
      html += cms_comments + doubleNewLine;
    }

    // ====== Unit Tests
    html += 'h2. {color:#AA6708}Unit Tests{color}' + doubleNewLine;
    var array_unit_tests_steps_title = [];
    var array_unit_tests_steps_description = [];
    var unit_tests_steps_steps = [];

    $('input[name^="unit_tests_steps_title"]').each(function() {
      array_unit_tests_steps_title.push($(this).val());
    });
    $('textarea[name^="unit_tests_steps_description"]').each(function() {
      array_unit_tests_steps_description.push($(this).val());
    });
    $('textarea[name^="unit_tests_steps_steps"]').each(function() {
      unit_tests_steps_steps.push($(this).val());
    });
    $('input[name^="unit_tests_steps_title"]').each(function(index) {
      html += '*' + (index + 1) + ') ' + array_unit_tests_steps_title[index] + '*' + newLine;
      html += 'Steps: ' + unit_tests_steps_steps[index] + doubleNewLine;
      html += 'Expected Results: ' + array_unit_tests_steps_description[index] + doubleNewLine;
    });

    // ====== Result
    $("#result").val(html);

  });
});



function showCheckList(id) {
  if (document.getElementById(id).checked) {
    $("#dordod-" . id).show();
  } else {
    $("#dordod-" . id).hide();
  }
}

function showCMSChange(){
  if(document.getElementById('cms_changes_yes').checked) {
    $("#cmsSteps").show();
  } else {
    $("#cmsSteps").hide();
  }
}

function validateForm(){

  var validation = true;

  if(!document.getElementById('cms_changes_yes').checked && !document.getElementById('cms_changes_no').checked) {
    $("#result").hide();
    $("#cmsError").show();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    validation =  false;
  }
  else{
    $("#cmsError").hide();
  }

  if(!document.getElementById('codeChangeY').checked && !document.getElementById('codeChangeN').checked) {
    $("#codeError").show();
    $("#result").hide();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    validation =  false;
  }
  else{
    $("#codeError").hide();
  }

  return validation;

}

function showResult(){
  if(validateForm()){
    $("#result").show();
    $("#cmsError").hide();
    $("#cmsError").hide();
    var clipboard = new Clipboard('.btn');
  }
}

