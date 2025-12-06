# College Event Management System

A comprehensive web-based platform for managing college events, registrations, and user interactions. This system provides a seamless experience for students, faculty, and administrators to organize and participate in college events.

## 🌟 Features

### For Students
- **Registration & Login**: Secure account creation and authentication
- **Event Discovery**: Browse and search through upcoming college events
- **Event Registration**: Easy registration for interested events
- **Personal Dashboard**: View personal registrations and event history
- **Event Details**: Access comprehensive information about each event

### For Faculty
- **Faculty Login**: Dedicated access with faculty credentials
- **Event Management**: Create, edit, and manage events
- **Student Oversight**: View and manage student registrations
- **Resource Sharing**: Upload materials and resources for events
- **Communication Tools**: Send announcements and messages

### For Administrators
- **Admin Dashboard**: Comprehensive system overview and controls
- **User Management**: Manage student and faculty accounts
- **Event Approval**: Review and approve event submissions
- **Analytics & Reports**: View system statistics and generate reports
- **System Configuration**: Configure global settings and preferences

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Storage**: LocalStorage for client-side data persistence
- **UI Framework**: Custom responsive design with modern CSS
- **Graphics**: Chart.js for data visualization (in dashboards)
- **Navigation**: Single Page Application (SPA) style navigation

## 📁 Project Structure

```
College_Event_Management_System/
├── assets/
│   ├── images/
│   │   ├── events/
│   │   │   ├── ai.png
│   │   │   ├── compsa.jpg
│   │   │   ├── naac.jpg
│   │   │   ├── tech.png
│   │   │   ├── techfest.jpg
│   │   │   └── yuvabeat.jpg
│   │   ├── hero.jpg
│   │   ├── hero.png
│   │   ├── image.png
│   │   └── placeholder.jpg
│   └── logos/
│       └── logo.png
├── css/
│   └── style.css              # All styling and layout
├── js/
│   ├── auth.js                # Authentication and user management
│   └── script.js              # General functionality and event handling
├── pages/
│   ├── auth/
│   │   ├── student-login.html
│   │   └── faculty-login.html
│   ├── dashboard/
│   │   ├── student-dashboard.html
│   │   ├── faculty-dashboard.html
│   │   └── admin-dashboard.html
│   ├── events/
│   │   └── events.html
│   └── user/
│       ├── student-signup.html
│       ├── register.html
│       ├── about.html
│       └── contact.html
├── index.html                 # Main entry point
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No additional software installation required

### Installation
1. Clone or download this repository to your local machine
2. Navigate to the project directory
3. Open `index.html` in your web browser

### Alternative Method
1. Use any local server to serve the files:
   ```bash
   # If you have Python installed
   python -m http.server 8000
   
   # If you have Node.js installed
   npx serve .
   ```
2. Visit `http://localhost:8000` in your browser

## 🔐 Demo Credentials

### Administrator Access
- **Email**: admin@college.edu
- **Password**: admin123

### Faculty Access
- **Email**: faculty@college.edu
- **Password**: faculty123

### Student Access
- Students can register for new accounts
- Or use existing demo accounts (if any were created during development)

## 🎯 Key Functionalities

### Event Management
- **Browse Events**: View all upcoming events in a card layout
- **Search & Filter**: Find specific events by name, category, or date
- **Detailed Views**: Access comprehensive information for each event
- **Registration System**: Simple process to sign up for events

### User Dashboards
- **Student Dashboard**: Personalized view with profile, stats, and registrations
- **Faculty Dashboard**: Tools for event creation and student management
- **Admin Dashboard**: System-wide controls and analytics

### Responsive Design
- Works on desktops, tablets, and mobile devices
- Adaptive layouts for different screen sizes
- Touch-friendly interface for mobile users

## 📊 Data Management

All data is stored locally in the browser using LocalStorage:
- User accounts (students, faculty, admins)
- Event information
- Registration records
- System settings

**Note**: Data is persistent within the same browser but not shared across devices.

## 🤝 Contributing

This project was developed as part of an academic curriculum. While it's primarily for educational purposes, improvements and suggestions are welcome.

## 📄 License

This project is for educational purposes only. It was created as part of an academic exercise and is not intended for commercial use.

## 🙋‍♂️ Support

For issues, questions, or feedback, please:
1. Check that you're using a modern browser
2. Ensure JavaScript is enabled
3. Clear your browser cache if experiencing issues
4. Verify all files are in their correct locations

## 🏫 About

This College Event Management System streamlines the organization and participation in college events, providing an intuitive platform for students, faculty, and administrators to engage with campus activities.