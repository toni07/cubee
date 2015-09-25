<?php
	header('Content-Type: application/json');
	$postdata = file_get_contents("php://input");
	$postArray = array();
	parse_str($postdata, $postArray);
	//print_r($postArray);	Array([order] => Array([fieldId] => 1[orderValue] => 0)[pageNum] => 1)
	$orderBySql = '';
	$pageNumber = 1;
	if(isset($postArray['order'])){
		$orderDirection = 'ASC';
		if(1 == $postArray['order']['orderValue']){
			$orderDirection = 'DESC';
		}
		$orderBySql = " ORDER BY {$postArray['order']['fieldId']} {$orderDirection}";
	}
	if(isset($postArray['pageNum'])){
		$pageNumber = $postArray['pageNum'];
	}
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