<?php
require_once('dbconnect.php');

if(isset($_REQUEST['func'])){
	$func=$_REQUEST['func'];
	switch($func)
	{
		case newuser:newuser();break;
		case userlist:userlist();break;
		default:echo 'Error.';
	}
}

function newuser(){
	$nickname=$_POST['nickname'];
	$query="SELECT * FROM `staff` WHERE nickname='$nickname'";
	$result=mysql_query($query);
	if (mysql_num_rows($result)==0){
		//$data=date('Y-m-d');

		$query="INSERT INTO staff (nickname,regtime) VALUES ('$nickname',now())";
		$result=mysql_query($query);
		
		echo 1;
		
	}else{
		echo 0;
	}
}

function userlist(){
	$query="SELECT * FROM `staff` ";
	$result=mysql_query($query);
	$arrbig=array();
	while ($row=mysql_fetch_array($result)){
		//echo '<option value="'.$row['uid'].'">'.$row['nickname'].'</option>';
		$arrbig[$row['uid']]=array(
			'uid'=>$row['uid'],
			'nickname'=>$row['nickname']
		);
	}
	echo json_encode($arrbig);
}
?>