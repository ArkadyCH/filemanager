$( document ).ready(function() {
    postAjax("getDirectories");

    $('.file-manager__directories').on("click", ".file-manager__directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        let type = $(this).get(0).getAttribute('data-type');

        if(type === "dir"){
            postAjax(path);
            createPager(path);
        }
    });
    $('.file-manager__pager').on("click", ".file-manager__pager-directory", function () {
        let path = $(this).get(0).getAttribute('data-path');
        createPager(path);
        postAjax(path);
    });
});

function postAjax(path){
    $.ajax({
        type: "POST",
        url: "filemanager.php",
        data: { 'action': path},
        success: generateHTML,
        dataType: "json"
    });
}

function generateHTML(data){
    let directoriesHTML= new Array();

    let directoriesSelector = $(".file-manager__directories");
    console.log(data);


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

    let pagerHTML= new Array();
    for(let item in pagerPath){
        pagerHTML +=
            '<div class="file-manager__pager-directory" data-path="'+getPathByName(path , pagerPath[item])+'">'+pagerPath[item]+'\\</div>'
        ;
    }
    pagerSelector.empty();
    pagerSelector.append(pagerHTML);
}
function getPathByName(path , name){
    return path.substring(0 , path.indexOf(name))+name;
}