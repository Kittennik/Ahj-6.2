export default class Images {
  constructor() {
    if (typeof document === 'undefined') return;
    this.dnd = document.getElementById('dnd');
    this.images = document.getElementById('images');
    this.input = document.getElementById('input-file');
  }

  init() {
    if (typeof document === 'undefined') return;
    this.dnd.addEventListener('click', () => {
      this.input.value = null;
      this.input.dispatchEvent(new MouseEvent('click'));
    });

    this.dnd.addEventListener('dragover', (e) => e.preventDefault());

    this.dnd.addEventListener('drop', (e) => {
      e.preventDefault();
      this.load(Array.from(e.dataTransfer.files));
    });

    this.input.addEventListener('input', (e) => {
      this.load(Array.from(e.currentTarget.files));
    });

    this.images.addEventListener('click', (e) => {
      if (e.target.className === 'close') {
        this.images.removeChild(e.target.closest('.img-container'));
      }
    });
  }

  load(files) {
    files.forEach((item) => {
      const url = URL.createObjectURL(item);
      this.create(url);
      this.input.addEventListener('load', () => URL.revokeObjectURL(url));
    });
  }

  create(url) {
    if (typeof document === 'undefined') return;
    const img = document.createElement('img');
    img.src = url;
    img.className = 'img';

    img.addEventListener('load', () => {
      const container = document.createElement('div');
      container.className = 'img-container';
      container.innerHTML = '<div class="close">X</div>';
      container.appendChild(img);
      this.images.appendChild(container);
    });
  }
}
