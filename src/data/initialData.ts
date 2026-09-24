import { CourseInfo, MCQQuestion, QuestionPaper, BookMaterial, SubjectTopic, UserProgressState, UserProfile, MockTestResultData, AuthUser } from '../types';

export const INITIAL_COURSES: CourseInfo[] = [
  {
    id: 'BPT',
    name: 'BPT',
    fullName: 'Bachelor of Physiotherapy',
    level: 'UG',
    description: '4.5 Years professional degree covering Anatomy, Physiology, Biomechanics, Exercise Therapy & Rehabilitation.',
    iconName: 'Activity',
    availableQuestionsCount: 1450,
  },
  {
    id: 'BOT',
    name: 'BOT',
    fullName: 'Bachelor of Occupational Therapy',
    level: 'UG',
    description: '4.5 Years clinical program training in sensory integration, ergonomics, assistive tech & pediatric therapy.',
    iconName: 'Sparkles',
    availableQuestionsCount: 1180,
  },
  {
    id: 'BPO',
    name: 'BPO',
    fullName: 'Bachelor of Prosthetics & Orthotics',
    level: 'UG',
    description: '4.5 Years specialized program in biomechanical assessment, CAD-CAM fabrication & prosthetic fitting.',
    iconName: 'Footprints',
    availableQuestionsCount: 940,
  },
  {
    id: 'BASLP',
    name: 'BASLP',
    fullName: 'Bachelor of Audiology & Speech-Language Pathology',
    level: 'UG',
    description: '4 Years clinical science in audiology, phonetics, neurogenic communication disorders & dysphagia.',
    iconName: 'Mic',
    availableQuestionsCount: 1020,
  },
  {
    id: 'MPT',
    name: 'MPT',
    fullName: 'Master of Physiotherapy',
    level: 'PG',
    description: '2 Years post-graduate specialization in Musculoskeletal, Neurosciences, Cardio-Pulmonary & Sports.',
    iconName: 'Stethoscope',
    availableQuestionsCount: 880,
  },
  {
    id: 'MOT',
    name: 'MOT',
    fullName: 'Master of Occupational Therapy',
    level: 'PG',
    description: '2 Years advanced specialization in Neuro-rehabilitation, Pediatrics, Mental Health & Hand Rehabilitation.',
    iconName: 'Brain',
    availableQuestionsCount: 720,
  },
  {
    id: 'MPO',
    name: 'MPO',
    fullName: 'Master of Prosthetics & Orthotics',
    level: 'PG',
    description: '2 Years advanced clinical bioengineering, neural prostheses & high-activity orthotics research.',
    iconName: 'Compass',
    availableQuestionsCount: 650,
  },
];

export const INITIAL_TOPICS: SubjectTopic[] = [
  // Anatomy
  {
    id: 'anat-upper-limb',
    subject: 'Anatomy',
    name: 'Upper Limb',
    questionCount: 120,
    accuracy: 78,
    course: 'BPT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'anat-lower-limb',
    subject: 'Anatomy',
    name: 'Lower Limb',
    questionCount: 110,
    accuracy: 71,
    course: 'BPT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'anat-thorax',
    subject: 'Anatomy',
    name: 'Thorax & Diaphragm',
    questionCount: 85,
    accuracy: 82,
    course: 'BPT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'anat-abdomen',
    subject: 'Anatomy',
    name: 'Abdomen & Pelvis',
    questionCount: 95,
    accuracy: 65,
    course: 'BPT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'anat-head-neck',
    subject: 'Anatomy',
    name: 'Head & Neck',
    questionCount: 130,
    accuracy: 69,
    course: 'BPT',
    year: 'first',
    semester: 'sem2',
  },
  {
    id: 'anat-neuroanatomy',
    subject: 'Anatomy',
    name: 'Neuroanatomy & Spinal Cord',
    questionCount: 140,
    accuracy: 74,
    course: 'BPT',
    year: 'first',
    semester: 'sem2',
  },

  // Physiology
  {
    id: 'phys-cvs',
    subject: 'Physiology',
    name: 'Cardiovascular System',
    questionCount: 115,
    accuracy: 80,
    course: 'BPT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'phys-respiratory',
    subject: 'Physiology',
    name: 'Respiratory System',
    questionCount: 90,
    accuracy: 75,
    course: 'BPT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'phys-nervous',
    subject: 'Physiology',
    name: 'Nervous System & Synapse',
    questionCount: 125,
    accuracy: 68,
    course: 'BPT',
    year: 'first',
    semester: 'sem2',
  },
  {
    id: 'phys-renal',
    subject: 'Physiology',
    name: 'Renal System & Electrolytes',
    questionCount: 80,
    accuracy: 72,
    course: 'BPT',
    year: 'first',
    semester: 'sem2',
  },

  // Biomechanics & Kinesiology
  {
    id: 'biomech-gait',
    subject: 'Biomechanics',
    name: 'Gait Analysis & Kinetics',
    questionCount: 105,
    accuracy: 84,
    course: 'BPT',
    year: 'second',
    semester: 'sem1',
  },
  {
    id: 'biomech-shoulder',
    subject: 'Biomechanics',
    name: 'Shoulder Complex & Scapulohumeral Rhythm',
    questionCount: 95,
    accuracy: 79,
    course: 'BPT',
    year: 'second',
    semester: 'sem1',
  },
  {
    id: 'biomech-hip-knee',
    subject: 'Biomechanics',
    name: 'Hip & Knee Joint Mechanics',
    questionCount: 110,
    accuracy: 73,
    course: 'BPT',
    year: 'second',
    semester: 'sem2',
  },

  // Exercise Therapy & Electrotherapy
  {
    id: 'ex-therapy-goniometry',
    subject: 'Exercise Therapy',
    name: 'Goniometry & Muscle Testing (MMT)',
    questionCount: 100,
    accuracy: 88,
    course: 'BPT',
    year: 'second',
    semester: 'sem1',
  },
  {
    id: 'electro-tens',
    subject: 'Electrotherapy',
    name: 'TENS, IFT & Therapeutic Ultrasound',
    questionCount: 115,
    accuracy: 81,
    course: 'BPT',
    year: 'second',
    semester: 'sem2',
  },

  // BOT specific topics
  {
    id: 'ot-sensory',
    subject: 'Occupational Therapy',
    name: 'Sensory Integration Therapy',
    questionCount: 90,
    accuracy: 76,
    course: 'BOT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'ot-splints',
    subject: 'Occupational Therapy',
    name: 'Hand Splinting & Orthotics in OT',
    questionCount: 85,
    accuracy: 70,
    course: 'BOT',
    year: 'second',
    semester: 'sem1',
  },

  // BPO specific topics
  {
    id: 'bpo-transfemoral',
    subject: 'Prosthetics',
    name: 'Transfemoral Socket Design & Alignment',
    questionCount: 95,
    accuracy: 75,
    course: 'BPO',
    year: 'first',
    semester: 'sem1',
  },

  // BASLP specific topics
  {
    id: 'baslp-audiology',
    subject: 'Speech & Audiology',
    name: 'Pure Tone Audiometry & Acoustic Immittance',
    questionCount: 105,
    accuracy: 82,
    course: 'BASLP',
    year: 'first',
    semester: 'sem1',
  },

  // PG MPT topics
  {
    id: 'mpt-neuro-ndf',
    subject: 'Advanced Neuro PT',
    name: 'Neurodevelopmental Technique (NDT) & PNF',
    questionCount: 120,
    accuracy: 83,
    course: 'MPT',
    year: 'first',
    semester: 'sem1',
  },
  {
    id: 'mpt-ortho-manual',
    subject: 'Musculoskeletal PT',
    name: 'Maitland & Kaltenborn Manual Therapy',
    questionCount: 130,
    accuracy: 86,
    course: 'MPT',
    year: 'first',
    semester: 'sem1',
  }
];

