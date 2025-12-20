class DualCalendarPicker {
  constructor(inputId, onRangeSelect) {
    this.input = document.getElementById(inputId);
    this.container = document.getElementById('dualCalendarContainer');
    this.startCalendar = document.getElementById('startCalendar');
    this.endCalendar = document.getElementById('endCalendar');
    this.selectedRange = document.getElementById('selectedRange');
    this.onRangeSelect = onRangeSelect;

    this.startDate = null;
    this.endDate = null;
    this.currentStartMonth = new Date();
    this.currentEndMonth = new Date();

    this.init();
  }

  init() {
    // Show calendar when clicking input
    this.input.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = this.input.getBoundingClientRect();
      this.container.style.left = rect.left + 'px';
      this.container.style.top = (rect.bottom + 5) + 'px';
      this.show();
    });

    // Hide calendar when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target) && e.target !== this.input) {
        this.hide();
      }
    });

    // Clear button
    document.getElementById('clearDateRange').addEventListener('click', (e) => {
      e.stopPropagation();
      this.clear();
    });

    // Cancel button
    document.getElementById('cancelRange').addEventListener('click', () => {
      this.hide();
    });

    // Confirm button
    document.getElementById('confirmRange').addEventListener('click', () => {
      if (this.startDate && this.endDate) {
        this.onRangeSelect(this.startDate, this.endDate);
        this.updateInput();
        this.hide();
      }
    });

    // Initialize calendars
    this.renderCalendars();
  }

  show() {
    this.container.classList.remove('hidden');
    this.renderCalendars();
  }

  hide() {
    this.container.classList.add('hidden');
  }

  clear() {
    this.startDate = null;
    this.endDate = null;
    this.input.value = '';
    this.selectedRange.textContent = 'Chưa chọn khoảng thời gian';
    this.renderCalendars();
  }

  updateInput() {
    if (this.startDate && this.endDate) {
      const startStr = this.formatDate(this.startDate);
      const endStr = this.formatDate(this.endDate);
      this.input.value = `${startStr} - ${endStr}`;
    }
  }

  formatDate(date) {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  renderCalendars() {
    this.renderCalendar(this.startCalendar, this.currentStartMonth, 'start');
    this.renderCalendar(this.endCalendar, this.currentEndMonth, 'end');
    this.updateSelectedRange();
  }

  renderCalendar(container, currentMonth, type) {
    container.innerHTML = '';

    // Month/Year header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-2';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded';
    prevBtn.innerHTML = '‹';
    prevBtn.addEventListener('click', () => {
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      this.renderCalendars();
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded';
    nextBtn.innerHTML = '›';
    nextBtn.addEventListener('click', () => {
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      this.renderCalendars();
    });

    const monthYear = document.createElement('span');
    monthYear.className = 'text-sm font-medium';
    monthYear.textContent = currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

    header.appendChild(prevBtn);
    header.appendChild(monthYear);
    header.appendChild(nextBtn);
    container.appendChild(header);

    // Day headers
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayHeader = document.createElement('div');
    dayHeader.className = 'grid grid-cols-7 gap-1 mb-1';

    daysOfWeek.forEach(day => {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1';
      dayDiv.textContent = day;
      dayHeader.appendChild(dayDiv);
    });
    container.appendChild(dayHeader);

    // Calendar grid
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'grid grid-cols-7 gap-1';

    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day text-sm cursor-pointer';
      dayDiv.textContent = date.getDate();

      // Style for different states
      if (date.getMonth() !== currentMonth.getMonth()) {
        dayDiv.classList.add('other-month');
      }

      if (this.isSelectedDate(date, type)) {
        dayDiv.classList.add('selected');
      } else if (this.isInRange(date)) {
        dayDiv.classList.add('in-range');
      }

      dayDiv.addEventListener('click', () => {
        this.selectDate(date, type);
      });

      calendarGrid.appendChild(dayDiv);
    }

    container.appendChild(calendarGrid);
  }

  isSelectedDate(date, type) {
    if (type === 'start' && this.startDate) {
      return date.toDateString() === this.startDate.toDateString();
    } else if (type === 'end' && this.endDate) {
      return date.toDateString() === this.endDate.toDateString();
    }
    return false;
  }

  isInRange(date) {
    if (!this.startDate || !this.endDate) return false;
    return date >= this.startDate && date <= this.endDate;
  }

  selectDate(date, type) {
    if (type === 'start') {
      this.startDate = new Date(date);
      if (this.endDate && this.startDate > this.endDate) {
        this.endDate = null;
      }
      // Auto-adjust end calendar month if start date is in a different month
      if (this.startDate.getMonth() !== this.currentEndMonth.getMonth() ||
          this.startDate.getFullYear() !== this.currentEndMonth.getFullYear()) {
        this.currentEndMonth = new Date(this.startDate);
        if (this.startDate.getMonth() === 11) { // December
          this.currentEndMonth.setFullYear(this.startDate.getFullYear() + 1);
          this.currentEndMonth.setMonth(0); // January
        } else {
          this.currentEndMonth.setMonth(this.startDate.getMonth() + 1);
        }
      }
    } else if (type === 'end') {
      if (!this.startDate || date >= this.startDate) {
        this.endDate = new Date(date);
      }
    }

    this.renderCalendars();
  }

  updateSelectedRange() {
    if (this.startDate && this.endDate) {
      const startStr = this.formatDate(this.startDate);
      const endStr = this.formatDate(this.endDate);
      this.selectedRange.textContent = `${startStr} - ${endStr}`;
    } else if (this.startDate) {
      const startStr = this.formatDate(this.startDate);
      this.selectedRange.textContent = `Từ ${startStr}`;
    } else {
      this.selectedRange.textContent = 'Chưa chọn khoảng thời gian';
    }
  }
}

class TimelineChart {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.startDate = null;
    this.endDate = null;
    this.events = [];
    this.loadDateRange();
    this.init();
    this.loadSampleEvents();
    this.render();
  }

  init() {
    // Set default date range if not set
    if (!this.startDate || !this.endDate) {
      const today = new Date();
      this.startDate = new Date(today);
      this.startDate.setDate(today.getDate() - 7); // 1 week ago
      this.endDate = new Date(today);
      this.endDate.setDate(today.getDate() + 21); // 3 weeks from now
      this.saveDateRange();
    }

    this.setupDualCalendar();
  }

  setupDualCalendar() {
    this.dualCalendar = new DualCalendarPicker('timelineDateRange', (startDate, endDate) => {
      this.startDate = startDate;
      this.endDate = endDate;
      this.saveDateRange();
      this.render();
    });

    // Set initial values
    this.dualCalendar.startDate = new Date(this.startDate);
    this.dualCalendar.endDate = new Date(this.endDate);
    this.dualCalendar.currentStartMonth = new Date(this.startDate);
    this.dualCalendar.currentEndMonth = new Date(this.endDate);
    this.dualCalendar.updateInput();

    // Apply button (legacy support)
    const applyBtn = document.getElementById('applyTimelineRange');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        if (this.dualCalendar.startDate && this.dualCalendar.endDate) {
          this.startDate = new Date(this.dualCalendar.startDate);
          this.endDate = new Date(this.dualCalendar.endDate);
          this.saveDateRange();
          this.render();
        } else {
          alert('Vui lòng chọn khoảng thời gian hợp lệ');
        }
      });
    }
  }

  loadSampleEvents() {
    // Sample events for demonstration
    const today = new Date();
    this.events = [
      {
        id: 1,
        title: 'Họp nhóm dự án',
        startDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'completed',
        color: 'bg-blue-500'
      },
      {
        id: 2,
        title: 'Phát triển tính năng mới',
        startDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'in-progress',
        color: 'bg-yellow-500'
      },
      {
        id: 3,
        title: 'Test và QA',
        startDate: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        color: 'bg-red-500'
      },
      {
        id: 4,
        title: 'Triển khai sản phẩm',
        startDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        color: 'bg-red-500'
      },
      {
        id: 5,
        title: 'Đánh giá hiệu suất',
        startDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        color: 'bg-red-500'
      }
    ];
  }

  render() {
    this.renderTimelineHeader();
    this.renderTimelineBody();
  }

  renderTimelineHeader() {
    const headerContainer = document.getElementById('timelineDates');
    if (!headerContainer) return;

    headerContainer.innerHTML = '';

    const totalDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(this.startDate);
      currentDate.setDate(this.startDate.getDate() + i);

      const dateDiv = document.createElement('div');
      dateDiv.className = 'w-20 flex-shrink-0 p-3 text-center text-xs font-medium text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700';
      dateDiv.textContent = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
      headerContainer.appendChild(dateDiv);
    }
  }

  renderTimelineBody() {
    const bodyContainer = document.getElementById('timelineBody');
    if (!bodyContainer) return;

    bodyContainer.innerHTML = '';

    this.events.forEach(event => {
      const eventRow = document.createElement('div');
      eventRow.className = 'flex border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50';

      // Event title column
      const titleCol = document.createElement('div');
      titleCol.className = 'w-48 flex-shrink-0 p-3 font-medium text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700';
      titleCol.textContent = event.title;
      eventRow.appendChild(titleCol);

      // Timeline column
      const timelineCol = document.createElement('div');
      timelineCol.className = 'flex flex-1 relative';
      timelineCol.style.minWidth = '0'; // Allow flex shrinking

      // Calculate event position and width
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const totalDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;

      const startOffsetDays = Math.max(0, Math.ceil((eventStart - this.startDate) / (1000 * 60 * 60 * 24)));
      const durationDays = Math.max(1, Math.ceil((eventEnd - eventStart) / (1000 * 60 * 60 * 24)) + 1);

      const startOffsetPercent = (startOffsetDays / totalDays) * 100;
      const durationPercent = Math.min(100 - startOffsetPercent, (durationDays / totalDays) * 100);

      // Create event bar
      const eventBar = document.createElement('div');
      eventBar.className = `absolute top-2 h-8 rounded ${event.color} text-white text-xs flex items-center justify-center font-medium shadow-sm`;
      eventBar.style.left = `${startOffsetPercent}%`;
      eventBar.style.width = `${Math.max(2, durationPercent)}%`;
      eventBar.textContent = event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title;

      timelineCol.appendChild(eventBar);
      eventRow.appendChild(timelineCol);

      bodyContainer.appendChild(eventRow);
    });
  }
}

// Initialize Timeline Chart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const timelineContainer = document.getElementById('timelineChart');
  if (timelineContainer) {
    new TimelineChart('timelineChart');
  }
});

export default TimelineChart;