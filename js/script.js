$( document ).ready(function() {
    getDirectoriesByPath("getDirectories");
    let root = ".";
    //getAllDirectories("getAllDirectories");

    $('.file-manager__directories').on("click", ".file-manager__directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        let type = $(this).get(0).getAttribute('data-type');

        if(type === "dir"){
            updateContent(path);
            root = path;
        }
    });
    $('.file-manager__pager').on("click", ".file-manager__pager-directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        updateContent(path);
        root = path;
    });

    $('.create-directory__form').submit(function(e) {
        let form = $(this);
        createDirictory(form,root);
    });
});

function getDirectoriesByPath(path){
    $.ajax({
        type: "POST",
        url: "filemanager.php",
        data: { 'action': path},
        success: generateHTML,
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
        data: {'name' : name , 'path' : root},
        success: function(data){
            updateContent(root);
        }
    });
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
        if(data[item].type === "file"){
            data.push(data.splice(item, 1)[0]);
        }
    }

    for(let item in data){
        if(data[item].type === "dir" && data[item].name.charAt(0) !== "."){
            directoriesHTML +=
                '<div class="file-manager__directory" data-path="'+data[item].path+'" data-type="'+data[item].type+'">\n' +
                '    <div class="file-manager__directory-folder">\n' +
                '        <img class="file-manager__directory-img" src="/img/directory.png">\n' +
                '    </div>\n' +
                '    <div class="file-manager__directory-name">' + data[item].name +'</div>\n' +
                '</div>';
        }
        else if(data[item].name.charAt(0) !== "."){
            directoriesHTML +=
                '<div class="file-manager__directory" data-path="'+data[item].path+'" data-type="'+data[item].type+'">\n' +
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

function updateContent(path){
    createPager(path);
    getDirectoriesByPath(path);
}