export const INITIAL_MCQS: MCQQuestion[] = [
  {
    id: 'mcq-1',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    question: 'Which nerve supplies the deltoid muscle and teres minor?',
    options: [
      { id: 'A', text: 'Musculocutaneous nerve' },
      { id: 'B', text: 'Axillary nerve' },
      { id: 'C', text: 'Radial nerve' },
      { id: 'D', text: 'Median nerve' },
    ],
    correctAnswer: 'B',
    explanation: 'The axillary nerve (C5, C6 posterior cord of brachial plexus) passes through the quadrangular space and supplies the deltoid and teres minor muscles, and gives the upper lateral cutaneous nerve of the arm.',
    difficulty: 'Easy',
  },
  {
    id: 'mcq-2',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    question: 'Injury to the upper trunk of the brachial plexus (Erb\'s point) characteristically results in:',
    options: [
      { id: 'A', text: 'Claw hand deformity' },
      { id: 'B', text: 'Wrist drop' },
      { id: 'C', text: 'Policeman\'s tip (Waiter\'s tip) hand deformity' },
      { id: 'D', text: 'Ape thumb deformity' },
    ],
    correctAnswer: 'C',
    explanation: 'Erb-Duchenne palsy (injury to C5, C6 upper trunk) affects abductors and lateral rotators of the shoulder and flexors/supinators of the forearm, leaving the limb adducted, medially rotated, and forearm pronated and extended (Waiter\'s tip posture).',
    difficulty: 'Medium',
  },
  {
    id: 'mcq-3',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    question: 'Which muscle initiates the first 0° to 15° of shoulder abduction before the deltoid takes over?',
    options: [
      { id: 'A', text: 'Infraspinatus' },
      { id: 'B', text: 'Supraspinatus' },
      { id: 'C', text: 'Subscapularis' },
      { id: 'D', text: 'Pectoralis major' },
    ],
    correctAnswer: 'B',
    explanation: 'The supraspinatus muscle, supplied by the suprascapular nerve, initiates glenohumeral abduction from 0° to 15°. The middle fibers of the deltoid continue abduction up to 90°.',
    difficulty: 'Easy',
  },
  {
    id: 'mcq-4',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    question: 'The carpal tunnel contains the median nerve and how many flexor tendons?',
    options: [
      { id: 'A', text: '7 tendons' },
      { id: 'B', text: '8 tendons' },
      { id: 'C', text: '9 tendons' },
      { id: 'D', text: '10 tendons' },
    ],
    correctAnswer: 'C',
    explanation: 'The carpal tunnel transmits 9 flexor tendons: 4 tendons of flexor digitorum superficialis (FDS), 4 tendons of flexor digitorum profundus (FDP), and 1 tendon of flexor pollicis longus (FPL), along with the median nerve.',
    difficulty: 'Hard',
  },
  {
    id: 'mcq-5',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    question: 'Trendelenburg sign is positive due to weakness of which muscle group?',
    options: [
      { id: 'A', text: 'Gluteus maximus' },
      { id: 'B', text: 'Gluteus medius and minimus' },
      { id: 'C', text: 'Iliopsoas' },
      { id: 'D', text: 'Adductor longus' },
    ],
    correctAnswer: 'B',
    explanation: 'A positive Trendelenburg sign occurs with weakness of the hip abductors (gluteus medius and minimus, supplied by the superior gluteal nerve). The pelvis drops on the unsupported opposite side during single-limb stance.',
    difficulty: 'Medium',
  },
  {
    id: 'mcq-6',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Physiology',
    topic: 'Cardiovascular System',
    question: 'According to the Frank-Starling law of the heart, stroke volume increases in response to an increase in:',
    options: [
      { id: 'A', text: 'Afterload' },
      { id: 'B', text: 'End-diastolic volume (Preload)' },
      { id: 'C', text: 'Heart rate alone' },
      { id: 'D', text: 'Total peripheral resistance' },
    ],
    correctAnswer: 'B',
    explanation: 'The Frank-Starling law states that the force of ventricular contraction is proportional to the initial length of cardiac muscle fibers, meaning greater end-diastolic filling (preload) yields greater stroke volume within physiological limits.',
    difficulty: 'Medium',
  },
  {
    id: 'mcq-7',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Physiology',
    topic: 'Cardiovascular System',
    question: 'The primary natural pacemaker of the normal human heart is the:',
    options: [
      { id: 'A', text: 'Atrioventricular (AV) node' },
      { id: 'B', text: 'Sinoatrial (SA) node' },
      { id: 'C', text: 'Bundle of His' },
      { id: 'D', text: 'Purkinje fibers' },
    ],
    correctAnswer: 'B',
    explanation: 'The Sinoatrial (SA) node, situated at the junction of the superior vena cava and right atrium, possesses the highest intrinsic rate of spontaneous diastolic depolarization (70-80 bpm).',
    difficulty: 'Easy',
  },
  {
    id: 'mcq-8',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Physiology',
    topic: 'Respiratory System',
    question: 'Functional Residual Capacity (FRC) is calculated as the sum of which two lung volumes?',
    options: [
      { id: 'A', text: 'Tidal Volume + Inspiratory Reserve Volume' },
      { id: 'B', text: 'Expiratory Reserve Volume + Residual Volume' },
      { id: 'C', text: 'Vital Capacity + Residual Volume' },
      { id: 'D', text: 'Inspiratory Capacity + Tidal Volume' },
    ],
    correctAnswer: 'B',
    explanation: 'FRC is the volume of gas remaining in the lungs at the end of normal expiration and equals Expiratory Reserve Volume (ERV) + Residual Volume (RV), typically around 2200-2400 mL.',
    difficulty: 'Medium',
  },
  {
    id: 'mcq-9',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    semester: 'sem1',
    subject: 'Biomechanics',
    topic: 'Gait Analysis & Kinetics',
    question: 'In normal Rancho Los Amigos gait terminology, the stance phase constitutes approximately what percentage of the total gait cycle?',
    options: [
      { id: 'A', text: '40%' },
      { id: 'B', text: '50%' },
      { id: 'C', text: '60%' },
      { id: 'D', text: '75%' },
    ],
    correctAnswer: 'C',
    explanation: 'Under normal cadence, the stance phase accounts for approximately 60% of the gait cycle (including two double-support periods of ~10% each), and the swing phase accounts for 40%.',
    difficulty: 'Easy',
  },
  {
    id: 'mcq-10',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    semester: 'sem1',
    subject: 'Biomechanics',
    topic: 'Shoulder Complex & Scapulohumeral Rhythm',
    question: 'During 180° of shoulder abduction, what is the classical ratio of glenohumeral to scapulothoracic motion described by Inman?',
    options: [
      { id: 'A', text: '1:1' },
      { id: 'B', text: '2:1' },
      { id: 'C', text: '3:1' },
      { id: 'D', text: '1:2' },
    ],
    correctAnswer: 'B',
    explanation: 'The classic scapulohumeral rhythm demonstrates an overall 2:1 ratio: for every 3° of shoulder elevation, 2° occurs at the glenohumeral joint and 1° occurs through scapulothoracic upward rotation.',
    difficulty: 'Easy',
  },
  {
    id: 'mcq-11',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    semester: 'sem1',
    subject: 'Exercise Therapy',
    topic: 'Goniometry & Muscle Testing (MMT)',
    question: 'According to Daniels and Worthingham Manual Muscle Testing, a muscle grade of 3 (Fair) indicates:',
    options: [
      { id: 'A', text: 'Complete range of motion with full gravity eliminated' },
      { id: 'B', text: 'Complete range of motion against gravity with no manual resistance' },
      { id: 'C', text: 'Complete range against gravity with moderate resistance' },
      { id: 'D', text: 'Trace contraction with no detectable joint movement' },
    ],
    correctAnswer: 'B',
    explanation: 'Grade 3 (Fair) means the patient can complete the full available active range of motion against the resistance of gravity, but cannot tolerate any additional external manual resistance.',
    difficulty: 'Easy',
  },
  {
    id: 'mcq-12',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    semester: 'sem2',
    subject: 'Electrotherapy',
    topic: 'TENS, IFT & Therapeutic Ultrasound',
    question: 'High-frequency conventional TENS primarily produces analgesia via which neurophysiological mechanism?',
    options: [
      { id: 'A', text: 'Endorphin release in the brainstem' },
      { id: 'B', text: 'Gate Control Theory via large myelinated A-beta fibers' },
      { id: 'C', text: 'Direct block of C-fiber action potentials' },
      { id: 'D', text: 'Inhibition of peripheral acetylcholine synthesis' },
    ],
    correctAnswer: 'B',
    explanation: 'Conventional high-frequency TENS (80-120 Hz) selectively stimulates large diameter non-nociceptive A-beta fibers, closing the presynaptic substantia gelatinosa gate to smaller A-delta and C nociceptive fibers (Melzack & Wall Gate Control Theory).',
    difficulty: 'Medium',
  },
  {
    id: 'mcq-13',
    course: 'BOT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Occupational Therapy',
    topic: 'Sensory Integration Therapy',
    question: 'Ayres Sensory Integration (ASI) theory identifies which three primary sensory systems as the foundation for complex praxis and adaptive behavior?',
    options: [
      { id: 'A', text: 'Visual, Auditory, Gustatory' },
      { id: 'B', text: 'Tactile, Vestibular, Proprioceptive' },
      { id: 'C', text: 'Olfactory, Kinesthetic, Visceral' },
      { id: 'D', text: 'Motor, Cognitive, Affective' },
    ],
    correctAnswer: 'B',
    explanation: 'Dr. A. Jean Ayres established that the tactile, vestibular, and proprioceptive systems are the core triad that builds body scheme, postural security, ocular control, and motor planning (praxis).',
    difficulty: 'Medium',
  },
  {
    id: 'mcq-14',
    course: 'BPO',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Prosthetics',
    topic: 'Transfemoral Socket Design & Alignment',
    question: 'In an Ischial Containment (IC) transfemoral socket, the primary goal of containing the ischial tuberosity within the socket brim is to:',
    options: [
      { id: 'A', text: 'Increase socket rotational looseness' },
      { id: 'B', text: 'Maintain femoral adduction and stabilize pelvic tilt' },
      { id: 'C', text: 'Allow excessive medial-lateral displacement' },
      { id: 'D', text: 'Eliminate all hydrostatic pressure' },
    ],
    correctAnswer: 'B',
    explanation: 'The Ischial Containment socket captures the ischium and ascending ramus inside the medial-posterior wall, restoring a physiological adduction angle to the femur and locking the socket against coronal pelvic listing during midstance.',
    difficulty: 'Hard',
  },
  {
    id: 'mcq-15',
    course: 'BASLP',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Speech & Audiology',
    topic: 'Pure Tone Audiometry & Acoustic Immittance',
    question: 'A Jerger Type B tympanogram (flat tracing with no identifiable compliance peak) is most characteristically diagnostic of:',
    options: [
      { id: 'A', text: 'Otosclerosis' },
      { id: 'B', text: 'Otitis media with effusion (glue ear)' },
      { id: 'C', text: 'Ossicular chain disruption' },
      { id: 'D', text: 'Eustachian tube dysfunction with negative pressure' },
    ],
    correctAnswer: 'B',
    explanation: 'A Type B tympanogram demonstrates non-mobile middle ear impedance characteristic of middle ear fluid (otitis media with effusion), hemotympanum, or a tympanic membrane perforation (indicated by abnormally large canal volume).',
    difficulty: 'Medium',
  },
  {
    id: 'mcq-16',
    course: 'MPT',
    level: 'PG',
    year: 'first',
    semester: 'sem1',
    subject: 'Advanced Neuro PT',
    topic: 'Neurodevelopmental Technique (NDT) & PNF',
    question: 'In Proprioceptive Neuromuscular Facilitation (PNF), the D1 Flexion diagonal pattern for the upper extremity consists of:',
    options: [
      { id: 'A', text: 'Flexion, Adduction, External Rotation' },
      { id: 'B', text: 'Flexion, Abduction, Internal Rotation' },
      { id: 'C', text: 'Extension, Abduction, Internal Rotation' },
      { id: 'D', text: 'Extension, Adduction, External Rotation' },
    ],
    correctAnswer: 'A',
    explanation: 'Upper extremity D1 Flexion is often remembered as the "eating apple / bringing food to mouth" pattern: Shoulder Flexion, Adduction, and External rotation, forearm supination, and wrist/finger flexion toward the opposite ear.',
    difficulty: 'Hard',
  }
];

