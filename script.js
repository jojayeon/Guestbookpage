// html에 적용한 js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const formContainer = document.getElementById('formContainer');
  const form = document.getElementById('formContainer');

  toggleButton.addEventListener('click', () => {
      if (formContainer.classList.contains('hidden')) {
          formContainer.classList.remove('hidden');
      } else {
          formContainer.classList.add('hidden');
      }
  });

  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.getElementById('titleInput').value;
      const content = document.getElementById('contentInput').value;

      const data = { title, content };

      fetch('http://localhost:3000/post-submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
          console.log('Success:', result);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
})