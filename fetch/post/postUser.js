function submitForm() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
  
    fetch('http://localhost:5001/createUser', {
        method: 'POST',
        body: formData,
      })

      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  