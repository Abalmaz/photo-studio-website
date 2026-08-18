// --- Gallery: load from manifest, render, and filter ---
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('gallery-grid');
  const emptyMsg = document.getElementById('gallery-empty');
  const filterButtons = document.querySelectorAll('.gallery-filter');

  if (!grid) return; // not on the gallery page

  fetch('/images/gallery-manifest.json')
    .then(res => {
      if (!res.ok) throw new Error('Manifest not found');
      return res.json();
    })
    .then(manifest => {
      renderGallery(manifest);
      setupFilters();
    })
    .catch(err => {
      console.error('Could not load gallery manifest:', err);
      emptyMsg.hidden = false;
      emptyMsg.textContent = 'Gallery photos could not be loaded right now.';
    });

  function renderGallery(manifest) {
    const categories = ['maternity', 'newborn', 'cakesmash', '6months'];
    let totalPhotos = 0;

    categories.forEach(category => {
      const files = manifest[category] || [];
      files.forEach(filename => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.category = category;

        const img = document.createElement('img');
        img.src = `/images/${category}/${filename}`;
        img.alt = `${categoryLabel(category)} session photo`;
        img.loading = 'lazy';

        item.appendChild(img);
        grid.appendChild(item);
        totalPhotos++;
      });
    });

    if (totalPhotos === 0) {
      emptyMsg.hidden = false;
      emptyMsg.textContent = 'No photos found yet — check back soon.';
    }
  }

  function setupFilters() {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const items = document.querySelectorAll('.gallery-item');
        let visibleCount = 0;

        items.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('is-hidden', !match);
          if (match) visibleCount++;
        });

        emptyMsg.hidden = visibleCount > 0;
        if (visibleCount === 0) {
          emptyMsg.textContent = 'No photos found in this category yet.';
        }
      });
    });
  }

  function categoryLabel(category) {
    const labels = {
      maternity: 'Maternity',
      newborn: 'Newborn',
      cakesmash: 'Cake Smash',
      '6months': '6 Month Milestone'
    };
    return labels[category] || category;
  }
});