// Initial Data
const initialCards = [
  { id: '001', status: 'available' },
  { id: '002', status: 'borrowed', borrower: 'ครูศิวลี' },
  { id: '003', status: 'available' },
  { id: '004', status: 'available' },
  { id: '005', status: 'available' },
  { id: '006', status: 'available' },
  { id: '007', status: 'available' },
  { id: '008', status: 'available' },
  { id: '009', status: 'available' },
  { id: '010', status: 'borrowed', borrower: 'ครูพิชญะ' }
];

let selectedCardId = '004';
let isDirty = false;

// DOM Elements
const cardGrid = document.getElementById('cardGrid');
const selectionStatusText = document.getElementById('selectionStatusText');
const actionButtons = document.getElementById('actionButtons');
const btnCancel = document.getElementById('btnCancel');
const btnSave = document.getElementById('btnSave');

const inputs = [
  document.getElementById('borrowerInput'),
  document.getElementById('phoneInput'),
  document.getElementById('purposeInput'),
  document.getElementById('noteInput'),
  document.getElementById('dateInput'),
  document.getElementById('timeInput')
];

// Functions
function renderCards() {
  if (!cardGrid) return;
  cardGrid.innerHTML = '';
  
  initialCards.forEach(card => {
    const isSelected = card.id === selectedCardId;
    const isBorrowed = card.status === 'borrowed';
    
    let cardClass = 'selectable-card';
    if (isBorrowed) cardClass += ' borrowed';
    else if (isSelected) cardClass += ' selected';
    else cardClass += ' available';
    
    let statusLabel = 'พร้อมให้เบิก';
    if (isBorrowed) statusLabel = card.borrower;
    else if (isSelected) statusLabel = 'เลือกแล้ว';

    const btn = document.createElement('button');
    btn.className = cardClass;
    if (isBorrowed) btn.disabled = true;
    
    btn.onclick = () => {
      if (!isBorrowed) {
        selectedCardId = card.id;
        markDirty();
        renderCards();
      }
    };
    
    let html = `
      <div class="card-id">${card.id}</div>
      <div class="card-status">${statusLabel}</div>
    `;
    
    if (isSelected) {
      html += `
        <div class="check-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      `;
    }
    
    btn.innerHTML = html;
    cardGrid.appendChild(btn);
  });
  
  updateSelectionStatus();
}

function updateSelectionStatus() {
  if (!selectionStatusText) return;
  if (selectedCardId) {
    selectionStatusText.textContent = 'เลือกแล้ว 1 ใบ';
    selectionStatusText.className = 'text-success bold-status';
  } else {
    selectionStatusText.textContent = 'ยังไม่เลือกบัตร';
    selectionStatusText.className = 'text-gray bold-status';
  }
}

function markDirty() {
  isDirty = true;
  if (actionButtons) {
    actionButtons.classList.remove('hidden');
  }
}

function resetForm() {
  isDirty = false;
  selectedCardId = '';
  
  if (actionButtons) {
    actionButtons.classList.add('hidden');
  }
  
  // Reset inputs to default
  if (inputs[0]) inputs[0].value = 'ครูศิวลี ยิ้มขาว';
  if (inputs[1]) inputs[1].value = '';
  if (inputs[2]) inputs[2].value = 'ฝึกซ้อมกิจกรรมศิลปะ';
  if (inputs[3]) inputs[3].value = '';
  
  const today = new Date();
  if (inputs[4]) inputs[4].value = today.toISOString().split('T')[0];
  if (inputs[5]) inputs[5].value = today.toTimeString().substring(0, 5);
  
  renderCards();
}

// Event Listeners
inputs.forEach(input => {
  if (input) {
    input.addEventListener('input', markDirty);
    input.addEventListener('change', markDirty);
  }
});

if (btnCancel) {
  btnCancel.addEventListener('click', resetForm);
}

if (btnSave) {
  btnSave.addEventListener('click', () => {
    if (!selectedCardId) {
      alert('กรุณาเลือกบัตร');
      return;
    }
    alert('บันทึกการเบิกสำเร็จ');
    resetForm();
  });
}

// Init
renderCards();
