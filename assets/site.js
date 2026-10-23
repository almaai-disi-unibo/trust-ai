const button = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
if (button) button.addEventListener('click', () => links.classList.toggle('open'));

document.querySelectorAll('[data-dropdown]').forEach((item) => {
  item.querySelector('button').addEventListener('click', () => item.classList.toggle('open'));
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((tab) => tab.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('[data-category]').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});