export const INITIAL_PAPERS: QuestionPaper[] = [
  {
    id: 'qp-2026-anat',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Anatomy - Paper I',
    examYear: 2026,
    examName: 'End Semester University Examination',
    paperCode: 'BPT-101-ANAT',
    pdfSize: '2.4 MB',
    totalPages: 8,
    durationHours: 3,
    maxMarks: 80,
    sections: [
      {
        title: 'Section A: Long Essay Questions (Answer any 2 out of 3)',
        instructions: 'Each question carries 10 marks. Illustrate your answers with neat labeled diagrams where necessary.',
        questions: [
          {
            qNumber: 'Q1',
            marks: 10,
            text: 'Describe the Brachial Plexus under the following headings: (a) Formation and roots, (b) Trunks, divisions, and cords, (c) Branches arising from the cords, (d) Clinical anatomy of Erb\'s palsy and Klumpke\'s palsy.',
            subparts: ['Formation & Relations (3)', 'Branches (3)', 'Applied Clinical Anatomy (4)'],
          },
          {
            qNumber: 'Q2',
            marks: 10,
            text: 'Describe the Knee Joint under: (a) Articular surfaces and type, (b) Ligaments and menisci, (c) Movements and muscles causing them, (d) Locking and unlocking mechanism.',
            subparts: ['Joint anatomy & Menisci (4)', 'Biomechanics & Movements (3)', 'Locking/Unlocking mechanism (3)'],
          },
          {
            qNumber: 'Q3',
            marks: 10,
            text: 'Describe the Thoracic Diaphragm: its origins, insertions, major and minor openings with structures traversing them, nerve supply, and applied importance in respiration.',
          },
        ],
      },
      {
        title: 'Section B: Short Essay Questions (Answer any 8 out of 10)',
        instructions: 'Each question carries 5 marks. Write focused, structured answers.',
        questions: [
          { qNumber: 'Q4', marks: 5, text: 'Carpal Tunnel: boundaries, contents, and Carpal Tunnel Syndrome.' },
          { qNumber: 'Q5', marks: 5, text: 'Deltoid muscle: origin, insertion, nerve supply, and clinical testing.' },
          { qNumber: 'Q6', marks: 5, text: 'Femoral Triangle: boundaries, contents, and clinical significance.' },
          { qNumber: 'Q7', marks: 5, text: 'Sciatic nerve: course, branches, and foot drop.' },
          { qNumber: 'Q8', marks: 5, text: 'Histology of compact bone: Haversian system with neat diagram.' },
          { qNumber: 'Q9', marks: 5, text: 'Cubital Fossa: boundaries and arrangement of contents from medial to lateral.' },
          { qNumber: 'Q10', marks: 5, text: 'Blood supply of the heart: Right and Left coronary arteries.' },
          { qNumber: 'Q11', marks: 5, text: 'Sternocleidomastoid muscle: attachments, actions, and torticollis.' },
        ],
      },
      {
        title: 'Section C: Short Answer Questions (Answer all)',
        instructions: 'Each question carries 2 marks.',
        questions: [
          { qNumber: 'Q12', marks: 2, text: 'Name the rotator cuff muscles.' },
          { qNumber: 'Q13', marks: 2, text: 'Mention two contents of the quadrangular space.' },
          { qNumber: 'Q14', marks: 2, text: 'What is carrying angle of the elbow?' },
          { qNumber: 'Q15', marks: 2, text: 'Name the bones forming the subtalar joint.' },
          { qNumber: 'Q16', marks: 2, text: 'Which nerve injury causes Winging of Scapula?' },
        ],
      },
    ],
  },
  {
    id: 'qp-2025-phys',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Physiology - Paper II',
    examYear: 2025,
    examName: 'Annual University Examination',
    paperCode: 'BPT-102-PHYS',
    pdfSize: '2.1 MB',
    totalPages: 6,
    durationHours: 3,
    maxMarks: 80,
    sections: [
      {
        title: 'Section A: Long Essay Questions (Answer any 2 out of 3)',
        instructions: 'Each question carries 10 marks.',
        questions: [
          {
            qNumber: 'Q1',
            marks: 10,
            text: 'Define Blood Pressure. Explain the short-term baroreceptor reflex and long-term renal mechanisms of arterial blood pressure regulation.',
          },
          {
            qNumber: 'Q2',
            marks: 10,
            text: 'Describe the molecular mechanism of skeletal muscle contraction (Sliding Filament Theory). Add a note on rigor mortis and muscle fatigue.',
          },
          {
            qNumber: 'Q3',
            marks: 10,
            text: 'Describe the transport of Oxygen and Carbon Dioxide in the blood. Explain the Oxygen-Hemoglobin dissociation curve and factors shifting it.',
          },
        ],
      },
      {
        title: 'Section B: Short Essays (5 Marks Each)',
        instructions: 'Answer any 8 questions.',
        questions: [
          { qNumber: 'Q4', marks: 5, text: 'Erythropoiesis: stages and factors regulating red blood cell production.' },
          { qNumber: 'Q5', marks: 5, text: 'Cardiac output: definition, normal value, and Fick\'s principle.' },
          { qNumber: 'Q6', marks: 5, text: 'Neuromuscular junction transmission and Myasthenia Gravis.' },
          { qNumber: 'Q7', marks: 5, text: 'Functions of the Cerebellum in motor coordination.' },
          { qNumber: 'Q8', marks: 5, text: 'Surfactant: composition, source, and physiological significance in preventing alveolar collapse.' },
        ],
      },
    ],
  },
  {
    id: 'qp-2024-biomech',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    semester: 'sem1',
    subject: 'Biomechanics & Kinesiology',
    examYear: 2024,
    examName: 'University Examination',
    paperCode: 'BPT-201-BIOM',
    pdfSize: '3.1 MB',
    totalPages: 10,
    durationHours: 3,
    maxMarks: 80,
    sections: [
      {
        title: 'Section A: Long Essay Questions',
        instructions: 'Answer 2 out of 3 questions (10 marks each).',
        questions: [
          {
            qNumber: 'Q1',
            marks: 10,
            text: 'Define Gait Cycle. Describe the subphases of stance and swing phase according to Rancho Los Amigos terminology with muscle activity and joint kinematics.',
          },
          {
            qNumber: 'Q2',
            marks: 10,
            text: 'Explain the Scapulohumeral Rhythm in detail. Describe the force couples operating around the shoulder joint during full arm elevation.',
          },
        ],
      },
    ],
  },
  {
    id: 'qp-2023-electro',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    semester: 'sem2',
    subject: 'Electrotherapy',
    examYear: 2023,
    examName: 'University Examination',
    paperCode: 'BPT-204-ELEC',
    pdfSize: '1.9 MB',
    totalPages: 6,
    durationHours: 3,
    maxMarks: 80,
    sections: [
      {
        title: 'Section A: Long Essay Questions',
        instructions: 'Answer 2 questions (10 marks each).',
        questions: [
          {
            qNumber: 'Q1',
            marks: 10,
            text: 'Describe the principles, physiological effects, indications, and contraindications of Therapeutic Ultrasound. Explain cavitation and acoustic streaming.',
          },
          {
            qNumber: 'Q2',
            marks: 10,
            text: 'Explain Interferential Therapy (IFT). Discuss beat frequency, electrode placement methods, and therapeutic uses in pain management.',
          },
        ],
      },
    ],
  },
  {
    id: 'qp-2025-bot-sensory',
    course: 'BOT',
    level: 'UG',
    year: 'first',
    semester: 'sem1',
    subject: 'Occupational Therapy Foundations',
    examYear: 2025,
    examName: 'University Annual Examination',
    paperCode: 'BOT-101-OTF',
    pdfSize: '2.0 MB',
    totalPages: 7,
    durationHours: 3,
    maxMarks: 80,
    sections: [
      {
        title: 'Section A: Long Essays',
        instructions: 'Answer any 2 questions (10 marks each).',
        questions: [
          {
            qNumber: 'Q1',
            marks: 10,
            text: 'Discuss Jean Ayres Sensory Integration Frame of Reference. Explain assessment and interventions for sensory processing disorder in children.',
          },
        ],
      },
    ],
  },
  {
    id: 'qp-2025-mpt-neuro',
    course: 'MPT',
    level: 'PG',
    year: 'first',
    semester: 'sem1',
    subject: 'Advanced Neurological Physiotherapy',
    examYear: 2025,
    examName: 'PG University Examination',
    paperCode: 'MPT-PG-101',
    pdfSize: '2.8 MB',
    totalPages: 8,
    durationHours: 3,
    maxMarks: 100,
    sections: [
      {
        title: 'Section A: Critical Analysis and Case-based Long Essays',
        instructions: 'Answer 2 out of 3 questions (20 marks each).',
        questions: [
          {
            qNumber: 'Q1',
            marks: 20,
            text: 'A 58-year-old male with Middle Cerebral Artery ischemic stroke presents with right hemiplegia, spasticity (Brunnstrom stage 3), and pusher syndrome. Formulate an evidence-based neurorehabilitation protocol incorporating NDT, motor relearning, and task-specific training.',
          },
        ],
      },
    ],
  },
];

