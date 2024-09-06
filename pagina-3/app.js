const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    const body = accordion.querySelector('.accordion-body');
    body.classList.toggle('active');
  })
})
