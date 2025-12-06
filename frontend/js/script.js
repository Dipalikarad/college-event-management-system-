// ============================================
// COLLEGE EVENT MANAGEMENT SYSTEM
// Complete localStorage-based system
// ============================================

// ============================================
// CONSTANTS
// ============================================
const ADMIN_CREDENTIALS = {
    email: 'admin@college.edu',
    password: 'admin123'
};

const SUPABASE_URL = typeof window !== 'undefined' ? (window.SUPABASE_URL || '') : '';
const SUPABASE_ANON_KEY = typeof window !== 'undefined' ? (window.SUPABASE_ANON_KEY || '') : '';
let __sb = null;
function sb() {
    if (typeof window === 'undefined' || typeof window.supabase === 'undefined') return null;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    if (!__sb) __sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return __sb;
}

// ============================================
// EVENTS DATA
// ============================================
const eventsData = [
    {
        id: 'event-yuvabeat',
        title: 'YUVABEAT – Annual Cultural Fest',
        category: 'College Events',
        image: '/assets/images/events/yuvabeat.jpg',
        date: '2025-02-10 to 2025-02-15',
        buttonText: 'View Details',
        overview: {
            description: "YUVABEAT is the flagship cultural celebration featuring six themed days packed with performances, fashion showcases, and collaborative student-led activities.",
            venue: "Central Quadrangle & Auditorium",
            time: "Daily 09:00 AM – 08:00 PM",
            coordinators: [
                "Name 1 (Department)",
                "Name 2 (Department)"
            ],
            registrationLink: "https://example.com/register-yuvabeat"
        },
        themeDays: [
            {
                name: "Saree Day",
                description: "Celebrating traditional elegance with vibrant sarees highlighting India's diverse heritage.",
                schedule: [
                    "09:30 AM – Inaugural Ethnic Walk",
                    "12:00 PM – Cultural Quiz",
                    "04:00 PM – Folk Dance Showcase"
                ],
                dressCode: "Participants must wear sarees; accessories should be minimal and safety-pinned.",
                venue: "Central Quadrangle",
                time: "09:00 AM – 06:00 PM",
                rules: [
                    "No hazardous props.",
                    "Maintain decorum during the walk."
                ],
                notice: {
                    title: "NOTICE – YUVABEAT THEME DAY",
                    content: "All students are informed that Saree Day under YUVABEAT will be celebrated on campus. Participants must adhere to the dress code and follow the published schedule. Attendance is compulsory for registered teams.",
                    signature: "Director\nDr. Anand Pathrikar"
                }
            },
            {
                name: "Bollywood Day",
                description: "A throwback to classic and contemporary Bollywood culture through costume, dance, and trivia.",
                schedule: [
                    "10:00 AM – Bollywood Parade",
                    "01:00 PM – Filmy Antakshari",
                    "05:00 PM – Celebrity Look-alike Contest"
                ],
                dressCode: "Bollywood-inspired outfits reflecting iconic characters.",
                venue: "Open Air Stage",
                time: "10:00 AM – 07:00 PM",
                rules: [
                    "Costumes must remain campus-appropriate.",
                    "Music cues limited to 2 minutes per act."
                ],
                notice: {
                    title: "NOTICE – YUVABEAT THEME DAY",
                    content: "Bollywood Day will be conducted under YUVABEAT with thematic activities throughout the day. Students must report at least 30 minutes before their segment.",
                    signature: "Director\nDr. Anand Pathrikar"
                }
            },
            {
                name: "Mismatch Day",
                description: "A playful celebration encouraging creative mismatched attire to showcase individuality.",
                schedule: [
                    "09:00 AM – Registration Check",
                    "11:00 AM – Fun Walk-off",
                    "03:00 PM – Improv Games"
                ],
                dressCode: "Wear deliberately mismatched outfits; ensure footwear is safe for movement.",
                venue: "Student Activity Center",
                time: "09:00 AM – 05:00 PM",
                rules: [
                    "No offensive graphics.",
                    "All accessories must be non-sharp."
                ],
                notice: {
                    title: "NOTICE – YUVABEAT THEME DAY",
                    content: "Mismatch Day encourages creative attire within campus guidelines. Participants must carry their ID cards and follow the day's safety instructions.",
                    signature: "Director\nDr. Anand Pathrikar"
                }
            },
            {
                name: "Twins Day",
                description: "Teams of two showcase coordinated looks and performances celebrating camaraderie.",
                schedule: [
                    "10:00 AM – Twin Parade",
                    "02:00 PM – Synchronised Talent Acts",
                    "04:30 PM – Awards Ceremony"
                ],
                dressCode: "Pairs should wear coordinated outfits reflecting a shared theme.",
                venue: "Main Auditorium",
                time: "10:00 AM – 06:00 PM",
                rules: [
                    "Only registered pairs allowed on stage.",
                    "Time limit of 3 minutes per act."
                ],
                notice: {
                    title: "NOTICE – YUVABEAT THEME DAY",
                    content: "Twins Day performances will take place in the auditorium. All participating pairs must report backstage 30 minutes before their slot.",
                    signature: "Director\nDr. Anand Pathrikar"
                }
            },
            {
                name: "Groups Day",
                description: "Clubs and friend circles present coordinated routines highlighting unity in diversity.",
                schedule: [
                    "09:30 AM – Group Check-in",
                    "12:00 PM – Mass Flash Mob",
                    "05:00 PM – Judges' Feedback Session"
                ],
                dressCode: "Groups should wear cohesive outfits with identifiable accents (scarves, badges, etc.).",
                venue: "Sports Ground",
                time: "09:00 AM – 07:00 PM",
                rules: [
                    "Groups limited to 12 members per performance.",
                    "Audio tracks must be submitted in advance."
                ],
                notice: {
                    title: "NOTICE – YUVABEAT THEME DAY",
                    content: "Groups Day will host coordinated presentations. Team leaders must collect entry passes and ensure discipline throughout the event.",
                    signature: "Director\nDr. Anand Pathrikar"
                }
            },
            {
                name: "Traditional Day",
                description: "A grand finale celebrating India's rich cultural heritage through attire, music, and cuisine.",
                schedule: [
                    "11:00 AM – Traditional Ramp Walk",
                    "02:00 PM – Classical Performances",
                    "07:00 PM – Closing Ceremony"
                ],
                dressCode: "Traditional attire representing any Indian region; maintain grace and cultural respect.",
                venue: "Central Quadrangle & Amphitheatre",
                time: "11:00 AM – 09:00 PM",
                rules: [
                    "No fire or hazardous props.",
                    "Respectful conduct is mandatory."
                ],
                notice: {
                    title: "NOTICE – YUVABEAT THEME DAY",
                    content: "Traditional Day concludes YUVABEAT with cultural showcases. Attendance is expected from all participants for the closing ceremony.",
                    signature: "Director\nDr. Anand Pathrikar"
                }
            }
        ],
        notice: {
            title: "NOTICE – YUVABEAT THEME DAY",
            content: "The YUVABEAT Annual Cultural Fest will run with six themed days. Students must follow individual day guidelines, maintain discipline, and ensure timely participation.",
            signature: "Director\nDr. Anand Pathrikar"
        }
    },
    {
        id: "event-compsa",
        title: "COMPSA – Computer Science Students' Association Event",
        category: "College Events",
        image: "/assets/images/events/compsa.jpg",
        date: "2025-01-20 to 2025-01-21",
        buttonText: "View Details",
        overview: {
            description: "COMPSA features technical competitions, hands-on workshops, and seminars led by industry experts to enhance practical computing skills.",
            venue: "Innovation Lab & Seminar Hall",
            time: "09:30 AM – 06:30 PM (Day 1), 10:00 AM – 05:00 PM (Day 2)",
            coordinators: [
                "Faculty Coordinator (TBD)",
                "Student Lead (TBD)"
            ],
            registrationLink: "https://example.com/register-compsa"
        },
        // Online Notice & Registration
        notice: {
            title: "NOTICE – COMPSA EVENT",
            content: "All Computer Science students are notified that COMPSA will host competitions, workshops, and seminars on the scheduled date. Registrations must be completed by the announced deadlines.",
            signature: "Director\nDr. Anand Pathrikar"
        },
        // Online Committee Formation
        committeeFormation: {
            positions: ["President", "Vice-President", "Treasurer", "Secretary", "Technical Head", "Cultural Head"],
            nominationPeriod: "2024-12-01 to 2024-12-15",
            votingPeriod: "2024-12-16 to 2024-12-20",
            resultAnnouncement: "2024-12-22"
        },
        // Faculty Duty Allocation
        facultyDuties: [
            "Anchoring",
            "Refreshment",
            "Decoration",
            "Management",
            "Technical Support",
            "Judging Panel"
        ],
        // Technical Competitions
        technicalCompetitions: [
            {
                name: "Debugging Sprint",
                format: "Individual",
                duration: "2 hours",
                description: "Fast-paced debugging challenge where participants fix bugs in provided codebases",
                rules: [
                    "Individual participation only",
                    "Programming languages: C, C++, Java, Python",
                    "Internet access restricted to documentation",
                    "Top 3 winners receive prizes and certificates"
                ]
            },
            {
                name: "Algorithm Design Challenge",
                format: "Team (2 members)",
                duration: "3 hours",
                description: "Design and implement algorithms to solve complex computational problems",
                rules: [
                    "Teams of 2 members",
                    "Use of any programming language allowed",
                    "Problem statements released at the start of competition",
                    "Evaluation based on correctness and efficiency"
                ]
            },
            {
                name: "UI/UX Prototype Clash",
                format: "Team (3 members)",
                duration: "4 hours",
                description: "Create interactive prototypes for real-world applications",
                rules: [
                    "Teams of 3 members",
                    "Tools allowed: Figma, Adobe XD, or any prototyping tool",
                    "Must include user flow, wireframes, and interactive prototype",
                    "Presentations to jury panel"
                ]
            }
        ],
        // Workshops
        workshops: [
            {
                name: "Building Scalable REST APIs",
                topic: "REST API Design and Implementation",
                duration: "3 hours",
                description: "Learn to design and build scalable REST APIs using modern frameworks",
                instructor: "Industry Expert",
                prerequisites: "Basic knowledge of web development"
            },
            {
                name: "Intro to Cloud DevOps Pipelines",
                topic: "CI/CD Pipeline Implementation",
                duration: "4 hours",
                description: "Hands-on workshop on implementing CI/CD pipelines using popular tools",
                instructor: "DevOps Specialist",
                prerequisites: "Basic understanding of software development"
            }
        ],
        // Seminars
        seminars: [
            {
                name: "AI Ethics and Governance",
                speaker: "Dr. Priya Sharma, AI Ethics Researcher",
                duration: "2 hours",
                description: "Exploring ethical considerations and governance frameworks in AI development"
            },
            {
                name: "Future of Quantum Computing",
                speaker: "Prof. Rajesh Kumar, Quantum Computing Expert",
                duration: "2 hours",
                description: "Understanding the potential and challenges of quantum computing technologies"
            }
        ],
        // Two-Day Event Schedule
        schedule: {
            day1: {
                date: "2025-01-20",
                activities: [
                    {
                        time: "09:30 AM - 10:00 AM",
                        activity: "Inauguration Ceremony",
                        venue: "Main Auditorium"
                    },
                    {
                        time: "10:00 AM - 01:00 PM",
                        activity: "Technical Competitions (Round 1)",
                        venue: "Computer Labs"
                    },
                    {
                        time: "01:00 PM - 02:00 PM",
                        activity: "Lunch Break",
                        venue: "Cafeteria"
                    },
                    {
                        time: "02:00 PM - 05:00 PM",
                        activity: "Technical Competitions (Round 2)",
                        venue: "Computer Labs"
                    },
                    {
                        time: "05:00 PM - 06:30 PM",
                        activity: "Workshops Session 1",
                        venue: "Seminar Hall"
                    }
                ]
            },
            day2: {
                date: "2025-01-21",
                activities: [
                    {
                        time: "10:00 AM - 12:00 PM",
                        activity: "Prize Distribution & Certificate Ceremony",
                        venue: "Main Auditorium"
                    },
                    {
                        time: "12:00 PM - 01:00 PM",
                        activity: "Lunch Break",
                        venue: "Cafeteria"
                    },
                    {
                        time: "01:00 PM - 03:00 PM",
                        activity: "Seminars Session",
                        venue: "Seminar Hall"
                    },
                    {
                        time: "03:00 PM - 05:00 PM",
                        activity: "Feedback Collection & Valedictory",
                        venue: "Main Auditorium"
                    }
                ]
            }
        },
        // Refreshment Management
        refreshment: {
            qrBasedSystem: true,
            studentCouponValue: "₹50",
            facultyCouponValue: "₹100",
            vendors: ["Cafeteria", "Snacks Counter"]
        },
        // Reports & Statistics
        reports: {
            participationReports: true,
            winnerLists: true,
            budgetSummary: true,
            feedbackCollection: true
        },
        registrationInfo: "Team and individual entries accepted. Early bird deadline: 2025-01-10. On-spot entries close at 09:00 AM on event day."
    },
    {
        id: "event-naac",
        title: "NAAC Accreditation Activities",
        category: "College Events",
        image: "/assets/images/events/naac.jpg",
        date: "2025-01-05 to 2025-01-12",
        buttonText: "View Details",
        overview: {
            description: "NAAC activities include student feedback sessions, faculty development workshops, and institutional quality assessment meetings to enhance academic excellence.",
            venue: "Conference Rooms & Department Halls",
            time: "10:00 AM – 05:00 PM (Daily)",
            coordinators: [
                "Dr. Sunita Rao (IQAC Head)",
                "Prof. Anil Kumar (Coordinator)"
            ],
            registrationLink: "https://example.com/register-naac"
        },
        activities: [
            {
                name: "Student Feedback Sessions",
                description: "Interactive sessions for students to provide feedback on teaching quality, infrastructure, and campus facilities.",
                schedule: "January 5-7, 2025 | 10:00 AM – 1:00 PM",
                venue: "Department Halls"
            },
            {
                name: "Faculty Development Workshop",
                description: "Capacity-building sessions focusing on modern pedagogical techniques, research methodologies, and outcome-based education.",
                schedule: "January 8-10, 2025 | 10:00 AM – 4:00 PM",
                venue: "Seminar Hall"
            },
            {
                name: "Institutional Quality Assessment",
                description: "Meetings with department heads and administrative staff to review academic processes and quality benchmarks.",
                schedule: "January 11-12, 2025 | 11:00 AM – 5:00 PM",
                venue: "Conference Room"
            }
        ],
        guidelines: [
            "All students are encouraged to participate in feedback sessions.",
            "Faculty members must attend assigned development workshops.",
            "Department representatives should prepare quality reports in advance.",
            "Feedback forms will be distributed digitally prior to sessions."
        ],
        notice: {
            title: "NOTICE – NAAC ACTIVITIES",
            content: "The institution will conduct NAAC-related activities from January 5-12, 2025. Active participation from students and faculty is essential for accreditation success.",
            signature: "Director\nDr. Anand Pathrikar"
        }
    },
    {
        id: "event-techfest",
        title: "TECHFEST – Technical Festival",
        category: "College Events",
        image: "/assets/images/events/techfest.jpg",
        date: "2025-03-04 to 2025-03-06",
        buttonText: "View Details",
        overview: {
            description: "TECHFEST unites innovators through coding battles, hackathons, robotics showcases, and a multidisciplinary project expo.",
            venue: "Technology Block & Makerspace",
            time: "09:00 AM – 09:00 PM",
            coordinators: [
                "Dr. Amit Verma (CSE Dept.)",
                "Prof. Sneha Patel (IT Dept.)",
                "Mr. Vikram Singh (ECE Dept.)"
            ],
            registrationLink: "https://example.com/register-techfest"
        },
        codingCompetitions: [
            {
                name: "Code Sprint",
                format: "Individual",
                duration: "3 hours",
                description: "Fast-paced competitive programming challenge with algorithmic problems",
                rules: [
                    "Individual participation only",
                    "Any programming language allowed",
                    "Internet access restricted to documentation",
                    "Top 3 winners receive prizes and certificates"
                ]
            },
            {
                name: "Debug Wars",
                format: "Team (2 members)",
                duration: "2 hours",
                description: "Find and fix bugs in provided codebases across multiple languages",
                rules: [
                    "Teams of 2 members",
                    "Multiple programming languages",
                    "Points based on bugs fixed and time taken"
                ]
            }
        ],
        hackathon: {
            title: "24-Hour Hackathon",
            theme: "Sustainable Technology Solutions",
            duration: "24 hours",
            deliverables: [
                "Working prototype or MVP",
                "Presentation deck (10 slides max)",
                "Source code repository",
                "Demo video (3 minutes)"
            ],
            rules: [
                "Teams of 2-4 members",
                "All code must be written during hackathon",
                "Use of APIs and libraries allowed",
                "Projects judged on innovation, implementation, and impact"
            ]
        },
        roboticsEvents: [
            {
                name: "Line Follower Bot",
                description: "Build autonomous robots that follow a designated path",
                rules: [
                    "Maximum bot dimensions: 30x30x30 cm",
                    "Battery operated only",
                    "Fastest completion time wins"
                ]
            },
            {
                name: "Robo Soccer",
                description: "Robot football competition with wireless controlled bots",
                rules: [
                    "Teams of 3 bots each",
                    "Match duration: 10 minutes",
                    "Manual control via remote"
                ]
            }
        ],
        workshops: [
            {
                name: "AI & Machine Learning",
                topic: "Introduction to Deep Learning",
                duration: "3 hours",
                description: "Hands-on workshop on neural networks and TensorFlow"
            },
            {
                name: "Web Development",
                topic: "Full Stack Development with MERN",
                duration: "4 hours",
                description: "Build a complete web application using MongoDB, Express, React, and Node.js"
            },
            {
                name: "IoT Workshop",
                topic: "Smart Home Automation",
                duration: "4 hours",
                description: "Create IoT solutions using Arduino and Raspberry Pi platforms"
            }
        ],
        registrationInfo: {
            mode: "Online via Google Forms",
            deadlines: {
                earlyBird: "2025-02-15",
                regular: "2025-02-28"
            },
            instructions: [
                "All participants must register through official Google Form",
                "College ID card is mandatory for entry",
                "Participants can register for multiple events",
                "Outside college participants require special permission"
            ]
        },
        notice: {
            title: "NOTICE – TECHFEST 2025",
            content: "TECHFEST 2025 will be held from March 4-6, 2025. Registration closes February 28, 2025. Participants must follow all event guidelines and maintain decorum throughout the festival.",
            signature: "Director\nDr. Anand Pathrikar"
        }
    }
];

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Check if user is logged in
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    if (token && currentUser) {
        return JSON.parse(currentUser);
    }
    return null;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    window.location.href = '/index.html';
}

