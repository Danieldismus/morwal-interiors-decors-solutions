const themeButtons = document.querySelectorAll('.theme-toggle');
let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('morwal-theme') || 'light';
} catch {
  // Keep the site usable if browser storage is unavailable.
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    const icon = button.querySelector('.theme-icon');
    const label = button.querySelector('.theme-label');
    if (icon) icon.textContent = isDark ? '☀' : '☾';
    if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
  });
}

setTheme(savedTheme);
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('morwal-theme', nextTheme);
    } catch {
      // Theme still changes for this page view without persistent storage.
    }
  });
});

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

const whatsappEnquiryForm = document.querySelector('#whatsapp-enquiry');
whatsappEnquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!whatsappEnquiryForm.reportValidity()) return;

  const formData = new FormData(whatsappEnquiryForm);
  const service = String(formData.get('service') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const details = String(formData.get('details') || '').trim();
  const message = [
    'Hi Morwal Interiors! 👋',
    '',
    `I’m interested in: ${service}.`,
    location ? `Project location: ${location}.` : '',
    details ? `A little about my project: ${details}` : '',
    '',
    'Please let me know how we can get started. Thank you!',
  ].filter(Boolean).join('\n');
  const whatsappUrl = `https://wa.me/254707391939?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

const emailDialog = document.querySelector('.email-dialog');
const emailEnquiryForm = document.querySelector('#email-enquiry');
const emailSendOptions = document.querySelector('.email-send-options');
const gmailDraftLink = document.querySelector('.email-gmail');
const mailAppDraftLink = document.querySelector('.email-mail-app');

document.querySelector('.email-enquiry-open')?.addEventListener('click', () => {
  emailDialog?.showModal();
});

document.querySelector('.email-dialog-close')?.addEventListener('click', () => {
  emailDialog?.close();
});

emailDialog?.addEventListener('click', (event) => {
  if (event.target === emailDialog) emailDialog.close();
});

emailEnquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!emailEnquiryForm.reportValidity()) return;

  const formData = new FormData(emailEnquiryForm);
  const service = String(formData.get('service') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const details = String(formData.get('details') || '').trim();
  const subject = `Interior project enquiry — ${service}`;
  const body = [
    'Hi Morwal Interiors,',
    '',
    `I’m interested in: ${service}.`,
    location ? `Project location: ${location}.` : '',
    details ? `A little about my project: ${details}` : '',
    '',
    'Please let me know how we can get started. Thank you!',
  ].filter(Boolean).join('\n');
  const recipient = 'morwal.designs@gmail.com';
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (gmailDraftLink) gmailDraftLink.href = gmailUrl;
  if (mailAppDraftLink) mailAppDraftLink.href = mailtoUrl;
  if (emailSendOptions) emailSendOptions.hidden = false;
  gmailDraftLink?.focus();
});

emailEnquiryForm?.addEventListener('input', () => {
  if (emailSendOptions) emailSendOptions.hidden = true;
});

const projectGrid = document.querySelector('.project-grid');
const interiorDetails = [
  ['A considered interior', 'Thoughtful planning brought into a finished space.'],
  ['Made for everyday living', 'Comfort and function come together in this interior.'],
  ['A welcoming room', 'A warm, inviting approach to interior design.'],
  ['Details in balance', 'Careful choices bring the room together.'],
  ['Space with purpose', 'Design shaped around the way people use a room.'],
  ['A refined finish', 'Finishing touches give this interior its character.'],
  ['A fresh perspective', 'A new take on a familiar interior.'],
  ['Comfort, considered', 'A calm atmosphere built through thoughtful design.'],
  ['The finishing layer', 'Small design decisions make a lasting difference.'],
  ['A space to gather', 'An interior planned to feel open and welcoming.'],
  ['Everyday made better', 'Practical design with a considered look.'],
  ['Room to unwind', 'A comfortable setting with a relaxed feel.'],
  ['A thoughtful refresh', 'A fresh interior direction, finished with care.'],
  ['Form meets function', 'A useful space with a polished finish.'],
  ['A welcoming first impression', 'Design details set the tone for the room.'],
  ['Made to feel at home', 'A personal touch gives this space warmth.'],
  ['The details matter', 'Careful finishing brings the whole design together.'],
  ['A calmer atmosphere', 'A softer approach to everyday interior living.'],
  ['A well-used space', 'Planning makes room for what matters most.'],
  ['Texture and tone', 'Materials and finishes add depth to the interior.'],
  ['A considered layout', 'A practical arrangement with a clear design point of view.'],
  ['Simple, well finished', 'A clean design that keeps the focus on quality.'],
  ['A room with character', 'Distinctive details help the interior feel personal.'],
  ['Designed around you', 'A space shaped to suit the people who use it.'],
  ['A polished interior', 'The final details complete the overall look.'],
  ['Comfort in the details', 'Thoughtful finishing makes the space feel complete.'],
  ['A Morwal interior', 'A glimpse of the design work we do.'],
];
const photoGroups = [
  {
    category: 'soundproofing',
    label: 'SOUNDPROOFING',
    title: 'Acoustic treatment',
    description: 'Soundproofing for quieter, more comfortable spaces.',
    folder: 'Sound Proofing Works',
    details: [
      ['Acoustic finish', 'A closer look at carefully fitted sound treatment.'],
      ['Quiet-space upgrade', 'Designed to make busy rooms feel more comfortable.'],
      ['Sound control', 'Acoustic work integrated into the interior.'],
      ['Soundproofing detail', 'A neat finish for a more peaceful space.'],
      ['Acoustic improvement', 'Practical noise control, finished with care.'],
      ['Comfort through quiet', 'Sound-conscious design for everyday use.'],
      ['Interior sound treatment', 'A considered approach to room acoustics.'],
      ['A quieter setting', 'Built to soften noise and improve comfort.'],
      ['Finished acoustic work', 'Another detail from our soundproofing projects.'],
    ],
    files: [
      'WhatsApp Image 2026-10-30 at 8.50.52 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.51 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.50 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.50 PM (1).jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.49 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.48 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.47 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.45 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.44 PM.jpeg',
    ],
  },
  {
    category: 'partitions',
    label: 'ALUMINIUM PARTITIONS',
    title: 'Aluminium partitions',
    description: 'Clean, practical divisions for modern spaces.',
    folder: 'Aluminium Partitioning Work',
    details: [
      ['Aluminium room divider', 'A practical way to define separate areas.'],
      ['Partitioning in progress', 'Careful installation brings structure to the space.'],
      ['Clean partition lines', 'A crisp division that keeps the room feeling open.'],
      ['Space, reconfigured', 'Flexible room separation for changing needs.'],
      ['Partition finish', 'A durable aluminium detail, fitted with precision.'],
    ],
    files: [
      'WhatsApp Image 2026-10-30 at 8.51.27 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.51.25 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.51.25 PM (1).jpeg',
      'WhatsApp Image 2026-10-30 at 8.51.05 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.51.01 PM.jpeg',
    ],
  },
  {
    category: 'tv-stands',
    label: 'TV STANDS',
    title: 'Modern TV stands',
    description: 'Custom media units with a considered finish.',
    folder: 'Modern TV Stands',
    details: [
      ['Media wall feature', 'A focal point designed around the screen.'],
      ['Modern TV unit', 'Storage and display brought into one design.'],
      ['Living-room centrepiece', 'A made-to-fit feature for everyday entertainment.'],
      ['Tailored media storage', 'A tidy place for screens and accessories.'],
      ['TV stand detail', 'Clean finishing gives the unit a finished look.'],
      ['Entertainment made neat', 'A purposeful media feature for the room.'],
    ],
    files: [
      'WhatsApp Image 2026-10-30 at 8.50.37 PM (1).jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.44 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.39 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.38 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.38 PM (1).jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.37 PM.jpeg',
    ],
  },
  {
    category: 'cabinetry',
    label: 'CABINETRY',
    title: 'Custom cabinetry',
    description: 'Made-to-fit storage and cabinet details.',
    folder: 'Cabinet Works',
    details: [
      ['Fitted storage', 'Custom cabinetry planned to make room work harder.'],
      ['Cabinet finish', 'A close-up of carefully completed cabinet work.'],
      ['Made-to-fit cabinets', 'Practical storage shaped for the space.'],
      ['Cabinetry in detail', 'A considered finish for everyday storage.'],
    ],
    files: [
      'WhatsApp Image 2026-10-30 at 8.51.00 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.51.00 PM (1).jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.59 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.58 PM.jpeg',
    ],
  },
  {
    category: 'gypsum',
    label: 'GYPSUM WORK',
    title: 'Gypsum ceilings',
    description: 'Ceiling details and refined finishing.',
    folder: 'Gypsum works',
    details: [
      ['Gypsum ceiling detail', 'Ceiling work adds definition to the room.'],
      ['Ceiling finish', 'A clean overhead finish, completed with care.'],
      ['Gypsum work in progress', 'Craft and coordination shape the final result.'],
      ['Defined ceiling lines', 'A simple detail gives the room structure.'],
      ['Overhead feature', 'Gypsum finishing adds character above.'],
      ['A polished ceiling', 'The finishing work brings the design together.'],
      ['Gypsum finishing detail', 'Careful ceiling work for a refined interior.'],
    ],
    files: [
      'WhatsApp Image 2026-10-30 at 8.50.37 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.36 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.36 PM (1).jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.35 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.35 PM (1).jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.34 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.34 PM (1).jpeg',
    ],
  },
  {
    category: 'barbershop',
    label: 'BARBERSHOP',
    title: 'Barbershop fit-out',
    description: 'A welcoming, well-finished grooming space.',
    folder: 'Bebershop Works',
    details: [
      ['Barbershop interior', 'A practical, welcoming setting for the shop.'],
      ['Grooming space detail', 'Finishing touches help the space feel complete.'],
      ['Barbershop fit-out', 'A fresh look for a customer-ready interior.'],
    ],
    files: [
      'WhatsApp Image 2026-10-30 at 8.50.57 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.55 PM.jpeg',
      'WhatsApp Image 2026-10-30 at 8.50.54 PM.jpeg',
    ],
  },
];

function makeProjectCard({ src, category, label, title, description, isVideo = false }) {
  const card = document.createElement('a');
  card.className = 'project-card reveal';
  card.href = '#work';
  card.dataset.category = category;
  if (isVideo) {
    card.dataset.mediaType = 'video';
    card.dataset.mediaSrc = 'Photos/' + src.split('/').map(encodeURIComponent).join('/');
    card.classList.add('project-video-card');
  }
  card.setAttribute('aria-label', `${title}. ${description}`);

  const image = document.createElement('img');
  image.src = 'Photos/' + src.split('/').map(encodeURIComponent).join('/');
  image.alt = `${title} by Morwal Interiors`;
  image.loading = 'lazy';
  card.append(image);

  if (isVideo) {
    const playBadge = document.createElement('span');
    playBadge.className = 'video-play';
    playBadge.setAttribute('aria-hidden', 'true');
    playBadge.textContent = '▶';
    card.append(playBadge);
  }

  const meta = document.createElement('div');
  meta.className = 'project-meta';
  const text = document.createElement('div');
  const categoryLabel = document.createElement('span');
  categoryLabel.textContent = label;
  const heading = document.createElement('h3');
  heading.textContent = title;
  const summary = document.createElement('p');
  summary.className = 'project-description';
  summary.textContent = description;
  text.append(categoryLabel, heading, summary);
  const arrow = document.createElement('span');
  arrow.className = 'round-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  meta.append(text, arrow);
  card.append(meta);
  return card;
}

let interiorIndex = 0;
projectGrid?.querySelectorAll('.project-card').forEach((card) => {
  if (card.dataset.mediaType === 'video') {
    const title = card.querySelector('h3');
    const label = card.querySelector('.project-meta div > span');
    if (title) title.textContent = 'A closer look at our work';
    if (label) label.textContent = 'MORWAL ON SITE';
    card.setAttribute('aria-label', 'A closer look at Morwal project work');
    const summary = document.createElement('p');
    summary.className = 'project-description';
    summary.textContent = 'Short project moments from Morwal.';
    card.querySelector('.project-meta div')?.append(summary);
    return;
  }

  card.dataset.category = 'interior';
  const [interiorTitle, interiorDescription] = interiorDetails[interiorIndex] || interiorDetails[0];
  interiorIndex += 1;
  const title = card.querySelector('h3');
  const label = card.querySelector('.project-meta div > span');
  const image = card.querySelector('img');
  if (title) title.textContent = interiorTitle;
  if (label) label.textContent = 'INTERIOR WORK';
  if (image) image.alt = 'Interior design work by Morwal';
  card.setAttribute('aria-label', `${interiorTitle}. ${interiorDescription}`);
  const summary = document.createElement('p');
  summary.className = 'project-description';
  summary.textContent = interiorDescription;
  card.querySelector('.project-meta div')?.append(summary);
});

photoGroups.forEach((group) => {
  group.files.forEach((file, index) => {
    const [title, description] = group.details[index];
    projectGrid?.append(makeProjectCard({
      src: `${group.folder}/${file}`,
      category: group.category,
      label: group.label,
      title,
      description,
    }));
  });
});

const videoCard = projectGrid?.querySelector('[data-media-type="video"]');
if (videoCard) {
  const poster = videoCard.querySelector('img')?.getAttribute('src') || 'Photos/photo.jpeg';
  const videoPath = videoCard.dataset.mediaSrc.replace(/^Photos\//, '').split('/').map(decodeURIComponent).join('/');
  videoCard.replaceWith(makeProjectCard({
    src: videoPath,
    category: 'video',
    label: 'MORWAL ON SITE',
    title: 'A closer look at our work',
    description: 'Short project moments from Morwal.',
    isVideo: true,
  }));
  const currentVideoCard = projectGrid?.querySelector('[data-media-type="video"]');
  if (currentVideoCard) {
    currentVideoCard.querySelector('img').src = poster;
    projectGrid.append(currentVideoCard);
  }
}

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
const dialogVideo = document.querySelector('.dialog-video');
const dialogTitle = document.querySelector('.dialog-title');
const dialogCategory = document.querySelector('.dialog-category');
const dialogCount = document.querySelector('.dialog-count');
let visibleProjects = [];
let activeProjectIndex = 0;

function renderProject(index) {
  if (!projectDialog || !dialogImage || !dialogVideo || !dialogTitle || !dialogCategory || !dialogCount) return;
  activeProjectIndex = (index + visibleProjects.length) % visibleProjects.length;
  const card = visibleProjects[activeProjectIndex];
  const image = card.querySelector('img');
  dialogVideo.pause();
  const isVideo = card.dataset.mediaType === 'video';
  dialogImage.hidden = isVideo;
  dialogVideo.hidden = !isVideo;
  if (isVideo) {
    dialogVideo.src = card.dataset.mediaSrc;
    dialogVideo.load();
  } else {
    dialogVideo.removeAttribute('src');
    dialogVideo.load();
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
  }
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

document.querySelector('.dialog-close')?.addEventListener('click', () => {
  dialogVideo?.pause();
  projectDialog?.close();
});
document.querySelector('.dialog-prev')?.addEventListener('click', () => renderProject(activeProjectIndex - 1));
document.querySelector('.dialog-next')?.addEventListener('click', () => renderProject(activeProjectIndex + 1));
projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) {
    dialogVideo?.pause();
    projectDialog.close();
  }
});
projectDialog?.addEventListener('close', () => {
  dialogVideo?.pause();
  if (dialogVideo) dialogVideo.removeAttribute('src');
});
projectDialog?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') renderProject(activeProjectIndex - 1);
  if (event.key === 'ArrowRight') renderProject(activeProjectIndex + 1);
});

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => {
  backToTop?.classList.toggle('is-visible', window.scrollY > 500);
};
backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  window.scrollTo({ top: 0, left: 0, behavior });
});
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

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
