/**
 * Cedar Pharmacy - Core Interactivity
 * Handles business hours status, mobile navigation, toast alerts, and refill dynamic form logic.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHoursStatus();
  initMobileNav();
  initContactForm();
  initRefillForm();
});

/**
 * 1. Business Hours Calculation
 * Minneapolis, MN timezone (America/Chicago)
 * Monday - Saturday: 9:00 AM - 7:00 PM
 * Sunday: Closed
 */
function initLiveHoursStatus() {
  const statusBadges = document.querySelectorAll('[data-pharmacy-status]');
  if (!statusBadges.length) return;

  function updateStatus() {
    try {
      const now = new Date();
      // Format to America/Chicago
      const options = { timeZone: 'America/Chicago', hour12: false, hour: 'numeric', minute: 'numeric', weekday: 'short' };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      
      let weekday = '';
      let hour = 0;
      let minute = 0;

      parts.forEach(p => {
        if (p.type === 'weekday') weekday = p.value;
        if (p.type === 'hour') hour = parseInt(p.value, 10);
        if (p.type === 'minute') minute = parseInt(p.value, 10);
      });

      const currentMinutes = hour * 60 + minute;
      const openMinutes = 9 * 60;   // 9:00 AM
      const closeMinutes = 19 * 60; // 7:00 PM

      let isOpen = false;
      let statusText = '';
      let subText = '';

      if (weekday === 'Sun') {
        isOpen = false;
        statusText = 'Closed Today';
        subText = 'Opens Monday at 9:00 AM';
      } else {
        if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
          isOpen = true;
          statusText = 'Open Now';
          subText = 'Closes today at 7:00 PM';
        } else if (currentMinutes < openMinutes) {
          isOpen = false;
          statusText = 'Closed';
          subText = 'Opens today at 9:00 AM';
        } else {
          isOpen = false;
          if (weekday === 'Sat') {
            statusText = 'Closed for the Day';
            subText = 'Opens Monday at 9:00 AM';
          } else {
            statusText = 'Closed for the Day';
            subText = 'Opens tomorrow at 9:00 AM';
          }
        }
      }

      statusBadges.forEach(badge => {
        if (isOpen) {
          badge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200';
          badge.innerHTML = `
            <span class="w-2 h-2 rounded-full bg-emerald-500 status-indicator-dot"></span>
            <span><strong>${statusText}</strong> &bull; ${subText}</span>
          `;
        } else {
          badge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200';
          badge.innerHTML = `
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span><strong>${statusText}</strong> &bull; ${subText}</span>
          `;
        }
      });
    } catch (e) {
      console.warn('Could not determine live hours accurately:', e);
    }
  }

  updateStatus();
  // Refresh every 60 seconds
  setInterval(updateStatus, 60000);
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');

  if (!toggleBtn || !drawer) return;

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
}

/**
 * 3. Toast Notifications
 */
