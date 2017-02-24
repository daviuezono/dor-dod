$(function(){

  var cmsOptions = {
    type:'changed-cms',
    wrapper : '.section1',
    title : 'CMS'
  };

  var testOptions = {
    type:'changed-test',
    wrapper : '.section2',
    title : 'Test'
  }

  //Added on load first step
  $('#moreTests').append(unitTestTpl);
  $('#cmsSteps h3').after(cmsTpl);
  $(document).trigger(cmsOptions);
  $(document).trigger(testOptions);


  //To new Steps CMS
  $('.section1').on('click','.add-cms', function() {
    $(this).closest('.form-step').after(cmsTpl);
    $(document).trigger(cmsOptions);
  });

  //To new Steps Test
  $('.section2').on('click','.add-test', function() {
    $(this).closest('.form-step').after(unitTestTpl);
    $(document).trigger(testOptions);
  });

  //To Clone Steps CMS
  $('.section1, .section2').on('click', '.clone-cms, .clone-test', function() {
     var $clickedElemnt = $(this);
     var $parent = $clickedElemnt.closest('.form-step');
     var $cloneStep = $clickedElemnt.closest('.form-step').clone();
     var clonedId = $cloneStep.attr('id') + '_clone_' + getRandom();
     //Changing de the of clone
     $cloneStep.attr('id', clonedId);
     var button = $cloneStep.find('.remove-test, .remove-cms').data('step-modal', clonedId);
     $parent.after($cloneStep);
     switch($clickedElemnt.data('clone-type')) {
        case 'cms' : $(document).trigger(cmsOptions); break;
        case 'test' : $(document).trigger(testOptions); break;
     }
  });

   $(document).on('show.bs.modal', function(modal) {
    var stepToConfirm = $(modal.relatedTarget).data('step-modal');
    $(document).on('click','.modal-confirm-remove', function(){
      $("#" + stepToConfirm).remove();
      switch($(modal.relatedTarget).data('remove-type')) {
        case 'cms' : $(document).trigger(cmsOptions); break;
        case 'test' : $(document).trigger(testOptions); break;
      }
      $("#myModal").modal('hide');
    })
  });
});


var unitTestTpl =  function() {
  var randomId = "step-test-id-" + getRandom();

  return '<div class="row form-step" id=' + randomId + '>'+
  	'<div class="col-lg-12">'+
  		'<div class="bs-callout bs-callout-warning">'+
  			'<h4 class="label-element"></h4>'+
  				'<div class="form-group">'+
  					'<label for="unit_tests_steps_title">Title </label>'+
  					'<input name="unit_tests_steps_title[]" class="form-control" /> '+
  				'</div>'+
  				'<div class="form-group">'+
  					'<label for="unit_tests_steps_steps">Steps</label>'+
  					'<textarea name="unit_tests_steps_steps[]" class="form-control" rows="3"></textarea>' +
  				'</div>'+
  				'<div class="form-group">'+
  					'<label for="unit_tests_steps_description">Expected Results</label>'+
  					'<textarea name="unit_tests_steps_description[]" class="form-control" rows="3"></textarea>'+
  				'</div>'+
  				'<div class="row">'+
            '<div class="col-xs-12 button-control-step" >'+
              '<button class="btn btn-primary btn-warning add-test"><span class="glyphicon glyphicon-plus"></span></button> '+
              '<button class="btn btn-primary btn-warning clone-test" data-clone-type="test"><span class="">Clone</span></button> '+
  					  '<button class="btn btn-primary btn-warning remove-test" data-remove-type="test" data-step-modal="'+ randomId +'" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-minus"></span></button>'+
            '</div>'+
  				'</div>'+
  		'</div>'+
  	'</div>'+
  '</div>';
}

var cmsTpl = function() {
  var randomId = "step-cms-id-" + getRandom();
  return '<div class="row form-step" id='+ randomId +'>'+
    '<div class="col-lg-12">'+
    '<div class="bs-callout bs-callout-danger">'+
      '<h4 class="label-element"></h4>'+
      '<div class="form-group">'+
      '<label for="cms_changes_steps_title">Title</label>'+
      '<input name="cms_changes_steps_title[]" class="form-control" />'+
      '</div>'+
      '<div class="form-group">'+
      '<label for="cms_changes_steps_description">Description</label>'+
      '<textarea name="cms_changes_steps_description[]" class="form-control" rows="3"></textarea>'+
      '</div>'+
      '<div class="row">'+
         '<div class="col-xs-12 button-control-step" >'+
            '<button class="btn btn-primary btn-warning add-cms"><span class="glyphicon glyphicon-plus"></span></button> '+
            '<button class="btn btn-primary btn-warning clone-cms" data-clone-type="cms"><span class="">Clone</span></button> '+
            '<button class="btn btn-primary btn-warning remove-cms" data-remove-type="cms" data-step-modal="'+ randomId +'" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-minus"></span></button>'+
          '</div>'+
      '</div>'+
    '</div>'+
    '</div>'+
  '</div>';
}

var getRandom = function() {
  return Math.floor((Math.random() * 10000) + 1);
}
