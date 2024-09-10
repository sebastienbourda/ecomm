import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["notice"];

  connect() {
    window.addEventListener('flash:notice', this.showFlash.bind(this));
  }

  showFlash(event) {
    const message = event.detail.message;
    const noticeElement = document.createElement('div');
    noticeElement.innerHTML = `
      <div class="bg-white text-gray-900 p-4 rounded-lg shadow-lg flex justify-between items-center gap-4">
        <span>${message}</span>
        <button class="text-gray-900" data-action="notice#dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;
    this.element.appendChild(noticeElement);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      noticeElement.remove();
    }, 5000);
  }

  dismiss(event) {
    event.target.closest('div').remove();
  }
}
