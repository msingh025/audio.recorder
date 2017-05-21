(function($) {
    "use strict"; // Start of use strict



$( document ).ready(function() {
$('#starter').click(function() {
	if($(this).hasClass('fa-play-circle-o') == true){
		$(this).addClass('fa-pause-circle-o');
	    $(this).removeClass('fa-play-circle-o');
		$('#audio_src')[0].play();
	}else if($(this).hasClass('fa-pause-circle-o') == true) {
		$(this).addClass('fa-play-circle-o');
		$(this).removeClass('fa-pause-circle-o');
		$('#audio_src')[0].pause();
	}
	var player = $('#audio_src')[0];
	player.addEventListener("timeupdate", function() {
    var currentTime = player.currentTime;
    var duration = player.duration;
	var per = (player.currentTime*100)/duration;
	  console.log([currentTime, duration]);
	  $('.progress-bar').css({
		  width:per+'%'
	  })
    //$('.hp_range').stop(true,true).animate({'width':(currentTime +.25)/duration*100+'%'},250,'linear');
});
});

});
/******************* layt settings *********************/








})(jQuery); // End of use strict