function showToast(title, message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-soft-lg border transition-all duration-300 transform translate-y-4 opacity-0 ${
    type === 'success' ? 'bg-white border-emerald-200 text-slate-800' : 'bg-white border-rose-200 text-slate-800'
  }`;

  const iconSvg = type === 'success' 
    ? `<svg class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    : `<svg class="w-5 h-5 text-rose-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1 text-sm">
      <h4 class="font-semibold text-slate-900">${title}</h4>
      <p class="text-slate-600 mt-0.5">${message}</p>
    </div>
    <button class="text-slate-400 hover:text-slate-600 p-1" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 20);

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

/**
 * 4. Contact Form Handler
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      showToast('Message Sent!', 'Thank you for reaching out to Cedar Pharmacy. Our team will contact you shortly.', 'success');
    }, 1000);
  });
}

/**
 * 5. Prescription Refill Form Logic
 */
function initRefillForm() {
  const refillForm = document.getElementById('refill-request-form');
  if (!refillForm) return;

  const rxContainer = document.getElementById('rx-list-container');
  const addRxBtn = document.getElementById('add-rx-btn');
  const summaryName = document.getElementById('summary-patient-name');
  const summaryPhone = document.getElementById('summary-phone');
  const summaryDob = document.getElementById('summary-dob');
  const summaryRxCount = document.getElementById('summary-rx-count');
  const summaryMethod = document.getElementById('summary-method');

  // Input listeners to update live summary card
  const nameInput = document.getElementById('patient-name');
  const phoneInput = document.getElementById('patient-phone');
  const dobInput = document.getElementById('patient-dob');
  const methodInputs = document.querySelectorAll('input[name="fulfillment_method"]');

  function updateLiveSummary() {
    if (summaryName && nameInput) summaryName.textContent = nameInput.value.trim() || '—';
    if (summaryPhone && phoneInput) summaryPhone.textContent = phoneInput.value.trim() || '—';
    if (summaryDob && dobInput) summaryDob.textContent = dobInput.value.trim() || '—';
    
    if (summaryRxCount && rxContainer) {
      const rxCards = rxContainer.querySelectorAll('.rx-item-row');
      summaryRxCount.textContent = `${rxCards.length} ${rxCards.length === 1 ? 'Medication' : 'Medications'}`;
    }

    if (summaryMethod) {
      const checked = document.querySelector('input[name="fulfillment_method"]:checked');
      summaryMethod.textContent = checked ? (checked.value === 'delivery' ? 'Home Delivery' : 'In-Store Pickup') : 'In-Store Pickup';
    }
  }

  if (nameInput) nameInput.addEventListener('input', updateLiveSummary);
  if (phoneInput) phoneInput.addEventListener('input', updateLiveSummary);
  if (dobInput) dobInput.addEventListener('change', updateLiveSummary);
  methodInputs.forEach(radio => radio.addEventListener('change', updateLiveSummary));

  // Add another prescription row
  let rxIndex = 1;
  if (addRxBtn && rxContainer) {
    addRxBtn.addEventListener('click', () => {
      rxIndex++;
      const newRow = document.createElement('div');
      newRow.className = 'rx-item-row p-4 rounded-xl border border-slate-200 bg-slate-50/70 relative transition-all duration-200';
      newRow.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-2.5 py-0.5 rounded-full">Medication #${rxIndex}</span>
          <button type="button" class="text-xs text-rose-600 hover:text-rose-800 font-medium remove-rx-btn flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Remove
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Prescription (Rx) Number *</label>
            <input type="text" required name="rx_numbers[]" placeholder="e.g. 6543219" class="form-input text-sm">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Medication Name & Strength (Optional)</label>
            <input type="text" name="med_names[]" placeholder="e.g. Lisinopril 10mg" class="form-input text-sm">
          </div>
        </div>
      `;

      rxContainer.appendChild(newRow);
      updateLiveSummary();

      newRow.querySelector('.remove-rx-btn').addEventListener('click', () => {
        newRow.remove();
        updateLiveSummary();
      });
    });
  }

  // Refill Form Submission
  refillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = refillForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Validate confirmation checkbox
    const ackCheckbox = document.getElementById('refill-ack');
    if (ackCheckbox && !ackCheckbox.checked) {
      alert('Please acknowledge the refill policy terms before submitting.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing Request...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const randomCode = 'CDR-' + Math.floor(100000 + Math.random() * 900000);
      const patientNameVal = nameInput ? nameInput.value : 'Valued Patient';
      const rxCountVal = rxContainer.querySelectorAll('.rx-item-row').length;

      // Show confirmation modal
      openConfirmationModal(randomCode, patientNameVal, rxCountVal);
      refillForm.reset();
      updateLiveSummary();
    }, 1200);
  });
}

function openConfirmationModal(refCode, patientName, rxCount) {
  const modal = document.getElementById('confirmation-modal');
  if (!modal) {
    showToast('Refill Request Received!', `Your reference code is ${refCode}. We will verify your prescription.`, 'success');
    return;
  }

  const modalRefCode = document.getElementById('modal-ref-code');
  const modalPatientName = document.getElementById('modal-patient-name');
  const modalRxCount = document.getElementById('modal-rx-count');

  if (modalRefCode) modalRefCode.textContent = refCode;
  if (modalPatientName) modalPatientName.textContent = patientName;
  if (modalRxCount) modalRxCount.textContent = `${rxCount} ${rxCount === 1 ? 'prescription' : 'prescriptions'}`;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const closeButtons = modal.querySelectorAll('[data-close-modal]');
  closeButtons.forEach(btn => {
    btn.onclick = () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    };
  });
}
