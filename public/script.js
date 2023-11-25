$(document).read(()=>{
    fetchFiles()
})


function fetchFiles(){
    $.ajax({
        url:'/files',
        method:'GET',
        success: function(data){
            $("#fillTableBody").empty()

            var row = "<tr>" + "<td>" + file.name + "</td>" + '<td><a href="' + file.url + "</a></td>"
        }
    })
}