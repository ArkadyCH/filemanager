<?php
if($_POST['action'] == "getDirectories"){
    getDirectoriesByPath($_POST['path']);
}
else if($_POST['action'] == "createDirectory"){
    createDirectory($_POST);
}
else if($_POST['action'] == "deleteDirectory"){
    deleteDirectory($_POST['path']);
}
else if($_POST['action'] == 'searchData'){
    getDataByName($_POST['name']);
}
else if($_FILES){
    uploadFile($_POST['path'],$_FILES['file']);
}

function getDirectoriesByPath($path){
    if(strpos($path,'.') === 0 && is_dir($path)){
        $iterator = new FilesystemIterator(iconv('utf-8', 'cp1251', $path));
        $array = array();
        if($iterator){
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
    }
    else echo json_encode('Dir does not exist');
}

function getDataByName($name){
    $iter = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator('.', RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    $paths = array();
    foreach ($iter as $path) {
        if(stristr (array_pop(explode('\\', $path)),$name) && strpos($path,".\\.git") !== 0 && strpos($path,".\\.idea") !== 0)
            $paths[] = array(
                'name' => iconv("Windows-1251", "UTF-8", array_pop(explode('\\', $path))),
                'type' => iconv("Windows-1251", "UTF-8", is_dir($path) ? 'dir' : 'file'),
                'path' => iconv("Windows-1251", "UTF-8", $path)
            );
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
    if(strpos($dir,'.') === 0 &&is_dir($dir)){
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
            echo "Тип файла '$ext' не поддерживается, выберите файл с расширением txt,jpg,jpeg,gif,ico";
    }
}