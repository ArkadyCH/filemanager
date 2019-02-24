<?php
if($_POST['action'] == "getDirectories"){
    getDirectoriesByPath(".");
}
else if($_POST['action'] == "getAllDirectories"){
    getAllDirectories();
}
else if($_POST['name']){
    createDirectory($_POST);
}
else{
    getDirectoriesByPath($_POST['action']);
}

function getDirectoriesByPath($path){
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

function getAllDirectories(){
    $root = '.';
    $iter = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($root, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    $paths = array($root);
    foreach ($iter as $path => $dir) {
        if(is_dir($dir) && strpos($dir,".\\.git") !== 0 && strpos($dir,".\\.idea") !== 0)
            $paths[] = iconv("Windows-1251", "UTF-8", $path);
    }

    echo json_encode($paths);
}

function createDirectory($data){
    $path = iconv('utf-8', 'cp1251', $data['path'].'\\'.$data['name']);
    $countNesting = substr_count($path, '\\');

    if ($countNesting <= 10 && !file_exists($path)) {
        mkdir($path, 0700 , true);
    }
}