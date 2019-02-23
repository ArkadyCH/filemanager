<?php
if($_POST['action'] == "getAllDirectories"){
    getRootDirectory();
}

function getRootDirectory(){
    $iterator = new FilesystemIterator(".");
    $array = array();
    foreach ($iterator as $item){
        $array[] = array('name' => $item->getFileName() , 'type' => $item->getType());
    }
    echo json_encode($array);
}