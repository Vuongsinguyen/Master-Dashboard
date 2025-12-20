class GanttChart {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.tasks = [];
    this.currentTaskId = null;
    this.draggedTask = null;
    this.dragOffset = { x: 0, y: 0 };

    // Date range settings
    this.startDate = null;
    this.endDate = null;
    this.loadDateRange();

    this.init();
    this.loadTasks();
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

    this.createTimelineHeader();
    this.addEventListeners();
    this.setupDualCalendar();
  }

  createTimelineHeader() {
    // Clear existing header
    const existingHeader = this.container.querySelector('.gantt-header');
    if (existingHeader) {
      existingHeader.remove();
    }

    const header = document.createElement('div');
    header.className = 'gantt-header flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';

    // Calculate total days between start and end date
    const totalDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Create day columns (limit to prevent too many columns)
    const maxDays = Math.min(totalDays, 60); // Limit to 60 days for performance

    for (let i = 0; i < maxDays; i++) {
      const currentDate = new Date(this.startDate);
      currentDate.setDate(this.startDate.getDate() + i);

      const dayDiv = document.createElement('div');
      dayDiv.className = 'gantt-day flex-shrink-0 p-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 min-w-[40px]';
      dayDiv.textContent = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
      header.appendChild(dayDiv);
    }

    this.container.insertBefore(header, this.container.firstChild);
  }

  loadDateRange() {
    const saved = localStorage.getItem('ganttDateRange');
    if (saved) {
      const range = JSON.parse(saved);
      this.startDate = new Date(range.startDate);
      this.endDate = new Date(range.endDate);
    }
  }

  saveDateRange() {
    const range = {
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString()
    };
    localStorage.setItem('ganttDateRange', JSON.stringify(range));
  }

  setupDateRangeControls() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const applyBtn = document.getElementById('applyDateRange');

    if (startDateInput && endDateInput) {
      // Set initial values
      startDateInput.value = this.startDate.toISOString().split('T')[0];
      endDateInput.value = this.endDate.toISOString().split('T')[0];

      // Apply button event
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          const newStartDate = new Date(startDateInput.value);
          const newEndDate = new Date(endDateInput.value);

          if (newStartDate && newEndDate && newStartDate < newEndDate) {
            this.startDate = newStartDate;
            this.endDate = newEndDate;
            this.saveDateRange();
            this.render(); // Re-render with new date range
          } else {
            alert('Please select a valid date range (start date must be before end date)');
          }
        });
      }
    }
  }

  showTaskModal(taskId = null) {
    this.currentTaskId = taskId;
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('taskForm');

    if (modal && modalTitle && form) {
      if (taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
          modalTitle.textContent = 'Edit Task';
          form.taskName.value = task.name;
          form.taskStartDate.value = task.startDate;
          form.taskEndDate.value = task.endDate;
          form.taskProgress.value = task.progress;
          form.taskPriority.value = task.priority;
          form.taskAssignee.value = task.assignee;
        }
      } else {
        modalTitle.textContent = 'Add New Task';
        form.reset();
        form.taskProgress.value = 0;
        form.taskPriority.value = 'medium';
      }

      modal.classList.remove('hidden');
    }
  }

  hideTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) {
      modal.classList.add('hidden');
    }
    this.currentTaskId = null;
  }

  saveTask() {
    const form = document.getElementById('taskForm');
    if (!form) return;

    const taskData = {
      id: this.currentTaskId || Date.now().toString(),
      name: form.taskName.value,
      startDate: form.taskStartDate.value,
      endDate: form.taskEndDate.value,
      progress: parseInt(form.taskProgress.value),
      priority: form.taskPriority.value,
      assignee: form.taskAssignee.value
    };

    if (this.currentTaskId) {
      // Update existing task
      const index = this.tasks.findIndex(t => t.id === this.currentTaskId);
      if (index !== -1) {
        this.tasks[index] = taskData;
      }
    } else {
      // Add new task
      this.tasks.push(taskData);
    }

    this.saveTasks();
    this.render();
    this.hideTaskModal();
  }

  deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.saveTasks();
      this.render();
    }
  }

  loadTasks() {
    const saved = localStorage.getItem('ganttTasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    } else {
      // Sample tasks
      const today = new Date();
      const weekFromNow = new Date(today);
      weekFromNow.setDate(today.getDate() + 7);
      const twoWeeksFromNow = new Date(today);
      twoWeeksFromNow.setDate(today.getDate() + 14);
      const threeWeeksFromNow = new Date(today);
      threeWeeksFromNow.setDate(today.getDate() + 21);

      this.tasks = [
        {
          id: '1',
          name: 'Project Planning',
          startDate: today.toISOString().split('T')[0],
          endDate: weekFromNow.toISOString().split('T')[0],
          progress: 100,
          priority: 'high',
          assignee: 'John Doe'
        },
        {
          id: '2',
          name: 'UI Design',
          startDate: weekFromNow.toISOString().split('T')[0],
          endDate: twoWeeksFromNow.toISOString().split('T')[0],
          progress: 75,
          priority: 'medium',
          assignee: 'Jane Smith'
        },
        {
          id: '3',
          name: 'Development',
          startDate: twoWeeksFromNow.toISOString().split('T')[0],
          endDate: threeWeeksFromNow.toISOString().split('T')[0],
          progress: 30,
          priority: 'high',
          assignee: 'Bob Johnson'
        }
      ];
    }
  }

  saveTasks() {
    localStorage.setItem('ganttTasks', JSON.stringify(this.tasks));
  }

  render() {
    // Clear existing task rows
    const existingRows = this.container.querySelectorAll('.gantt-task-row');
    existingRows.forEach(row => row.remove());

    // Render tasks
    this.tasks.forEach(task => {
      this.renderTask(task);
    });
  }

  renderTask(task) {
    const taskRow = document.createElement('div');
    taskRow.className = 'gantt-task-row flex border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50';

    // Task info column
    const taskInfo = document.createElement('div');
    taskInfo.className = 'gantt-task-info w-64 p-3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';

    const taskName = document.createElement('div');
    taskName.className = 'font-medium text-gray-900 dark:text-white';
    taskName.textContent = task.name;

    const taskMeta = document.createElement('div');
    taskMeta.className = 'text-sm text-gray-600 dark:text-gray-400 mt-1';
    taskMeta.textContent = `${task.assignee} • ${task.progress}% complete`;

    const taskActions = document.createElement('div');
    taskActions.className = 'flex gap-2 mt-2';

    const editBtn = document.createElement('button');
    editBtn.className = 'text-blue-500 hover:text-blue-700 text-sm';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => this.showTaskModal(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-red-500 hover:text-red-700 text-sm';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);

    taskInfo.appendChild(taskName);
    taskInfo.appendChild(taskMeta);
    taskInfo.appendChild(taskActions);

    // Timeline column
    const timeline = document.createElement('div');
    timeline.className = 'gantt-timeline flex flex-1 relative';

    // Add timeline columns
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - startDate.getDay());

    for (let i = 0; i < 12; i++) {
      const weekDiv = document.createElement('div');
      weekDiv.className = 'gantt-week-cell flex-1 border-r border-gray-200 dark:border-gray-700 min-h-[60px]';
      timeline.appendChild(weekDiv);
    }

    // Add task bar
    this.renderTaskBar(task, timeline);

    taskRow.appendChild(taskInfo);
    taskRow.appendChild(timeline);

    this.container.appendChild(taskRow);
  }

  renderTaskBar(task, timelineContainer) {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);

    // Calculate position in pixels (40px per day)
    const startOffsetDays = Math.max(0, Math.ceil((taskStart - this.startDate) / (1000 * 60 * 60 * 24)));
    const durationDays = Math.max(1, Math.ceil((taskEnd - taskStart) / (1000 * 60 * 60 * 24)) + 1);

    const dayWidth = 40; // pixels per day
    const leftPosition = startOffsetDays * dayWidth;
    const barWidth = Math.max(20, durationDays * dayWidth); // Minimum width of 20px

    const taskBar = document.createElement('div');
    taskBar.className = `gantt-task-bar absolute top-2 h-8 rounded cursor-move select-none ${this.getPriorityColor(task.priority)}`;
    taskBar.style.left = `${leftPosition}px`;
    taskBar.style.width = `${barWidth}px`;

    const progressBar = document.createElement('div');
    progressBar.className = 'h-full bg-white bg-opacity-30 rounded';
    progressBar.style.width = `${task.progress}%`;

    taskBar.appendChild(progressBar);

    const taskLabel = document.createElement('span');
    taskLabel.className = 'absolute inset-0 flex items-center justify-center text-xs font-medium text-white truncate px-1';
    taskLabel.textContent = task.name;
    taskBar.appendChild(taskLabel);

    // Add drag functionality
    this.addDragFunctionality(taskBar, task);

    timelineContainer.appendChild(taskBar);
  }

  getPriorityColor(priority) {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  addDragFunctionality(taskBar, task) {
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    taskBar.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startLeft = parseFloat(taskBar.style.left);
      taskBar.classList.add('opacity-75');
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const dayWidth = 40;
      const newLeftPx = Math.max(0, startLeft + deltaX);
      const newLeftDays = Math.round(newLeftPx / dayWidth);

      // Snap to day boundaries
      const snappedLeftPx = newLeftDays * dayWidth;
      taskBar.style.left = `${snappedLeftPx}px`;

      // Update task dates based on position
      this.updateTaskDates(task, newLeftDays);
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        taskBar.classList.remove('opacity-75');
        this.saveTasks();
        this.render();
      }
    });
  }

  updateTaskDates(task, daysOffset) {
    const newStartDate = new Date(this.startDate);
    newStartDate.setDate(newStartDate.getDate() + daysOffset);

    const duration = Math.max(1, (new Date(task.endDate) - new Date(task.startDate)) / (1000 * 60 * 60 * 24));
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + duration);

    task.startDate = newStartDate.toISOString().split('T')[0];
    task.endDate = newEndDate.toISOString().split('T')[0];
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
    const applyBtn = document.getElementById('applyDateRange');
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
}

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

// Initialize Gantt Chart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const ganttContainer = document.getElementById('ganttChart');
  if (ganttContainer) {
    new GanttChart('ganttChart');
  }
});

export default GanttChart;