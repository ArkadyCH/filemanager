<?php
if($_POST['action'] == "getDirectories"){
    getDirectories(".");
}
else{
    getDirectories($_POST['action']);
}

function getDirectories($path){
    $iterator = new FilesystemIterator(iconv('utf-8', 'cp1251', $path));
    $array = array();
    foreach ($iterator as $item){
        $array[] = array(
            'name' => iconv("Windows-1251", "UTF-8", $item->getFileName()) ,
            'type' => $item->getType() ,
            'path' => iconv("Windows-1251", "UTF-8", $item->getPathName())
        );
    }
    echo json_encode($array);
}