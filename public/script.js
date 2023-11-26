$(document).read(()=>{
    fetchFiles()
})


function fetchFiles(){
    $.ajax({
        url:'/files',
        method:'GET',
        success: function(data){
            $("#fileTableBody").empty()
        data.forEach(function (file){
            var row = 
            "<tr>" + 
            "<td>" + 
            file.name + 
            "</td>" + 
            '<td><a href="' +
            file.url + 
            '" target="_blank">' + 
            file.url + 
            "</a></td>" + 
            "<td>" + 
            '<a href="/files/' + 
            encodeURIComponent(file.name) + 
            '/download" class ="btn btn-primary download-button">Татах</a>' + 
            '<button class="btn btn-danger delete-button" data-name="' + 
            file.name + 
            '">Delete</button>' + 
            "</td>" + 
            "</tr>";
            $("#fileTableBody").append(row);
        });

        attachDownloadHandler()
        attachDeleteHandler()
        },
        error:function(error){
            console.log("error",error);
        }
    })
}