export const INITIAL_BOOKS: BookMaterial[] = [
  {
    id: 'book-grays-anatomy',
    title: "Gray's Anatomy for Students",
    author: 'Richard L. Drake, A. Wayne Vogl, Adam W. M. Mitchell',
    subject: 'Anatomy',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    totalPages: 850,
    coverTheme: 'blue',
    edition: '4th Edition',
    chapters: [
      {
        chapterNumber: 1,
        title: 'The Body: An Introduction & Terminology',
        pageStart: 1,
        pageEnd: 54,
        summary: 'Fundamental anatomical planes, directional terms, musculoskeletal organization, and nervous system divisions.',
        content: [
          'Anatomy is the foundation of clinical medicine and physical rehabilitation.',
          'Anatomical Position: Erect stance with feet together, arms resting by the side, and palms facing anteriorly with neutral thumbs.',
          'Planes of Reference: Median/Sagittal (dividing into left and right), Coronal/Frontal (anterior and posterior), Transverse/Axial (superior and inferior).',
          'Skeletal System: Axial skeleton (80 bones) and Appendicular skeleton (126 bones).',
        ],
        keyPoints: [
          'Know sagittal, coronal, and transverse axes for gait and joint mobilization.',
          'Cartilage types: Hyaline, Fibrocartilage, and Elastic cartilage.',
          'Synovial joint features: articular cartilage, fibrous capsule, synovial membrane, joint cavity with synovial fluid.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'The Upper Limb: Bones, Joints & Brachial Plexus',
        pageStart: 55,
        pageEnd: 248,
        summary: 'Comprehensive osteology, myology, innervation, and vascular supply of the pectoral girdle, arm, forearm, and hand.',
        content: [
          'The pectoral girdle connects the upper limb to the axial skeleton exclusively at the sternoclavicular joint.',
          'Brachial Plexus: Formed by ventral rami of C5-T1 spinal nerves. 5 Roots -> 3 Trunks -> 6 Divisions -> 3 Cords -> Terminal branches.',
          'Axillary nerve (C5, C6): supplies deltoid and teres minor. Vulnerable in anterior shoulder dislocation and surgical neck humerus fractures.',
          'Radial nerve (C5-T1): Innervates all posterior compartment extensor muscles of arm and forearm. Lesion in radial groove produces wrist drop.',
          'Median nerve (C5-T1): Innervates most flexor muscles of forearm and thenar compartment. Entrapment under flexor retinaculum causes Carpal Tunnel Syndrome.',
        ],
        keyPoints: [
          'High radial nerve injury leads to paralysis of triceps, brachioradialis, supinator, and all wrist/finger extensors.',
          'Erb-Duchenne Palsy (C5-C6 upper trunk): Policeman\'s tip posture.',
          'Klumpke Palsy (C8-T1 lower trunk): True claw hand deformity with intrinsic hand muscle wasting.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'The Lower Limb: Hip, Knee, Ankle & Locomotion',
        pageStart: 249,
        pageEnd: 480,
        summary: 'Clinical anatomy of pelvis, femoral triangle, knee joint ligaments, popliteal fossa, and ankle arches.',
        content: [
          'Hip joint: Multiaxial ball-and-socket synovial joint. Supported by iliofemoral ligament of Bigelow (strongest ligament in the human body).',
          'Femoral triangle bounded by inguinal ligament superiorly, sartorius laterally, and adductor longus medially. Contents: Femoral nerve, artery, vein, canal (NAVeL).',
          'Knee joint: Cruciate ligaments (ACL prevents anterior tibial translation; PCL prevents posterior tibial translation). Menisci enhance articular conformity and shock absorption.',
          'Sciatic nerve splits into tibial and common fibular nerves. Common fibular nerve circles neck of fibula; vulnerable to compression leading to foot drop.',
        ],
        keyPoints: [
          'Trendelenburg sign tests gluteus medius/minimus functional strength.',
          'Anterior drawer and Lachman tests evaluate ACL integrity.',
          'Deltoid ligament stabilizes the medial ankle; lateral collateral ligaments (ATFL, CFL, PTFL) are most commonly injured in inversion sprains.',
        ],
      },
    ],
  },
  {
    id: 'book-guyton-phys',
    title: 'Textbook of Medical Physiology',
    author: 'John E. Hall, Arthur C. Guyton',
    subject: 'Physiology',
    course: 'BPT',
    level: 'UG',
    year: 'first',
    totalPages: 1120,
    coverTheme: 'emerald',
    edition: '14th Edition',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Membrane Potentials & Action Potentials',
        pageStart: 1,
        pageEnd: 95,
        summary: 'Resting membrane potential, voltage-gated ion channels, Nernst equation, and saltatory nerve conduction.',
        content: [
          'Resting membrane potential in large nerve fibers is approximately -70 to -90 mV, governed primarily by potassium diffusion potential via leak channels.',
          'Action Potential: Rapid depolarization triggered when threshold (-55 mV) is reached, opening voltage-gated sodium channels.',
          'Repolarization: Inactivation of sodium channels and opening of voltage-gated potassium channels restores negative intracellular potential.',
          'Saltatory Conduction: In myelinated fibers, action potentials leap from one Node of Ranvier to the next, increasing conduction velocity up to 120 m/s.',
        ],
        keyPoints: [
          'All-or-none law applies to individual nerve and muscle fibers.',
          'Refractory periods: Absolute (no stimulus can fire an AP) and Relative (suprathreshold stimulus can fire an AP).',
          'Local anesthetics block voltage-gated sodium channels reversibly.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Contraction of Skeletal & Cardiac Muscle',
        pageStart: 96,
        pageEnd: 210,
        summary: 'Neuromuscular junction, sarcoplasmic reticulum calcium release, cross-bridge cycle, and cardiac syncytium.',
        content: [
          'Excitation-Contraction Coupling: Action potential propagates into T-tubules, activating dihydropyridine receptors (DHPR), which mechanically open ryanodine receptors (RyR1) on the sarcoplasmic reticulum.',
          'Calcium binds to Troponin C, shifting Tropomyosin off the active sites on actin filaments.',
          'Cross-bridge cycling: Myosin head hydrolyzes ATP, cocks, binds actin, generates power stroke, and detaches upon binding a fresh ATP molecule.',
          'Cardiac muscle cells are joined by intercalated discs with gap junctions, creating a functional syncytium.',
        ],
        keyPoints: [
          'Frank-Starling law links ventricular end-diastolic volume with stroke volume.',
          'Cardiac action potential has a prolonged plateau phase (Phase 2) due to L-type Ca2+ channel influx, preventing tetanic contraction.',
        ],
      },
    ],
  },
  {
    id: 'book-brunnstrom-biomech',
    title: "Brunnstrom's Clinical Kinesiology",
    author: 'Peggy A. Houglum, David B. Bertoti',
    subject: 'Biomechanics',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    totalPages: 640,
    coverTheme: 'amber',
    edition: '6th Edition',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Mechanical Principles & Forces in Human Motion',
        pageStart: 1,
        pageEnd: 60,
        summary: 'Newtonian mechanics, levers, torque, center of gravity, line of gravity, and base of support in rehab.',
        content: [
          'First Class Lever: Axis lies between force and resistance (e.g. atlanto-occipital joint nodding motion).',
          'Second Class Lever: Resistance lies between axis and force (e.g. plantarflexion on toes; high mechanical advantage > 1).',
          'Third Class Lever: Force lies between axis and resistance (e.g. biceps brachii at elbow; mechanical advantage < 1, built for speed and range).',
          'Center of Gravity (COG): In anatomical position, located just anterior to S2 vertebral body.',
        ],
        keyPoints: [
          'Most human musculoskeletal levers are 3rd class, favoring velocity over mechanical force multiplication.',
          'Stability increases with a wider base of support, lower COG, and line of gravity falling within the base.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Kinetics and Kinematics of Normal Human Gait',
        pageStart: 61,
        pageEnd: 180,
        summary: 'Temporal-spatial gait parameters, ground reaction forces, joint moments, and pathological gait deviations.',
        content: [
          'Stride length is the distance between two successive placements of the same foot; step length is between opposite feet.',
          'Initial Contact (Heel strike): Ground reaction force creates a plantarflexion moment, resisted by eccentric contraction of anterior tibialis.',
          'Loading Response: Hip extensors and quadriceps fire to absorb shock and prevent knee collapse.',
          'Midstance: Single limb support, gluteus medius controls pelvic drop in the frontal plane.',
          'Terminal Stance to Pre-swing: Plantarflexors (gastroc-soleus) produce push-off power generation.',
        ],
        keyPoints: [
          'Antalgic gait: shortened stance phase on the affected painful limb.',
          'Trendelenburg gait: compensated trunk lean over weak stance hip.',
          'Steppage gait: high knee lift due to foot drop (common fibular nerve palsy).',
        ],
      },
    ],
  },
  {
    id: 'book-clayton-electro',
    title: "Clayton's Electrotherapy: Theory and Practice",
    author: 'Angela Forster, Nigel Palastanga',
    subject: 'Electrotherapy',
    course: 'BPT',
    level: 'UG',
    year: 'second',
    totalPages: 420,
    coverTheme: 'crimson',
    edition: '9th Edition',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Low and Medium Frequency Currents',
        pageStart: 1,
        pageEnd: 120,
        summary: 'Galvanic, faradic, high voltage pulsed galvanic, and interferential therapeutic currents.',
        content: [
          'Faradic Current: Short-duration interrupted current (0.1 to 1 ms pulse, 50-100 Hz frequency) used to stimulate innervated muscles.',
          'Interrupted Galvanic Current: Long-duration pulses (>100 ms) used to produce sluggish contraction in denervated muscle fibers.',
          'Interferential Current (IFT): Crossing two medium-frequency alternating currents (e.g. 4000 Hz and 4100 Hz) to produce a low-frequency beat frequency (100 Hz) in deep tissues with minimal skin impedance.',
        ],
        keyPoints: [
          'Skin resistance decreases inversely with frequency (Capacitive reactance Xc = 1 / 2πfC).',
          'IFT achieves deep tissue penetration without the superficial discomfort of low frequency currents.',
        ],
      },
    ],
  },
  {
    id: 'book-osullivan-rehab',
    title: 'Physical Rehabilitation',
    author: "Susan B. O'Sullivan, Thomas J. Schmitz, George D. Fulk",
    subject: 'Neuro-Rehabilitation',
    course: 'MPT',
    level: 'PG',
    year: 'first',
    totalPages: 1350,
    coverTheme: 'indigo',
    edition: '7th Edition',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Examination of Motor Function & Tone',
        pageStart: 1,
        pageEnd: 150,
        summary: 'Modified Ashworth Scale, Tardieu scale, cerebellar testing, motor control frameworks, and reflex hierarchy.',
        content: [
          'Modified Ashworth Scale (MAS): 0 (No increase in tone) to 4 (Rigid in flexion or extension).',
          'Spasticity is a velocity-dependent increase in tonic stretch reflexes with exaggerated tendon jerks, resulting from hyperexcitability of the stretch reflex as an upper motor neuron syndrome.',
          'Tardieu Scale assesses spasticity at different velocities (V1 slow to V3 as fast as possible) and measures the angle of catch (R1) versus full passive range (R2).',
        ],
        keyPoints: [
          'Difference between R2 and R1 reflects the dynamic spastic component treatable with physical modalities and botulinum toxin.',
          'Postural control models: Ankle strategy, Hip strategy, and Stepping strategy.',
        ],
      },
    ],
  },
  {
    id: 'book-prosthetics-rehab',
    title: 'Orthotics and Prosthetics in Rehabilitation',
    author: 'Michelle M. Lusardi, Jorge M. Jorge, Carol C. Nielsen',
    subject: 'Prosthetics & Orthotics',
    course: 'BPO',
    level: 'UG',
    year: 'first',
    totalPages: 910,
    coverTheme: 'purple',
    edition: '4th Edition',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Transtibial and Transfemoral Prosthetic Components',
        pageStart: 1,
        pageEnd: 110,
        summary: 'Suspension mechanisms, socket biomechanics (PTB, TSB, Quad, IC), prosthetic feet, and knee units.',
        content: [
          'Patellar Tendon-Bearing (PTB) socket provides pressure-tolerant loading at the patellar tendon, medial tibial flare, and gastrocnemius belly.',
          'Total Surface Bearing (TSB) socket distributes load equally across the residual limb with silicone/gel suction liners.',
          'Transfemoral Quadrilateral socket: narrow anterior-posterior dimension with a horizontal posterior shelf for the ischial tuberosity.',
        ],
        keyPoints: [
          'Pressure-sensitive areas in transtibial: tibial tubercle, fibular head, distal cut end of tibia and fibula.',
          'Dynamic response (energy-storing) prosthetic feet provide spring return for active ambulators.',
        ],
      },
    ],
  },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Aditya Sharma',
  avatarSeed: 'allied-student',
  course: 'BPT',
  level: 'UG',
  year: 'first',
  semester: 'sem1',
  institution: 'National Institute of Allied Health & Rehabilitation Sciences',
  email: 'aditya.sharma@alliedprep.edu',
  mobileNumber: '9876543210',
};

