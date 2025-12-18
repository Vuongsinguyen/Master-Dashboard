# Master Dashboard - Feedback Data Structure

## Tổng quan
Dashboard này sử dụng dữ liệu feedback chi tiết từ file `src/data/feedbacks.json` thay vì dữ liệu tổng hợp như trước.

## Cấu trúc dữ liệu Feedback

Mỗi feedback bao gồm các trường sau:

```json
{
  "id": "fb_001",                    // Unique feedback ID
  "company": "heineken-vietnam-brewery", // Company name (slug format)
  "submitTime": "2024-01-15T09:30:00Z", // ISO timestamp
  "evaluation": "Dislike",           // Dislike, Normal, Like, Love
  "staff": "Nguyen Van Trung",           // Staff member name
  "issuesGroup": "Service Quality",  // Category of issue
  "issues": ["Long wait time", "Staff attitude"], // Array of specific issues
  "customer": "John Smith",          // Customer name
  "customerType": "Walk-in",         // Walk-in, Regular, VIP, Business, Enterprise
  "location": "Main Branch",         // Location/branch name
  "channel": "In-store",             // Submission channel
  "responseTime": 25,                // Response time in minutes
  "resolved": false,                 // Whether issue was resolved
  "priority": "High",                // Low, Medium, High, Critical
  "feedback": "Waited 45 minutes..." // Full feedback text
}
```

## Các Chart và Dữ liệu Sử dụng

### Chart 01: Total Feedbacks Bar Chart
- **Dữ liệu**: Số lượng feedback theo tháng cho mỗi công ty
- **Tính toán**: Đếm feedback theo `submitTime` (tháng)

### Chart 04: Sentiment Donut Chart
- **Dữ liệu**: Phân bố sentiment (Dislike, Normal, Like, Love)
- **Tính toán**: Đếm theo trường `evaluation`

### Chart 05: Feedback Volume Line Chart
- **Dữ liệu**: Khối lượng feedback theo tháng + tỷ lệ tham gia
- **Tính toán**: Volume = số feedback/tháng, Participation rate tính từ dữ liệu

### Chart 06: Negative Feedback Breakdown
- **Dữ liệu**: Phân tích vấn đề từ feedback tiêu cực
- **Tính toán**: Chỉ lấy feedback có `evaluation: "Dislike"`, đếm theo `issues`

### Chart 07: Store Performance Horizontal Bar
- **Dữ liệu**: Hiệu suất theo địa điểm
- **Tính toán**: Tỷ lệ positive feedback (Like + Love) theo `location`

### Chart 08: Time & Shift Pattern Heatmap
- **Dữ liệu**: Mật độ vấn đề theo ngày trong tuần và giờ
- **Tính toán**: Chỉ feedback `evaluation: "Dislike"`, theo `submitTime`

### Chart 09: Staff Performance Signals
- **Dữ liệu**: Điểm hiệu suất nhân viên theo tháng
- **Tính toán**: Algorithm dựa trên `evaluation`, `resolved`, `responseTime`

### Chart 10: Response Time & Action Rate
- **Dữ liệu**: Thời gian phản hồi và tỷ lệ hành động
- **Tính toán**: Trung bình `responseTime`, tỷ lệ resolved trong 10min/15min

### Chart 11: Improvement Loop
- **Dữ liệu**: Theo dõi cải thiện vấn đề "Long wait time"
- **Tính toán**: Đếm feedback có issue "Long wait time" theo tuần

## Cách cập nhật dữ liệu

1. **Thêm feedback mới**: Chỉnh sửa `src/data/feedbacks.json`
2. **Cập nhật charts**: Chạy `node update-charts.js`
3. **Khởi động server**: `npm start`

## Thống kê hiện tại
- **Tổng số feedback**: 1,897
- **Số công ty**: 8
- **Thời gian**: 12 tháng (2024)
- **Coverage**: Đầy đủ các trường dữ liệu

## Lợi ích của cấu trúc mới

1. **Phân tích sâu**: Có thể drill-down theo staff, location, time, issues
2. **Real-time updates**: Dễ dàng thêm feedback mới
3. **Flexible reporting**: Có thể tạo thêm charts mới từ dữ liệu có sẵn
4. **Business insights**: Hiểu rõ hơn về customer experience và operational issues