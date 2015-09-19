<?php
	header('Content-Type: application/json');
	//print_r($_REQUEST);
	//print_r(fread(__input));
	$data = array();
	$data['total-page-num'] = 4;
	for($i=0; $i<10;$i++){
		$data['records'][] = array(
			'column1' => "blabla{$i}",
			'column2' => "201{$i}-01-02",
			'column3' => "col3 {$i}",
			'column4' => "201{$i}-05-10",
			'column5' => "5{$i}"
		);
	}
	echo json_encode($data);
?>