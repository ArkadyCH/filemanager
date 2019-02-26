<?php
if($_POST['action'] == "getDirectories"){
    getDirectoriesByPath($_POST['path']);
}
else if($_POST['action'] == "getAllDirectories"){
    getAllDirectories();
}
else if($_POST['action'] == "createDirectory"){
    createDirectory($_POST);
}
else if($_POST['action'] == "deleteDirectory"){
    deleteDirectory($_POST['path']);
}
else if($_FILES){
    uploadFile($_POST['path'],$_FILES['file']);
}

function getDirectoriesByPath($path){
    $iterator = new FilesystemIterator(iconv('utf-8', 'cp1251', $path));
    $array = array();
    foreach ($iterator as $item){
        $array[] = array(
            'name' => iconv("Windows-1251", "UTF-8", $item->getFileName()) ,
            'type' => $item->getType() ,
            'path' => iconv("Windows-1251", "UTF-8", $item->getPathName()),
            'size' => iconv("Windows-1251", "UTF-8", $item->getSize())
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
function deleteDirectory($dir){
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator(iconv('utf-8', 'cp1251', $dir)),
        RecursiveIteratorIterator::CHILD_FIRST
    );

    foreach ($iterator as $path) {
        if ($path->isDir()) {
            rmdir((string)$path);
        } else {
            unlink((string)$path);
        }
    }
    rmdir($dir);
}

function uploadFile($path , $file){
    $fileName = iconv('utf-8', 'cp1251',$file['name']);
    $extensions = array("txt","jpg","jpeg","gif","ico");
    $ext = pathinfo( $fileName, PATHINFO_EXTENSION);
    $fullPath = $path . '\\' . $fileName;
    if ( $file['error'] == 0) {
        if(in_array($ext , $extensions)){
            move_uploaded_file($file['tmp_name'], $fullPath);
        }
        else
            echo $file['name'];
    }
}