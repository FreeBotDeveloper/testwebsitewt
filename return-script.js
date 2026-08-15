// DOM Elements
const btnSearch = document.getElementById('btnSearch');
const searchInput = document.getElementById('searchInput');
const returnInfoCard = document.getElementById('returnInfoCard');
const actionButtons = document.getElementById('actionButtons');

const returnDateInput = document.getElementById('returnDateInput');
const returnTimeInput = document.getElementById('returnTimeInput');
const noteInput = document.getElementById('noteInput');

const btnCancel = document.getElementById('btnCancel');
const btnSave = document.getElementById('btnSave');

// Initialize Date/Time
function initDateTime() {
  const today = new Date();
  
  // Format Date: DD/MM/YYYY (+543 for Thai Year)
  const d = String(today.getDate()).padStart(2, '0');
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const y = today.getFullYear() + 543;
  if (returnDateInput) returnDateInput.value = `${d}/${m}/${y}`;
  
  // Format Time: HH:MM
  const time = today.toTimeString().substring(0, 5);
  if (returnTimeInput) returnTimeInput.value = time;
}

// Event Listeners
if (btnSearch) {
  btnSearch.addEventListener('click', () => {
    const val = searchInput.value.trim();
    if (val === '004' || val !== '') {
      // Show info (already visible in HTML, but this simulates finding it)
      if(returnInfoCard) returnInfoCard.style.display = 'flex';
      if(actionButtons) actionButtons.classList.remove('hidden');
    } else {
      alert('กรุณากรอกเลขบัตร');
    }
  });
}

if (btnCancel) {
  btnCancel.addEventListener('click', () => {
    searchInput.value = '';
    if(returnInfoCard) returnInfoCard.style.display = 'none';
    if(actionButtons) actionButtons.classList.add('hidden');
    noteInput.value = '';
    initDateTime();
  });
}

if (btnSave) {
  btnSave.addEventListener('click', () => {
    alert('บันทึกการคืนบัตรสำเร็จ');
    // Reset form
    searchInput.value = '';
    if(returnInfoCard) returnInfoCard.style.display = 'none';
    if(actionButtons) actionButtons.classList.add('hidden');
    noteInput.value = '';
    initDateTime();
  });
}

// Init
initDateTime();
