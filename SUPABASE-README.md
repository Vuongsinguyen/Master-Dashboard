# Supabase Integration Setup

## Tổng quan
Dự án đã được tích hợp với Supabase để lưu trữ dữ liệu thay vì localStorage. Điều này cho phép:
- Lưu trữ dữ liệu tập trung
- Đa người dùng
- Real-time updates
- Authentication

## Cài đặt Supabase

### 1. Tạo Supabase Project
1. Truy cập [supabase.com](https://supabase.com)
2. Tạo tài khoản và project mới
3. Chờ project được tạo xong

### 2. Cấu hình Database
1. Trong Supabase Dashboard, vào phần "SQL Editor"
2. Copy và chạy file `database-schema.sql` để tạo tables và policies

### 3. Lấy API Keys
1. Trong Settings > API, copy:
   - Project URL
   - Anon public key

### 4. Cập nhật cấu hình
Chỉnh sửa file `src/js/config/supabase.js`:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## Cấu trúc Database

### Tasks Table
- `id`: Primary key (string)
- `name`: Tên task
- `start_date`: Ngày bắt đầu
- `end_date`: Ngày kết thúc
- `progress`: Tiến độ (0-100)
- `priority`: Độ ưu tiên (low, medium, high, critical)
- `assignee`: Người thực hiện
- `created_at`, `updated_at`: Timestamps

### Feedbacks Table
- `id`: Primary key (string)
- `company`: Tên công ty
- `submit_time`: Thời gian gửi
- `evaluation`: Đánh giá (Love, Like, Normal, Dislike, Hate)
- `staff`: Nhân viên
- `issues_group`: Nhóm vấn đề
- `issues`: Danh sách vấn đề (JSON)
- `customer`: Khách hàng
- `customer_type`: Loại khách hàng
- `location`: Địa điểm
- `channel`: Kênh
- `response_time`: Thời gian phản hồi
- `resolved`: Đã giải quyết
- `priority`: Độ ưu tiên
- `feedback`: Nội dung phản hồi

### User Settings Table
- `id`: Primary key (UUID)
- `user_id`: User ID từ auth
- `settings`: Cài đặt người dùng (JSON)
- `created_at`, `updated_at`: Timestamps

## Authentication (Tùy chọn)

Để thêm authentication, bạn có thể:

1. Tạo auth UI components
2. Sử dụng Supabase Auth methods:
   - `dbService.signUp(email, password)`
   - `dbService.signIn(email, password)`
   - `dbService.signOut()`
   - `dbService.getCurrentUser()`

## Real-time Features

Để thêm real-time updates:

```javascript
// Subscribe to tasks changes
const tasksSubscription = dbService.subscribeToTasks((payload) => {
  console.log('Tasks changed:', payload);
  // Reload tasks or update UI
});

// Subscribe to feedbacks changes
const feedbacksSubscription = dbService.subscribeToFeedbacks((payload) => {
  console.log('Feedbacks changed:', payload);
  // Reload feedbacks or update UI
});

// Unsubscribe when done
tasksSubscription.unsubscribe();
feedbacksSubscription.unsubscribe();
```

## Migration từ localStorage

Dữ liệu hiện tại trong localStorage sẽ được migrate tự động lần đầu tiên chạy app với Supabase được cấu hình.

## Troubleshooting

### Lỗi kết nối
- Kiểm tra SUPABASE_URL và SUPABASE_ANON_KEY
- Đảm bảo project Supabase đang active

### Lỗi permissions
- Kiểm tra Row Level Security policies
- Đảm bảo user đã authenticated (nếu cần)

### Dữ liệu không sync
- Kiểm tra console logs cho error messages
- Verify table structure matches schema