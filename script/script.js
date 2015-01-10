ishome=1;
initial_state=function()
{
	$(".menuitem").removeClass("blur");
	$("#blockleft").removeClass("leftanim");
	$("#blockright").removeClass("rightanim");
}//for initial plane state
selected_state=function()
{
	$(".menuitem").addClass("blur");
	$("#blockleft").addClass("leftanim");
	$("#blockright").addClass("rightanim");
}//for opened state and blur for all
comefor=function(elem){$(".menuitem").removeClass("menuhover");$(elem).addClass("menuhover");}//for forwarding hovered menuitem and setting its blur zero
comeback=function(){$(".menuitem").removeClass("menuhover");}//setting menu hover effect to zero for all menuitems
$(document).ready(function() {
	$(window).load(function() {$("#welcome").fadeOut('fast'); })
	$("#creditsbox").hide();
	$("#credits").click(function()
	{
		$("#creditsbox").fadeToggle("slow");
		$("#wallpaper").click(function()
		{
			$("#creditsbox").fadeOut("slow");
		})
	});
	var cur_selected;
	$(".menublocks").mouseenter(selected_state);
	$(".menublocks").mouseleave(initial_state);
	$(".menuitem").mouseenter(function(){comefor(this);});
	$(".menuitem").mouseleave(comeback);
	$(".menuitem").click(function()
	{
	$(".main").addClass("hide");//otherwise texts and images won't resize to zero it will hinder the click events for gallery
	if((cur_selected!=this)||(ishome==1))
	{
	ishome=0;//is home variable added to avoid the bug of click doesn't work for a menuitem after we hit home button from that menuitem
	old_selected=cur_selected;
	$("#c"+$(old_selected).attr("id")).removeClass("selected");
	cur_selected=this;
	var selectedmenu=$(this).attr("id");
	$("#c"+selectedmenu).addClass("selected");
	$(".menublocks").unbind("mouseleave");
	$(".menublocks").bind("mouseleave",function(){comefor(cur_selected);});
}
});
	$(".home").click(function(){
		$(".main").removeClass("hide");
		initial_state();
		comeback();
		$(".content").removeClass("selected");
		$(".menublocks").unbind("mouseleave");
		$(".menublocks").mouseleave(initial_state);
		ishome=1;
	});
	$(document).keyup(function(event){
		if(event.which==27)
			$(".home").trigger("click");
	});
//gallery
k=0;
var no_of_thumbs=18;
var thumb_width=180;

var src=$("#onep").attr("src");
function addimage(number)
{
	var limit=number;
	for(num=1;num<=limit;num++)
	{
		inhtml='<img src=\"images/gallery/thumbs/'+num+'.jpg\""/></img';
		$("#thumbslist").append(inhtml);
	}
}
function set_thumbs(no_of_thumbs,thumb_width)
{
	$(".thumbs").attr("width",thumb_width*no_of_thumbs);
	addimage(no_of_thumbs);
}
showimage=function(location,dir){
	if(src!=location)
	{
		k=k+dir*180;
		src=location;
		srcarray=src.split('/');
		$("#container>.back").attr("src",'images/gallery/pictures/'+srcarray[3]);
		$("#container").css({"-webkit-transform":"perspective(600) rotateY("+k+"deg)"});
		$("#container>img").toggleClass("back front");
	}};
	$("#two").click(function(){
		set_thumbs(no_of_thumbs,thumb_width);

	});
	$("#next").click(function(){
		srcarray=src.split('/');
		namearray=srcarray[3].split('.');
		num=parseInt(namearray[0])+1;
		if(num<=no_of_thumbs)
			showimage('images/gallery/pictures/'+num+".jpg",1);
	});
	$("#back").click(function(){
		srcarray=src.split('/');
		namearray=srcarray[3].split('.');
		num=parseInt(namearray[0])-1;
		if(num>0)
			showimage('images/gallery/pictures/'+num+".jpg",-1);
	});
	$(document).keyup(function(event){
		if(event.which==37)
			$("#back").trigger("click");
	});
	$(document).keyup(function(event){
		if(event.which==39)
			$("#next").trigger("click");
	});
	$(".thumbs").mousemove(function(e){
		position=e.pageX;
		relative_pos=position-300.52;
		//relative_pos=position-parseInt($("#super").css("margin-left"))-parseInt($(".selected").css("left"))*$(window).width()/100;

		largewidth=$(".thumbs").width();
		smallwidth=$("#super").width();
		largewidth=largewidth-smallwidth;
		newmar=relative_pos*largewidth/smallwidth;
		$(".thumbs").stop().animate({"margin-left":"-"+newmar+"px"},{duration: 2000,easing: 'easeOutSine'});
	});
	$(".thumbs>img").live("click",function(){
		showimage($(this).attr("src"),1);
	});
});