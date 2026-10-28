const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  mainNav?.classList.toggle('is-open', !isExpanded);
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    mainNav.classList.remove('is-open');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    projectCards.forEach((card) => {
      card.hidden = selectedFilter !== 'all' && card.dataset.category !== selectedFilter;
    });
  });
});

const projectDialog = document.querySelector('.project-dialog');
const dialogImage = document.querySelector('.dialog-image');
const dialogTitle = document.querySelector('.dialog-title');
const dialogCategory = document.querySelector('.dialog-category');
const dialogCount = document.querySelector('.dialog-count');
let visibleProjects = [];
let activeProjectIndex = 0;

function renderProject(index) {
  if (!projectDialog || !dialogImage || !dialogTitle || !dialogCategory || !dialogCount) return;
  activeProjectIndex = (index + visibleProjects.length) % visibleProjects.length;
  const card = visibleProjects[activeProjectIndex];
  const image = card.querySelector('img');
  dialogImage.src = image.currentSrc || image.src;
  dialogImage.alt = image.alt;
  dialogTitle.textContent = card.querySelector('h3')?.textContent || '';
  dialogCategory.textContent = card.querySelector('.project-meta div > span')?.textContent || '';
  dialogCount.textContent = `${String(activeProjectIndex + 1).padStart(2, '0')} / ${String(visibleProjects.length).padStart(2, '0')}`;
}

function openProject(card) {
  if (!projectDialog) return;
  visibleProjects = [...projectCards].filter((project) => !project.hidden);
  const requestedIndex = visibleProjects.indexOf(card);
  if (requestedIndex < 0 || visibleProjects.length === 0) return;
  renderProject(requestedIndex);
  projectDialog.showModal();
}

projectCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openProject(card);
  });
});

document.querySelector('.dialog-close')?.addEventListener('click', () => projectDialog?.close());
document.querySelector('.dialog-prev')?.addEventListener('click', () => renderProject(activeProjectIndex - 1));
document.querySelector('.dialog-next')?.addEventListener('click', () => renderProject(activeProjectIndex + 1));
projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') renderProject(activeProjectIndex - 1);
  if (event.key === 'ArrowRight') renderProject(activeProjectIndex + 1);
});

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