export const INITIAL_USER_PROGRESS: UserProgressState = {
  questionsAttempted: 148,
  correctAnswers: 116,
  testsCompleted: 6,
  studyTimeMinutes: 340,
  recentTopics: [
    {
      subject: 'Anatomy',
      topic: 'Upper Limb',
      course: 'BPT',
      year: 'first',
      semester: 'sem1',
      progress: 72,
      lastAttempted: 'Today at 09:30 AM',
    },
    {
      subject: 'Physiology',
      topic: 'Cardiovascular System',
      course: 'BPT',
      year: 'first',
      semester: 'sem1',
      progress: 45,
      lastAttempted: 'Yesterday at 04:15 PM',
    },
  ],
  bookmarkedQuestionIds: ['mcq-1', 'mcq-2', 'mcq-10'],
  bookmarkedPaperIds: ['qp-2026-anat'],
  bookmarkedBookIds: ['book-grays-anatomy'],
  bookmarkedTopicIds: ['anat-upper-limb', 'phys-cvs'],
  bookReadingProgress: {
    'book-grays-anatomy': 126,
    'book-guyton-phys': 42,
  },
  answeredQuestionRecords: {
    'mcq-1': { selected: 'B', isCorrect: true, timestamp: Date.now() - 3600000 },
    'mcq-2': { selected: 'C', isCorrect: true, timestamp: Date.now() - 7200000 },
  },
  mockTestHistory: [
    {
      id: 'mock-hist-1',
      title: 'First Year BPT Anatomy & Physiology Grand Mock Test',
      date: 'Sep 20, 2026',
      totalQuestions: 50,
      correct: 42,
      incorrect: 6,
      skipped: 2,
      accuracy: 84,
      timeTakenSeconds: 1920,
      userAnswers: {},
      questionIds: ['mcq-1', 'mcq-2', 'mcq-3', 'mcq-4', 'mcq-5'],
    },
  ],
};

