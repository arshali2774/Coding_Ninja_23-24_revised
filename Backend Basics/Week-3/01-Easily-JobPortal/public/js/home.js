const modalRegister = document.querySelector('.modal_register');
const modalLogin = document.querySelector('.modal_login');
const crossRegister = document.getElementById('cross_register');
const crossLogin = document.getElementById('cross_login');
const recuriterBtn = document.getElementById('recruiter_btn');
const loginUser = document.getElementById('login_user');
const loginNav = document.getElementById('login_nav');
const applyForm = document.getElementById('apply_modal');
const closeApplyForm = document.getElementById('close');
const openApplyForm = document.getElementById('apply_btn');

openApplyForm.addEventListener('click', function () {
  applyForm.style.transform = 'translate(-50%,-60%)';
  applyForm.style.opacity = '1';
  applyForm.style.visibility = 'visible';
});
closeApplyForm.addEventListener('click', function () {
  applyForm.style.transform = 'translate(-50%,-50%)';
  applyForm.style.opacity = '0';
  applyForm.style.visibility = 'hidden';
});

if (loginUser) {
  loginUser.addEventListener('click', () => {
    modalRegister.style.transform = 'translate(-50%,-60%)';
    modalRegister.style.opacity = '0';
    modalLogin.style.transform = 'translate(-50%,-50%)';
    modalLogin.style.opacity = '1';
    modalLogin.style.visibility = 'visible';
    modalRegister.style.visibility = 'hidden';
  });
}

if (recuriterBtn) {
  recuriterBtn.addEventListener('click', () => {
    modalRegister.style.transform = 'translate(-50%,-50%)';
    modalRegister.style.opacity = '1';
    modalLogin.style.visibility = 'hidden';
    modalRegister.style.visibility = 'visible';
  });
}
if (crossRegister) {
  crossRegister.addEventListener('click', () => {
    modalRegister.style.transform = 'translate(-50%,-60%)';
    modalRegister.style.opacity = '0';
    modalLogin.style.visibility = 'hidden';
    modalRegister.style.visibility = 'hidden';
  });
}
if (crossLogin) {
  crossLogin.addEventListener('click', () => {
    modalLogin.style.transform = 'translate(-50%,-70%)';
    modalLogin.style.opacity = '0';
    modalLogin.style.visibility = 'hidden';
    modalRegister.style.visibility = 'hidden';
  });
}
