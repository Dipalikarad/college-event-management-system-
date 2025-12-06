const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'compas_event_secret_key';

// Initialize SQLite database
const db = new sqlite3.Database('./compas.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      department TEXT,
      year TEXT,
      role TEXT DEFAULT 'student',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        console.log('Users table ready');
        // Insert default admin user if not exists
        db.get("SELECT * FROM users WHERE email = ?", ['admin@college.edu'], (err, row) => {
          if (!row) {
            const hashedPassword = bcrypt.hashSync('admin123', 8);
            db.run("INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)", 
              ['System Administrator', 'admin@college.edu', hashedPassword, 'admin'],
              (err) => {
                if (err) {
                  console.error('Error inserting admin user:', err.message);
                } else {
                  console.log('Default admin user created');
                }
              }
            );
          }
        });
      }
    });
    
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      venue TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating events table:', err.message);
      } else {
        console.log('Events table ready');
      }
    });
    
    db.run(`CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId TEXT NOT NULL,
      userId INTEGER NOT NULL,
      eventName TEXT,
      registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`, (err) => {
      if (err) {
        console.error('Error creating registrations table:', err.message);
      } else {
        console.log('Registrations table ready');
      }
    });
    
    db.run(`CREATE TABLE IF NOT EXISTS committees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentName TEXT NOT NULL,
      email TEXT NOT NULL,
      department TEXT,
      year TEXT,
      position TEXT NOT NULL,
      statement TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating committees table:', err.message);
      } else {
        console.log('Committees table ready');
      }
    });
    
    db.run(`CREATE TABLE IF NOT EXISTS refreshment_coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      couponId TEXT UNIQUE NOT NULL,
      recipientType TEXT NOT NULL,
      value TEXT NOT NULL,
      isRedeemed BOOLEAN DEFAULT FALSE,
      vendorName TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      redeemedAt DATETIME
    )`, (err) => {
      if (err) {
        console.error('Error creating refreshment_coupons table:', err.message);
      } else {
        console.log('Refreshment coupons table ready');
      }
    });
    
    db.run(`CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      competition TEXT NOT NULL,
      participant TEXT NOT NULL,
      judgeId INTEGER,
      criteria TEXT,
      score INTEGER,
      comments TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating scores table:', err.message);
      } else {
        console.log('Scores table ready');
      }
    });
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password, department, year } = req.body;
    
    // Check if user already exists
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      
      if (row) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
      
      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 8);
      
      // Insert new user
      db.run("INSERT INTO users (fullName, email, password, department, year) VALUES (?, ?, ?, ?, ?)", 
        [fullName, email, hashedPassword, department, year],
        function(err) {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error registering user' });
          }
          
          // Create JWT token
          const token = jwt.sign(
            { id: this.lastID, email, fullName, department, year, role: 'student' },
            JWT_SECRET,
            { expiresIn: '24h' }
          );
          
          res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
              id: this.lastID,
              fullName,
              email,
              department,
              year,
              role: 'student'
            }
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// User Login
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Check password
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }
      
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, fullName: user.fullName, department: user.department, year: user.year, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          department: user.department,
          year: user.year,
          role: user.role
        }
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all events
app.get('/api/events', (req, res) => {
  db.all("SELECT * FROM events", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    res.status(200).json({
      success: true,
      events: rows
    });
  });
});

// Register for an event
app.post('/api/register-event', authenticateToken, (req, res) => {
  try {
    const { eventId, eventName } = req.body;
    const userId = req.user.id;
    
    // Check if already registered
    db.get("SELECT * FROM registrations WHERE eventId = ? AND userId = ?", [eventId, userId], (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      
      if (row) {
        return res.status(400).json({ success: false, message: 'Already registered for this event' });
      }
      
      // Insert registration
      db.run("INSERT INTO registrations (eventId, userId, eventName) VALUES (?, ?, ?)", 
        [eventId, userId, eventName],
        function(err) {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error registering for event' });
          }
          
          res.status(201).json({
            success: true,
            message: 'Successfully registered for event',
            registrationId: this.lastID
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user's registrations
app.get('/api/my-registrations', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  db.all("SELECT * FROM registrations WHERE userId = ?", [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    res.status(200).json({
      success: true,
      registrations: rows
    });
  });
});

// Submit committee nomination
app.post('/api/committee-nominate', (req, res) => {
  try {
    const { studentName, email, department, year, position, statement } = req.body;
    
    // Insert nomination
    db.run("INSERT INTO committees (studentName, email, department, year, position, statement) VALUES (?, ?, ?, ?, ?, ?)", 
      [studentName, email, department, year, position, statement],
      function(err) {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error submitting nomination' });
        }
        
        res.status(201).json({
          success: true,
          message: 'Nomination submitted successfully',
          nominationId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Generate refreshment coupon
app.post('/api/generate-coupon', authenticateToken, (req, res) => {
  try {
    const { recipientType, value } = req.body;
    
    // Generate unique coupon ID
    const couponId = `${recipientType.toUpperCase()}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Insert coupon
    db.run("INSERT INTO refreshment_coupons (couponId, recipientType, value) VALUES (?, ?, ?)", 
      [couponId, recipientType, value],
      function(err) {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error generating coupon' });
        }
        
        res.status(201).json({
          success: true,
          message: 'Coupon generated successfully',
          couponId,
          value
        });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Redeem refreshment coupon
app.post('/api/redeem-coupon', authenticateToken, (req, res) => {
  try {
    const { couponId, vendorName } = req.body;
    
    // Check if coupon exists and is not redeemed
    db.get("SELECT * FROM refreshment_coupons WHERE couponId = ? AND isRedeemed = 0", [couponId], (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      
      if (!row) {
        return res.status(404).json({ success: false, message: 'Invalid or already redeemed coupon' });
      }
      
      // Update coupon as redeemed
      db.run("UPDATE refreshment_coupons SET isRedeemed = 1, vendorName = ?, redeemedAt = CURRENT_TIMESTAMP WHERE couponId = ?", 
        [vendorName, couponId],
        function(err) {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error redeeming coupon' });
          }
          
          res.status(200).json({
            success: true,
            message: 'Coupon redeemed successfully',
            coupon: {
              couponId: row.couponId,
              recipientType: row.recipientType,
              value: row.value,
              vendorName,
              redeemedAt: new Date().toISOString()
            }
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Submit score
app.post('/api/submit-score', authenticateToken, (req, res) => {
  try {
    const { competition, participant, criteria, score, comments } = req.body;
    const judgeId = req.user.id;
    
    // Insert score
    db.run("INSERT INTO scores (competition, participant, judgeId, criteria, score, comments) VALUES (?, ?, ?, ?, ?, ?)", 
      [competition, participant, judgeId, criteria, score, comments],
      function(err) {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error submitting score' });
        }
        
        res.status(201).json({
          success: true,
          message: 'Score submitted successfully',
          scoreId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get scores for a competition
app.get('/api/scores/:competition', authenticateToken, (req, res) => {
  const competition = req.params.competition;
  
  db.all("SELECT * FROM scores WHERE competition = ?", [competition], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    res.status(200).json({
      success: true,
      scores: rows
    });
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});