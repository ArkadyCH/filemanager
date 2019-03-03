$( document ).ready(function() {
    let root = ".";
    let sortName = "name/asc";
    updateContent(root,sortName);

    $('.file-manager__directories').on("click", ".file-manager__directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        let type = $(this).get(0).getAttribute('data-type');

        if(type === "dir"){
            updateContent(path,sortName);
            root = path;
        }
    });
    $('.file-manager__pager').on("click", ".file-manager__pager-directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        updateContent(path,sortName);
        root = path;
    });

    $('.file-manager__directories').on("click", ".file-manager__delete", function () {
        let path = $(this).get(0).getAttribute('data-path');
        deleteDirectory(path,root,sortName);
    });
    $('.file-manager__sort').on("click", ".file-manager__sort-img", function () {
        let option = $('.file-manager__sort-options');
        showOrHideDiv(option);
    });
    $('.file-manager__add-folder').on("click", ".file-manager__add-folder-img", function () {
        let container = $('.create-directory');
        showOrHideDiv(container);
    });
    $('.file-manager__add-file').on("click", ".file-manager__add-file-img", function () {
        let container = $('.upload-file');
        showOrHideDiv(container);
    });
    $('.file-manager__search-form').on("keyup", ".file-manager__search-text", function () {
        let str = $(this).val();
        if(str.length > 0){
            searchData(str);
        }else
            updateContent('.',sortName)
    });
    $('.file-manager__sort-options').on("click", ".file-manager__sort-option", function () {
        let option = $(this);
        let optionActive = option.get(0).getAttribute('data-active');
        if(option.text() === "По имени" && optionActive === "0"){
            option.next().attr('data-active' , '0');
            option.attr('data-active' , '1');
            sortName = "name/dsc";
            updateContent(root,sortName)
        }
        if(option.text() === "По имени" && optionActive === "1"){
            option.next().attr('data-active' , '0');
            option.attr('data-active' , '0');
            sortName = "name/asc";
            updateContent(root,sortName)
        }
        if(option.text() === "По размеру" && optionActive === "0"){
            option.prev().attr('data-active' , '0');
            option.attr('data-active' , '1');
            sortName = "file/dsc";
            updateContent(root,sortName)
        }
        if(option.text() === "По размеру" && optionActive === "1"){
            option.prev().attr('data-active' , '0');
            option.attr('data-active' , '0');
            sortName = "file/asc";
            updateContent(root,sortName)
        }
    });

    $('.create-directory__form').submit(function() {
        let form = $(this);
        createDirictory(form,root,sortName);
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
            if(data !== "Dir does not exist"){
                generateHTML(sortData(data,sort));
            }
            else {
                alert(data);
                updateContent('.',sort);
            }
        },
        dataType: "json"
    });
}
function searchData(str){
    $.ajax({
        type: "POST",
        url: "filemanager.php",
        data: { 'action': 'searchData' , 'name' : str},
        success: function(data){
            generateHTML(data);
        },
        dataType: "json"
    });
}
function createDirictory(form,root,sort){
    let name = $( "input[type=text][name=name]" ).val();
    $.ajax({
        type: "post",
        url: "filemanager.php",
        data: {'action' : 'createDirectory', 'name' : name , 'path' : root},
        success: function(){
            updateContent(root,sort);
        }
    });
}
function deleteDirectory(path,root,sort){
    $.ajax({
        type: "post",
        url: "filemanager.php",
        data: {'action' : 'deleteDirectory' , 'path' : path},
        success: function(){
            updateContent(root,sort);
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
                if(data)
                    alert(data);
                else
                    updateContent(path,'name/asc');
            }
        });
    }
    else alert('Выберите файл!');
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
    }
    for(let item in data){
        if(data[item].type === "file" && data[item].name.charAt(0) !== "."){
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
    if(sort === "name/asc"){
        return data;
    }
    if(sort === "name/dsc"){
        return data.reverse();
    }
    if(sort === "file/asc"){
        return data.sort(sortBySize);
    }
    if(sort === "file/dsc"){
        return reverseFiles(data.sort(sortBySize));
    }
    return data;
}
function sortBySize(a,b){
    return a.size-b.size;
}
function reverseFiles(data){
    for(let item in data){
        if(data[item].type === "file"){
            data.unshift(data.splice(item, 1)[0]);
        }
    }
    return data;
}
function showOrHideDiv(container){
    if(container.css('display') === "none"){
        container.css('display','block');
    }else
        container.css('display','none');
}