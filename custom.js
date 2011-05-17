// Hack to show line breaks in code
$('.execute .sh_ruby code').unbind("click");
function executeRuby () {
	var codeDiv = $(this);
	codeDiv.addClass("executing");
  $.get('/eval_ruby', {code: codeDiv.text()}, function(result) {
      console.log(result);
      if (result != null) print(result.replace("\n", "<br/>"));
      codeDiv.removeClass("executing");
  });
}
$('.execute .sh_ruby code').live("click", executeRuby);
