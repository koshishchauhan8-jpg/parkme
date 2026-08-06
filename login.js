const form = document.getElementById('loginForm');
const messageBox = document.getElementById('message');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (email === '' || password === '') {
    messageBox.textContent = 'Please enter both email and password.';
    messageBox.style.display = 'block';
    return;
  }

  if (!email.includes('@')) {
    messageBox.textContent = 'Please enter a valid email address.';
    messageBox.style.display = 'block';
    return;
  }

  if (email === 'Ulster@gmail.com' && password === 'Ulster@123') {
    messageBox.textContent = 'Login successful! Redirecting to the main page...';
    messageBox.style.display = 'block';
    alert('Login successful!');

    setTimeout(function () {
      window.location.href = 'mainpage.html';
    }, 800);
  } else {
    messageBox.textContent = 'Incorrect email or password. Please try again.';
    messageBox.style.display = 'block';
  }
});
