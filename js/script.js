$( document ).ready(function() {
    let root = ".";
    updateContent(root,'default');
    //getAllDirectories("getAllDirectories");

    $('.file-manager__directories').on("click", ".file-manager__directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        let type = $(this).get(0).getAttribute('data-type');

        if(type === "dir"){
            updateContent(path,'default');
            root = path;
        }
    });
    $('.file-manager__pager').on("click", ".file-manager__pager-directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        updateContent(path,'default');
        root = path;
    });

    $('.file-manager__directories').on("click", ".file-manager__delete", function () {
        let path = $(this).get(0).getAttribute('data-path');
        deleteDirectory(path,root);
    });
    $('.file-manager__sort').on("click", ".file-manager__sort-img", function () {
        let option = $('.file-manager__sort-options');
        if(option.css('display') === "none"){
            option.css('display','block');
        }else
            option.css('display','none');
    });
    $('.file-manager__sort-options').on("click", ".file-manager__sort-option", function () {
        let option = $(this).text();
        alert('option: ' + option);
    });

    $('.create-directory__form').submit(function() {
        let form = $(this);
        createDirictory(form,root);
    });
    $('.upload-file__form').submit(function() {
        uploadFile(root);
    });
});

function getDirectoriesByPath(path,sort){
    $.ajax({
        type: "POST",
        url: "filemanager.php",
        data: {'action' : 'getDirectories' , 'path': path},
        success: function(data){
            generateHTML(sortData(data,sort));
        },
        dataType: "json"
    });
}
function getAllDirectories(data){
    $.ajax({
        type: "POST",
        url: "filemanager.php",
        data: { 'action': data},
        success: outputData,
        dataType: "json"
    });
}
function createDirictory(form,root){
    let name = $( "input[type=text][name=name]" ).val();
    $.ajax({
        type: "post",
        url: "filemanager.php",
        data: {'action' : 'createDirectory', 'name' : name , 'path' : root},
        success: function(data){
            updateContent(root);
        }
    });
}
function deleteDirectory(path,root){
    $.ajax({
        type: "post",
        url: "filemanager.php",
        data: {'action' : 'deleteDirectory' , 'path' : path},
        success: function(data){
            updateContent(root);
        }
    });
}
function uploadFile(path){
    var file_data = $('.upload-file__input').prop('files')[0];
    if(file_data){
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('path', path);
        $.ajax({
            type: "post",
            url: "filemanager.php",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function(data){
                updateContent(path);
            }
        });
    }
    else alert('Выберите файл!');
}
function outputData(data){
    let optionsHTML = new Array();
    let select = $('.create-directory__select');
    for(let item in data){
        optionsHTML += '<option value="'+data[item]+'">'+data[item]+'</option>';
    }

    select.append(optionsHTML);
}
function generateHTML(data){
    let directoriesHTML= new Array();

    let directoriesSelector = $(".file-manager__directories");

    for(let item in data){
        if(data[item].type === "dir" && data[item].name.charAt(0) !== "."){
            directoriesHTML +=
                '<div class="file-manager__container">\n' +
                '    <div class="file-manager__directory" data-path="'+data[item].path+'" data-type="'+data[item].type+'">\n' +
                '        <div class="file-manager__directory-folder">\n' +
                '            <img class="file-manager__directory-img" src="/img/directory.png">\n' +
                '        </div>\n' +
                '        <div class="file-manager__directory-name">' + data[item].name +'</div>\n' +
                '    </div>\n';
            if(data[item].name !== "js" && data[item].name !== "css" && data[item].name !== "img"){
                directoriesHTML += '    <div class="file-manager__delete" data-path="'+data[item].path+'"><img class="file-manager__delete-icon"src="/img/delete.png"></div>\n'
            };
            directoriesHTML += '</div>';
        }
        else if(data[item].name.charAt(0) !== "."){
            directoriesHTML +=
                '<div class="file-manager__fle" data-path="'+data[item].path+'" data-type="'+data[item].type+'">\n' +
                '    <div class="file-manager__directory-name">' + data[item].name +'</div>\n' +
                '</div>';
        }
    }
    directoriesSelector.empty();
    directoriesSelector.append(directoriesHTML);
}

function createPager(path){
    let pagerPath = path.split('\\');
    let pagerSelector = $('.file-manager__pager');
    let result = getPathAndName(path , path.split('\\'));
    let pagerHTML= new Array();
    for(let item in pagerPath){
        pagerHTML +=
            '<div class="file-manager__pager-directory" data-path="'+result[item]+'">'+pagerPath[item]+'\\</div>'
        ;
    }
    pagerSelector.empty();
    pagerSelector.append(pagerHTML);
}

function getPathAndName(path , array){
    let result = new Array();
    array.reverse();
    for(let item in array){
        path = path.substring(0,path.lastIndexOf(array[item]));
        result.push(path+array[item]);
    }
    return result.reverse();
}

function updateContent(path,sort){
    createPager(path);
    getDirectoriesByPath(path,sort);
}

function sortData(data,sort){
    if(sort === "default"){
        for(let item in data){
            if(data[item].type === "file"){
                data.push(data.splice(item, 1)[0]);
            }
        }
        return data;
    }
    return data;
}