const STORAGE_KEYS = {
  COURSES: 'alliedprep_courses_v1',
  TOPICS: 'alliedprep_topics_v1',
  MCQS: 'alliedprep_mcqs_v1',
  PAPERS: 'alliedprep_papers_v1',
  BOOKS: 'alliedprep_books_v1',
  USER_PROFILE: 'alliedprep_user_profile_v1',
  USER_PROGRESS: 'alliedprep_user_progress_v1',
  BOOKMARKS: 'alliedprep_bookmarks_v1',
  MOCK_TESTS: 'alliedprep_mock_tests_v1',
  READING_PROGRESS: 'alliedprep_reading_progress_v1',
  CURRENT_USER: 'alliedprep_current_user_v1',
  REGISTERED_USERS: 'alliedprep_registered_users_v1',
};

export function getStoredData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed saving data to localStorage for key ${key}`, err);
  }
}

export function loadStoredMCQs(): MCQQuestion[] {
  return getStoredData<MCQQuestion[]>(STORAGE_KEYS.MCQS, INITIAL_MCQS);
}

export function saveStoredMCQs(mcqs: MCQQuestion[]): void {
  saveStoredData(STORAGE_KEYS.MCQS, mcqs);
}

export function loadStoredPapers(): QuestionPaper[] {
  return getStoredData<QuestionPaper[]>(STORAGE_KEYS.PAPERS, INITIAL_PAPERS);
}

export function saveStoredPapers(papers: QuestionPaper[]): void {
  saveStoredData(STORAGE_KEYS.PAPERS, papers);
}

export function loadStoredBooks(): BookMaterial[] {
  return getStoredData<BookMaterial[]>(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
}

export function saveStoredBooks(books: BookMaterial[]): void {
  saveStoredData(STORAGE_KEYS.BOOKS, books);
}

export function loadStoredProfile(): UserProfile {
  return getStoredData<UserProfile>(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE);
}

export function saveStoredProfile(profile: UserProfile): void {
  saveStoredData(STORAGE_KEYS.USER_PROFILE, profile);
}

export function loadStoredProgress(): UserProgressState {
  return getStoredData<UserProgressState>(STORAGE_KEYS.USER_PROGRESS, INITIAL_USER_PROGRESS);
}

export function saveStoredProgress(progress: UserProgressState): void {
  saveStoredData(STORAGE_KEYS.USER_PROGRESS, progress);
}

export interface BookmarksData {
  questionIds: string[];
  paperIds: string[];
  bookIds: string[];
}

export function loadStoredBookmarks(): BookmarksData {
  return getStoredData<BookmarksData>(STORAGE_KEYS.BOOKMARKS, {
    questionIds: INITIAL_USER_PROGRESS.bookmarkedQuestionIds,
    paperIds: INITIAL_USER_PROGRESS.bookmarkedPaperIds,
    bookIds: INITIAL_USER_PROGRESS.bookmarkedBookIds,
  });
}

export function saveStoredBookmarks(bookmarks: BookmarksData): void {
  saveStoredData(STORAGE_KEYS.BOOKMARKS, bookmarks);
}

export function loadStoredMockTests(): MockTestResultData[] {
  return getStoredData<MockTestResultData[]>(STORAGE_KEYS.MOCK_TESTS, INITIAL_USER_PROGRESS.mockTestHistory);
}

export function saveStoredMockTests(tests: MockTestResultData[]): void {
  saveStoredData(STORAGE_KEYS.MOCK_TESTS, tests);
}

export function loadStoredReadingProgress(): Record<string, number> {
  return getStoredData<Record<string, number>>(STORAGE_KEYS.READING_PROGRESS, {
    'book-anatomy-grays': 126,
    'book-physio-guyton': 45,
  });
}

export function saveStoredReadingProgress(progress: Record<string, number>): void {
  saveStoredData(STORAGE_KEYS.READING_PROGRESS, progress);
}

export const INITIAL_REGISTERED_USERS: AuthUser[] = [
  {
    id: 'user-default-1',
    name: 'Aditya Sharma',
    mobileNumber: '9876543210',
    email: 'aditya.sharma@alliedprep.edu',
    course: 'BPT',
    password: 'password123',
    registeredAt: '2026-09-01T10:00:00.000Z',
  },
];

export function loadCurrentUser(): AuthUser | null {
  return getStoredData<AuthUser | null>(STORAGE_KEYS.CURRENT_USER, null);
}

export function saveCurrentUser(user: AuthUser | null): void {
  if (user === null) {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (e) {
      console.error(e);
    }
  } else {
    saveStoredData(STORAGE_KEYS.CURRENT_USER, user);
  }
}

export function loadRegisteredUsers(): AuthUser[] {
  return getStoredData<AuthUser[]>(STORAGE_KEYS.REGISTERED_USERS, INITIAL_REGISTERED_USERS);
}

export function saveRegisteredUsers(users: AuthUser[]): void {
  saveStoredData(STORAGE_KEYS.REGISTERED_USERS, users);
}

export function resetAllDataToDefault(): void {
  localStorage.removeItem(STORAGE_KEYS.COURSES);
  localStorage.removeItem(STORAGE_KEYS.TOPICS);
  localStorage.removeItem(STORAGE_KEYS.MCQS);
  localStorage.removeItem(STORAGE_KEYS.PAPERS);
  localStorage.removeItem(STORAGE_KEYS.BOOKS);
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  localStorage.removeItem(STORAGE_KEYS.MOCK_TESTS);
  localStorage.removeItem(STORAGE_KEYS.READING_PROGRESS);
}

export { STORAGE_KEYS };
