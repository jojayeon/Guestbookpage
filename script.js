// html에 적용한 js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const formContainer = document.getElementById('formContainer');

  toggleButton.addEventListener('click', () => {
      if (formContainer.style.display === 'none') {
          formContainer.style.display = 'block';
      } else {
          formContainer.style.display = 'none';
      }
  });

  // 초기 상태 설정: 폼을 표시
  formContainer.style.display = 'block';

  const form = document.getElementById('formContainer');


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
          console.dir(formContainer)
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
})