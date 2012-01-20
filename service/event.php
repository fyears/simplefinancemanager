<?php
require_once('dbconnect.php');

if(isset($_REQUEST['func'])){
	$func=$_REQUEST['func'];
	switch($func)
	{
		case newevent:newevent();break;
		case eventlist:eventlist();break;
		case eventlist_user:eventlist_user();break;
		case lastTime:lastTime();break;
		default:echo 'Error.';
	}
}

function newevent(){
	$uid=$_POST['uid'];
	$money=$_POST['money'];
	$info=$_POST['info'];

	
	$date=date('Y-m-d');

	$query="INSERT INTO event (uid,money,time1,time2,info) VALUES ('$uid','$money',now(),'$date','$info')";
	$result=mysql_query($query);
	$fid=mysql_insert_id();
	
	$query="SELECT total FROM `total` ORDER BY time1 desc LIMIT 0,1";
	$result=mysql_query($query);
	$row=mysql_fetch_array($result);
	$total=$row['total']+$money;
	
	$query="INSERT INTO total (total,time1,time2,fid) VALUES ('$total',now(),'$date','$fid')";
	$result=mysql_query($query);
	echo 1;
		

}

function eventlist(){
	$query="SELECT a.*,b.*,c.* FROM `event` AS a, `staff` AS b, `total` AS c WHERE a.uid=b.uid AND a.fid=c.fid ORDER BY a.time1 desc ";
	$result=mysql_query($query);
	$arrbig=array();
	while ($row=mysql_fetch_array($result)){
		//echo '<option value="'.$row['uid'].'">'.$row['nickname'].'</option>';
		$arrbig[$row['fid']]=array(
			'fid'=>$row['fid'],
			'uid'=>$row['uid'],
			'money'=>$row['money'],
			'time1'=>$row['time1'],
			'time2'=>$row['time2'],
			'info'=>$row['info'],
			'nickname'=>$row['nickname'],
			'total'=>$row['total']
		);
	}
	
	
	echo json_encode($arrbig);
}

function eventlist_user(){
	$uid=$_REQUEST['uid'];
	$query="SELECT a.*,b.*,c.* FROM `event` AS a, `staff` AS b, `total` AS c WHERE a.uid=b.uid AND a.fid=c.fid AND a.uid='$uid' ORDER BY a.time1 desc";
	$result=mysql_query($query);
	$arrbig=array();
	while ($row=mysql_fetch_array($result)){
		//echo '<option value="'.$row['uid'].'">'.$row['nickname'].'</option>';
		$arrbig[$row['fid']]=array(
			'fid'=>$row['fid'],
			'uid'=>$row['uid'],
			'money'=>$row['money'],
			'time1'=>$row['time1'],
			'time2'=>$row['time2'],
			'info'=>$row['info'],
			'nickname'=>$row['nickname'],
			'total'=>$row['total']
		);
	}

	echo json_encode($arrbig);
}

function lastTime(){
	
	if(isset($_GET['uid'])){
		$uid=$_GET['uid'];
		$uidQuery=" AND a.uid='$uid'";
	}else{
		$uidQuery=" AND 1 ";
	}
	$query="SELECT a.*,b.*,c.* FROM `event` AS a, `staff` AS b, `total` AS c WHERE a.uid=b.uid AND a.fid=c.fid ".$uidQuery." ORDER BY a.time1 desc LIMIT 0,1";
	$result=mysql_query($query);
	while ($row=mysql_fetch_array($result)){
		echo $row['time2'];
	}
}
?>