$( document ).ready(function() {
    $.ajax({
        type: "POST",
        url: "filemanager.php",
        data: { 'action': 'getAllDirectories'},
        success: function(data){
            let html = new Array();
            console.log(data);

            for(let item in data){
                if(data[item].type === "file"){
                    data.push(data.splice(item, 1)[0]);
                }
            }

            for(let item in data){
                if(data[item].type === "dir" && data[item].name.charAt(0) !== "."){
                    html +=
                        '<div class="file-manager__directory">\n' +
                        '    <div class="file-manager__directory-folder">\n' +
                        '        <img class="file-manager__directory-img" src="/img/directory.png">\n' +
                        '    </div>\n' +
                        '    <div class="file-manager__directory-name">' + data[item].name +'</div>\n' +
                        '</div>';
                }
                else if(data[item].name.charAt(0) !== "."){
                    html +=
                        '<div class="file-manager__directory">\n' +
                        '    <div class="file-manager__directory-name">' + data[item].name +'</div>\n' +
                        '</div>';
                }
            }
            $('.file-manager__directories').append(html)
        },
        dataType: "json"
    });
});