// ============================================
// EVENT MANAGEMENT FUNCTIONS
// ============================================

// Load events from localStorage or use default data
function loadEvents() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        return JSON.parse(storedEvents);
    }
    // Initialize with default events if none exist
    localStorage.setItem('events', JSON.stringify(eventsData));
    return eventsData;
}

// Save events to localStorage
function saveEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

// Get event by ID
function getEventById(eventId) {
    const events = loadEvents();
    return events.find(event => event.id === eventId);
}

// ============================================
// STUDENT REGISTRATION FUNCTIONS
// ============================================

// Register for an event
async function registerForEvent(eventId, studentEmail) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found');
            return false;
        }
        
        const response = await fetch('http://localhost:3000/api/register-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                eventId: eventId,
                eventName: getEventById(eventId)?.title || eventId
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            return true;
        } else {
            console.error('Registration failed:', result.message);
            return false;
        }
    } catch (error) {
        console.error('Error registering for event:', error);
        return false;
    }
}

// Get registrations for a student
async function getStudentRegistrations(studentEmail) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found');
            return [];
        }
        
        const response = await fetch('http://localhost:3000/api/my-registrations', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            return result.registrations || [];
        } else {
            console.error('Failed to fetch registrations:', result.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching registrations:', error);
        return [];
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', async function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    const eventForm = document.getElementById('eventRegistrationForm');
    if (eventForm) {
        eventForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearErrors();
            const name = document.getElementById('studentName').value.trim();
            const email = document.getElementById('studentEmail').value.trim();
            const department = document.getElementById('studentDepartment').value;
            const year = document.getElementById('studentYear').value;
            const eventKey = document.getElementById('eventSelection').value;
            let isValid = true;
            if (!name) isValid = false;
            if (!validateEmail(email)) isValid = false;
            if (!department) isValid = false;
            if (!year) isValid = false;
            if (!eventKey) isValid = false;
            if (!document.getElementById('agreeTerms').checked) isValid = false;
            if (!isValid) {
                showAlert('Please fill all required fields', 'error');
                return;
            }
            const eventId = 'event-' + eventKey;
            const ok = await registerForEvent(eventId, email);
            if (ok) {
                showAlert('Registration successful', 'success');
                eventForm.reset();
            } else {
                showAlert('Already registered or error occurred', 'error');
            }
        });
    }
    const nominationForm = document.getElementById('nominationForm');
    if (nominationForm) {
        nominationForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const email = document.getElementById('nomineeEmail').value.trim();
            const position = document.getElementById('positionSelect').value;
            const manifesto = document.getElementById('manifesto').value.trim();
            if (!validateEmail(email) || !position) { showAlert('Fill required fields', 'error'); return; }
            const ok = await nominateCommittee(position, email, manifesto);
            if (ok) { showAlert('Nomination submitted', 'success'); nominationForm.reset(); }
            else { showAlert('Error submitting nomination', 'error'); }
        });
        const votePosition = document.getElementById('votePosition');
        const nomineeList = document.getElementById('nomineeList');
        votePosition.addEventListener('change', async function(){
            nomineeList.innerHTML = '';
            const list = await getNominees(votePosition.value);
            nomineeList.innerHTML = list.map(n => `<option value="${n.id}">${n.email} - ${n.position}</option>`).join('');
        });
        const voteForm = document.getElementById('voteForm');
        voteForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const voter = document.getElementById('voterEmail').value.trim();
            const pos = document.getElementById('votePosition').value;
            const nomineeId = document.getElementById('nomineeList').value;
            if (!validateEmail(voter) || !pos || !nomineeId) { showAlert('Fill required fields', 'error'); return; }
            const ok = await castVote(pos, nomineeId, voter);
            if (ok) { showAlert('Vote recorded', 'success'); }
            else { showAlert('Error recording vote', 'error'); }
            const results = await getCommitteeResults();
            renderCommitteeResults(results);
        });
    }

    const dutyForm = document.getElementById('dutyForm');
    if (dutyForm) {
        dutyForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const email = document.getElementById('facultyEmail').value.trim();
            const role = document.getElementById('dutyRole').value;
            const eventId = document.getElementById('dutyEvent').value;
            if (!validateEmail(email) || !role || !eventId) { showAlert('Fill required fields', 'error'); return; }
            const ok = await assignFacultyDuty(email, role, eventId);
            if (ok) { showAlert('Duty assigned', 'success'); dutyForm.reset(); }
            else { showAlert('Error assigning duty', 'error'); }
            renderDutiesList(await getFacultyDuties());
        });
        renderDutiesList(await getFacultyDuties());
    }

    const attendanceForm = document.getElementById('attendanceForm');
    if (attendanceForm) {
        attendanceForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const eventId = document.getElementById('attendanceEvent').value;
            const session = document.getElementById('attendanceSession').value.trim();
            const email = document.getElementById('attendanceEmail').value.trim();
            const role = document.getElementById('attendanceRole').value;
            if (!eventId || !session || !validateEmail(email) || !role) { showAlert('Fill required fields', 'error'); return; }
            const ok = await markAttendance(eventId, session, email, role);
            if (ok) { showAlert('Attendance marked', 'success'); attendanceForm.reset(); }
            else { showAlert('Error marking attendance', 'error'); }
            renderAttendanceList(await getAttendance(eventId));
        });
        const eventId = document.getElementById('attendanceEvent').value;
        renderAttendanceList(await getAttendance(eventId));
    }

    const scoreForm = document.getElementById('scoreForm');
    if (scoreForm) {
        scoreForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const eventId = document.getElementById('scoreEvent').value;
            const competition = document.getElementById('competition').value.trim();
            const participantEmail = document.getElementById('participantEmail').value.trim();
            const judgeEmail = document.getElementById('judgeEmail').value.trim();
            const scoreValue = Number(document.getElementById('scoreValue').value);
            const notes = document.getElementById('scoreNotes').value.trim();
            if (!eventId || !competition || !validateEmail(participantEmail) || !validateEmail(judgeEmail) || isNaN(scoreValue)) { showAlert('Fill required fields', 'error'); return; }
            const ok = await submitScore(eventId, competition, participantEmail, judgeEmail, scoreValue, notes);
            if (ok) { showAlert('Score submitted', 'success'); scoreForm.reset(); }
            else { showAlert('Error submitting score', 'error'); }
            renderScoresList(await getScores(eventId, competition));
        });
    }

    const certForm = document.getElementById('certForm');
    if (certForm) {
        certForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const eventId = document.getElementById('certEvent').value;
            const email = document.getElementById('recipientEmail').value.trim();
            const name = document.getElementById('recipientName').value.trim();
            const award = document.getElementById('award').value.trim();
            if (!eventId || !validateEmail(email) || !name || !award) { showAlert('Fill required fields', 'error'); return; }
            const ok = await generateCertificate(eventId, email, name, award);
            if (ok) { showAlert('Certificate generated', 'success'); certForm.reset(); }
            else { showAlert('Error generating certificate', 'error'); }
            renderCertificatesList(await getCertificates(eventId));
        });
    }

    const couponForm = document.getElementById('couponForm');
    if (couponForm) {
        couponForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const eventId = document.getElementById('couponEvent').value;
            const role = document.getElementById('couponRole').value;
            const email = document.getElementById('couponEmail').value.trim();
            if (!eventId || !role || !validateEmail(email)) { showAlert('Fill required fields', 'error'); return; }
            const code = await generateCoupon(eventId, email, role);
            if (code) { showAlert('Coupon generated: ' + code, 'success'); couponForm.reset(); }
            else { showAlert('Error generating coupon', 'error'); }
            renderCouponsList(await getCoupons(eventId));
        });
        const redeemForm = document.getElementById('redeemForm');
        redeemForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const code = document.getElementById('qrCodeInput').value.trim();
            const ok = await redeemCoupon(code);
            if (ok) { showAlert('Coupon redeemed', 'success'); redeemForm.reset(); }
            else { showAlert('Invalid or already redeemed', 'error'); }
            const eventId = document.getElementById('couponEvent').value;
            renderCouponsList(await getCoupons(eventId));
        });
    }
});

