$(document).ready(() => {
    fetchFiles();
    attachDownloadHandler();
    attachDeleteHandler();
});

function fetchFiles() {
    $.ajax({
        url: '/files',
        method: 'GET',
        success: function (data) {
            $("#fileTableBody").empty();

            data.forEach(function (file) {
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
                file.name + '">Delete</button>' +
                "</td>" +
                "</tr>";
                $("#fileTableBody").append(row);
            });

            attachDownloadHandler();
            attachDeleteHandler();
        },
        error: function (error) {
            console.log("error", error);
        }
    });
}

// Attach event handler for download button
function attachDownloadHandler() {
    $(".download-button").on("click", function (event) {
        event.preventDefault();
        var fileName = $(this).closest("tr").find("td:first").text();
        downloadFile(fileName);
    });
}

// Attach event handler for delete button
function attachDeleteHandler() {
    $(".delete-button").on("click", function () {
        var fileName = $(this).data("name");
        deleteFile(fileName);
    });
}

// Function to download a file
function downloadFile(fileName) {
    console.log("Downloading file:", fileName);
}

// Function to delete a file
function deleteFile(fileName) {
    console.log("Deleting file:", fileName);
}
