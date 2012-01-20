$(function(){
	//定义focusAndBlur函数
		$.fn.extend({  
			focusAndBlur:function(){  
				$(this).focus(function(){
					var txt=$(this).val();
					if(txt==this.defaultValue){
						$(this).val("").removeClass("grey");
					}
				}).blur(function(){
					var txt=$(this).val();
					if(txt==""){
						$(this).val(this.defaultValue).addClass("grey");
					}
				});	
			}
		});
	//定义delayRun函数，延时执行
		function delayRun(code,time) {
			var t=setTimeout(code,time);
		}
	//对以下3个输入框作focusAndBlur处理
	$("#userinput").focusAndBlur();
	$("#moneyinput").focusAndBlur();
	$("#infoinput").focusAndBlur();
	
	$("#userbutton").click(function(){
		if($("#userinput").val()==''||$("#userinput").val()=='输入用户名'){
			alert("请输入用户名！");
			return false;
		}
		$.post("service/user.php",{"func":"newuser","nickname":$("#userinput").val()},function(data){	
			if(data==1){
				alert("添加新用户成功！");
				userlist();
			}else if(data==0){
				alert("用户已存在，添加新用户失败……");	
			}
		},"text");
	});
	$("#usercheck").click(function(){
		eventlist_user();
	});
	$("#allcheck").click(function(){
		eventlist();
	});
	
	function eventlist_user(){
		$.getJSON("service/event.php",{"func":"eventlist_user","uid":$("#userbox .userselect").val()},function(data){
			$(".finacebox_table").remove();			
			intTime="";
			events='<table>';
			$.each(data,function(){
				
				if(intTime==this.time2){
					events+='<tr><td>'+this.nickname+'</td><td>'+this.money+'</td><td>'+this.info+'</td><td>'+this.time2+'</td><td>'+this.total+'</td></tr>';
				}else{
					events+='</table><table border="1" class="finacebox_table"><tr class="title"><td width="130px">相关成员</td><td width="100px">收入/支出</td><td width="400px">事项</td><td width="100px">时间</td><td width="130px">当前总金额</td></tr>';
					events+='<tr><td>'+this.nickname+'</td><td>'+this.money+'</td><td>'+this.info+'</td><td>'+this.time2+'</td><td>'+this.total+'</td></tr>';
				}
				intTime=this.time2;
			});
			$("#finacebox").append(events+'</table>');			
		});
	}
	
	function userlist(){
		$.getJSON("service/user.php",{"func":"userlist"},function(data){
			$(".userselect option").remove();
			$.each(data,function(){
				$(".userselect").append('<option value="'+this.uid+'" >'+this.nickname+'</option>');
			});
		});
	}
	
	function eventlist(){
		
		$.getJSON("service/event.php",{"func":"eventlist"},function(data){
			$(".finacebox_table").remove();			
			intTime="";
			events='<table>';
			var json = data;
			alert(json.length);
			for(var i=0; i<json.length; i++){
			//$.each(data,function(){
				alert(this.time2);
				if(intTime==this.time2){
					events+='<tr><td>'+this.nickname+'</td><td>'+this.money+'</td><td>'+this.info+'</td><td>'+this.time2+'</td><td>'+this.total+'</td></tr>';
				}else{
					events+='</table><table border="1" class="finacebox_table"><tr class="title"><td width="130px">相关成员</td><td width="100px">收入/支出</td><td width="400px">事项</td><td width="100px">时间</td><td width="130px">当前总金额</td></tr>';
					events+='<tr><td>'+this.nickname+'</td><td>'+this.money+'</td><td>'+this.info+'</td><td>'+this.time2+'</td><td>'+this.total+'</td></tr>';
				}
				intTime=this.time2;
			}
			//});
			$("#finacebox").append(events+'</table>');			
		});
	}
//	function lastTime(uid){
//		var out="";
//		$.get("service/event.php",{"func":"lastTime","uid":uid},function(data){	
//			alert(data);
//			out=data;
//			intTime=data;
//			alert(intTime);
//		},"text");
//		return data;
//		alert(out);
//		
//	}
//	lastTime();
	
	userlist();
	eventlist();
	
	$("#finacebutton").click(function(){
		if($("#moneyinput").val()==''||$("#moneyinput").val()=='输入金额，支出请加负号'||isNaN($("#moneyinput").val())){
			alert("请输入金额！");
			return false;
		}
		$.post("service/event.php",{"func":"newevent","uid":$("#eventbox .userselect").val(),"money":$("#moneyinput").val(),"info":$("#infoinput").val()},function(data){	
			if(data==1){
				alert("添加新事件成功！");
				eventlist();
			}else if(data==0){
				alert("添加新事件失败……");	
			}
		},"text");
	});
	
	
})