// ============================================
// FORM VALIDATION UTILITIES
// ============================================

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Clear all error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(elem => {
        elem.textContent = '';
    });
}

// Show error message for a specific field
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Show alert message
function showAlert(message, type = 'success') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.custom-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// ============================================
// PASSWORD STRENGTH CHECKER
// ============================================
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthText = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColor = ['#ef4444', '#f59e0b', '#10b981', '#059669'];
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    strength = Math.min(3, Math.floor(strength / 1.5));
    
    return {
        level: strength,
        text: strengthText[strength],
        color: strengthColor[strength]
    };
}

// ============================================
// EVENT DISPLAY FUNCTIONS
// ============================================

// Display events on events page
function displayEvents(filter = 'all') {
    const events = loadEvents();
    const container = document.getElementById('eventsContainer');
    
    if (!container) return;
    
    // Filter events if needed
    let filteredEvents = events;
    if (filter !== 'all') {
        // Add filtering logic here if needed
    }
    
    if (filteredEvents.length === 0) {
        container.innerHTML = '<p class="no-data">No events available at the moment.</p>';
        return;
    }
    
    container.innerHTML = filteredEvents.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}" class="event-image" onerror="this.src='/assets/images/placeholder.jpg'">
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span>📅 ${event.date}</span>
                </div>
                <p class="event-description">${event.overview.description.substring(0, 100)}...</p>
                <a href="event-details.html?id=${event.id}" class="btn-view-details">View Details</a>
            </div>
        </div>
    `).join('');
}

async function nominateCommittee(position, email, manifesto){
    const client = sb();
    if (client) {
        const { error } = await client.from('committee_nominations').insert([{ position, student_email: email, manifesto }]);
        if (error) return false; return true;
    }
    const list = JSON.parse(localStorage.getItem('committee_nominations')) || [];
    list.push({ id: 'NOM'+Date.now(), position, email, manifesto, created_at: new Date().toISOString() });
    localStorage.setItem('committee_nominations', JSON.stringify(list));
    return true;
}

async function getNominees(position){
    const client = sb();
    if (client) {
        const { data, error } = await client.from('committee_nominations').select('*').eq('position', position);
        if (error) return [];
        return (data||[]).map(r=>({ id: r.id, position: r.position, email: r.student_email }));
    }
    const list = JSON.parse(localStorage.getItem('committee_nominations')) || [];
    return list.filter(n=>n.position===position);
}

async function castVote(position, nomineeId, voterEmail){
    const client = sb();
    if (client) {
        const { error } = await client.from('committee_votes').insert([{ position, nominee_id: nomineeId, voter_email: voterEmail }]);
        if (error) return false; return true;
    }
    const votes = JSON.parse(localStorage.getItem('committee_votes')) || [];
    votes.push({ id: 'VOTE'+Date.now(), position, nominee_id: nomineeId, voter_email: voterEmail, created_at: new Date().toISOString() });
    localStorage.setItem('committee_votes', JSON.stringify(votes));
    return true;
}

async function getCommitteeResults(){
    const client = sb();
    let nominees = [];
    let votes = [];
    if (client) {
        const nom = await client.from('committee_nominations').select('*');
        const vot = await client.from('committee_votes').select('*');
        if (nom.error || vot.error) return [];
        nominees = nom.data||[]; votes = vot.data||[];
        const positions = ['President','Vice-President','Treasurer','Member'];
        return positions.map(pos=>{
            const posNom = nominees.filter(n=>n.position===pos);
            const tally = posNom.map(n=>({ id: n.id, email: n.student_email, count: votes.filter(v=>v.nominee_id===n.id).length }));
            const winner = tally.sort((a,b)=>b.count-a.count)[0]||null;
            return { position: pos, winner };
        });
    }
    nominees = JSON.parse(localStorage.getItem('committee_nominations')) || [];
    votes = JSON.parse(localStorage.getItem('committee_votes')) || [];
    const positions = ['President','Vice-President','Treasurer','Member'];
    return positions.map(pos=>{
        const posNom = nominees.filter(n=>n.position===pos);
        const tally = posNom.map(n=>({ id: n.id, email: n.email, count: votes.filter(v=>v.nominee_id===n.id).length }));
        const winner = tally.sort((a,b)=>b.count-a.count)[0]||null;
        return { position: pos, winner };
    });
}

function renderCommitteeResults(results){
    const box = document.getElementById('committeeResults');
    if (!box) return;
    if (!results || results.length===0) { box.innerHTML = '<p class="no-data">No data</p>'; return; }
    box.innerHTML = results.map(r=>`<div class="registration-item"><div class="reg-icon">👤</div><div class="reg-details"><h4>${r.position}</h4><p>${r.winner ? (r.winner.email+ ' ('+r.winner.count+' votes)') : 'No winner'}</p></div></div>`).join('');
}

async function assignFacultyDuty(facultyEmail, role, eventId){
    const client = sb();
    if (client) {
        const { error } = await client.from('faculty_duties').insert([{ faculty_email: facultyEmail, role, event_id: eventId }]);
        if (error) return false; return true;
    }
    const list = JSON.parse(localStorage.getItem('faculty_duties')) || [];
    list.push({ id: 'DUTY'+Date.now(), faculty_email: facultyEmail, role, event_id: eventId, assigned_at: new Date().toISOString(), notified: false });
    localStorage.setItem('faculty_duties', JSON.stringify(list));
    return true;
}

async function getFacultyDuties(){
    const client = sb();
    if (client) {
        const { data, error } = await client.from('faculty_duties').select('*').order('assigned_at', { ascending: false });
        if (error) return [];
        return data||[];
    }
    return JSON.parse(localStorage.getItem('faculty_duties')) || [];
}

function renderDutiesList(list){
    const box = document.getElementById('dutiesList');
    if (!box) return;
    if (!list || list.length===0) { box.innerHTML = '<p class="no-data">No duties assigned</p>'; return; }
    box.innerHTML = list.map(d=>`<div class="registration-item"><div class="reg-icon">🧑‍🏫</div><div class="reg-details"><h4>${d.role}</h4><p>${d.faculty_email} - ${d.event_id}</p></div></div>`).join('');
}

async function markAttendance(eventId, session, email, role){
    const client = sb();
    if (client) {
        const { error } = await client.from('attendance').insert([{ event_id: eventId, session, person_email: email, role }]);
        if (error) return false; return true;
    }
    const list = JSON.parse(localStorage.getItem('attendance')) || [];
    list.push({ id: 'ATT'+Date.now(), event_id: eventId, session, person_email: email, role, timestamp: new Date().toISOString() });
    localStorage.setItem('attendance', JSON.stringify(list));
    return true;
}

async function getAttendance(eventId){
    const client = sb();
    if (client) {
        const { data, error } = await client.from('attendance').select('*').eq('event_id', eventId).order('timestamp', { ascending: false });
        if (error) return [];
        return data||[];
    }
    const list = JSON.parse(localStorage.getItem('attendance')) || [];
    return list.filter(r=>r.event_id===eventId);
}

function renderAttendanceList(list){
    const box = document.getElementById('attendanceList');
    if (!box) return;
    if (!list || list.length===0) { box.innerHTML = '<p class="no-data">No attendance</p>'; return; }
    box.innerHTML = list.map(a=>`<div class="registration-item"><div class="reg-icon">🗓️</div><div class="reg-details"><h4>${a.session}</h4><p>${a.person_email} - ${a.role}</p></div></div>`).join('');
}

async function submitScore(eventId, competition, participantEmail, judgeEmail, score, notes){
    const client = sb();
    if (client) {
        const { error } = await client.from('scores').insert([{ event_id: eventId, competition, participant_email: participantEmail, judge_email: judgeEmail, score, notes }]);
        if (error) return false; return true;
    }
    const list = JSON.parse(localStorage.getItem('scores')) || [];
    list.push({ id: 'SCORE'+Date.now(), event_id: eventId, competition, participant_email: participantEmail, judge_email: judgeEmail, score, notes, timestamp: new Date().toISOString() });
    localStorage.setItem('scores', JSON.stringify(list));
    return true;
}

async function getScores(eventId, competition){
    const client = sb();
    if (client) {
        const { data, error } = await client.from('scores').select('*').eq('event_id', eventId).eq('competition', competition).order('timestamp', { ascending: false });
        if (error) return [];
        return data||[];
    }
    const list = JSON.parse(localStorage.getItem('scores')) || [];
    return list.filter(r=>r.event_id===eventId && r.competition===competition);
}

function renderScoresList(list){
    const box = document.getElementById('scoresList');
    if (!box) return;
    if (!list || list.length===0) { box.innerHTML = '<p class="no-data">No scores</p>'; return; }
    box.innerHTML = list.map(s=>`<div class="registration-item"><div class="reg-icon">🏆</div><div class="reg-details"><h4>${s.competition}</h4><p>${s.participant_email} - ${s.score}</p></div></div>`).join('');
}

async function generateCertificate(eventId, email, name, award){
    const client = sb();
    if (client) {
        const { error } = await client.from('certificates').insert([{ event_id: eventId, recipient_email: email, recipient_name: name, award }]);
        if (error) return false; return true;
    }
    const list = JSON.parse(localStorage.getItem('certificates')) || [];
    list.push({ id: 'CERT'+Date.now(), event_id: eventId, recipient_email: email, recipient_name: name, award, generated_at: new Date().toISOString(), url: '' });
    localStorage.setItem('certificates', JSON.stringify(list));
    return true;
}

async function getCertificates(eventId){
    const client = sb();
    if (client) {
        const { data, error } = await client.from('certificates').select('*').eq('event_id', eventId).order('generated_at', { ascending: false });
        if (error) return [];
        return data||[];
    }
    const list = JSON.parse(localStorage.getItem('certificates')) || [];
    return list.filter(r=>r.event_id===eventId);
}

function renderCertificatesList(list){
    const box = document.getElementById('certList');
    if (!box) return;
    if (!list || list.length===0) { box.innerHTML = '<p class="no-data">No certificates</p>'; return; }
    box.innerHTML = list.map(c=>`<div class="registration-item"><div class="reg-icon">📄</div><div class="reg-details"><h4>${c.award}</h4><p>${c.recipient_name} (${c.recipient_email})</p></div></div>`).join('');
}

function randomCode(){ return 'QR'+Math.floor(Math.random()*1e6).toString().padStart(6,'0'); }

async function generateCoupon(eventId, email, role){
    const code = randomCode();
    const client = sb();
    if (client) {
        const { error } = await client.from('refreshment_coupons').insert([{ qr_code: code, person_email: email, role, event_id: eventId }]);
        if (error) return null; return code;
    }
    const list = JSON.parse(localStorage.getItem('refreshment_coupons')) || [];
    list.push({ id: 'COUP'+Date.now(), qr_code: code, person_email: email, role, event_id: eventId, issued_at: new Date().toISOString(), redeemed: false });
    localStorage.setItem('refreshment_coupons', JSON.stringify(list));
    return code;
}

async function redeemCoupon(code){
    const client = sb();
    if (client) {
        const { data, error } = await client.from('refreshment_coupons').select('*').eq('qr_code', code).limit(1);
        if (error || !data || !data.length) return false;
        if (data[0].redeemed) return false;
        const { error: updErr } = await client.from('refreshment_coupons').update({ redeemed: true, redeemed_at: new Date().toISOString() }).eq('qr_code', code);
        return !updErr;
    }
    const list = JSON.parse(localStorage.getItem('refreshment_coupons')) || [];
    const idx = list.findIndex(c=>c.qr_code===code);
    if (idx===-1) return false;
    if (list[idx].redeemed) return false;
    list[idx].redeemed = true; list[idx].redeemed_at = new Date().toISOString();
    localStorage.setItem('refreshment_coupons', JSON.stringify(list));
    return true;
}

async function getCoupons(eventId){
    const client = sb();
    if (client) {
        const { data, error } = await client.from('refreshment_coupons').select('*').eq('event_id', eventId).order('issued_at', { ascending: false });
        if (error) return [];
        return data||[];
    }
    const list = JSON.parse(localStorage.getItem('refreshment_coupons')) || [];
    return list.filter(r=>r.event_id===eventId);
}

function renderCouponsList(list){
    const box = document.getElementById('couponList');
    if (!box) return;
    if (!list || list.length===0) { box.innerHTML = '<p class="no-data">No coupons</p>'; return; }
    box.innerHTML = list.map(c=>`<div class="registration-item"><div class="reg-icon">🍽️</div><div class="reg-details"><h4>${c.qr_code}</h4><p>${c.person_email} - ${c.role} ${c.redeemed ? '(Redeemed)' : ''}</p></div></div>`).join('');
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

// Search events
function searchEvents(query) {
    const events = loadEvents();
    const container = document.getElementById('eventsContainer');
    
    if (!container) return;
    
    if (!query) {
        displayEvents();
        return;
    }
    
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.category.toLowerCase().includes(query.toLowerCase()) ||
        event.overview.description.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredEvents.length === 0) {
        container.innerHTML = '<p class="no-data">No events found matching your search.</p>';
        return;
    }
    
    container.innerHTML = filteredEvents.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}" class="event-image" onerror="this.src='/assets/images/placeholder.jpg'">
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span>📅 ${event.date}</span>
                </div>
                <p class="event-description">${event.overview.description.substring(0, 100)}...</p>
                <a href="event-details.html?id=${event.id}" class="btn-view-details">View Details</a>
            </div>
        </div>
    `).join('');
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Display events on events page
    if (document.getElementById('eventsContainer')) {
        displayEvents();
    }
    
    // Set up search functionality
    const searchInput = document.getElementById('eventsSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchEvents(this.value);
        });
    }
    
    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter events
            displayEvents(this.dataset.filter);
        });
    });
});
