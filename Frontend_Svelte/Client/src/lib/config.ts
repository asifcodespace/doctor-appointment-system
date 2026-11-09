export const config = {
  // Backend API URL
  apiBaseUrl: "http://localhost:4000",

  // -------------------------------------------------------------
  // BRANDING & METADATA
  // -------------------------------------------------------------
  branding: {
    siteTitle: "Dr. Nafis Tarafder - General Practitioner",
    metaDescription: "Providing compassionate, expert medical care for you and your family. General practitioner services in Kanaighat, Sylhet.",
    favicon: "/favicon.png",
    colors: {
      primaryUrlBackground: "#1e3a3a",
      primaryText: "#1b3a3c",
      secondary: "#e0ede0",
      accent: "#a89f78",
    },
    logos: {
      main: "/images/logo-full.png",
      light: "/images/logo-dark.png",
      symbol: "/images/logo-symbol.png",
      favicon: "/favicon.png",
    },
  },

  // -------------------------------------------------------------
  // DOCTOR PROFILE
  // -------------------------------------------------------------
  doctor: {
    name: "Dr. Nafis",
    title: "General Practitioner",
    watermarkText: "M.D.",
    qualifications: ["MBBS (DU)", "DMU (Ultrasound)", "MD"],
    bio: "Dr. Nafis is a highly experienced General Practitioner dedicated to providing comprehensive and compassionate healthcare. With a strong background in both MBBS and FCPS, he specializes in diagnosing and treating a wide array of medical conditions, offering personalized care to each of his patients.",
    additionalBio: "His practice welcomes patients of all ages, offering both in-person and online consultations tailored to your schedule.",
    image: "/images/nafis_tarafder.jpeg",
  },

  // -------------------------------------------------------------
  // CONTACT & LOCATION
  // -------------------------------------------------------------
  contact: {
    phone: "+880 1753997900",
    email: "nafistarafder@gmail.com",
    address: "Modern Medical Services, Kanaighat, Sylhet",
    displayHours: "Sat–Thu: 05:00 PM – 08:00 PM (Fri: Closed)",
    workingHours: [
      { day: "Saturday - Thursday", time: "05:00 PM - 08:00 PM" },
      { day: "Friday", time: "Closed" },
    ],
    appointmentReasons: [
      "General Check-up",
      "Follow-up",
      "Emergency",
      "Other",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301397!2d90.39108011536269!3d23.75085808458925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a3683fbbc%3A0x6b3b246a4afc112!2sDhaka!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd",
  },

  // -------------------------------------------------------------
  // SERVICES
  // -------------------------------------------------------------
  services: [
    {
      id: "general-consultation",
      title: "General Consultation",
      description: "Comprehensive health assessment and diagnosis for all ages in a calm, professional setting.",
      icon: "stethoscope",
    },
    {
      id: "preventive-care",
      title: "Preventive Care",
      description: "Routine checkups, vaccinations, and screenings to keep you healthy before illness begins.",
      icon: "shield-check",
    },
    {
      id: "chronic-disease-management",
      title: "Chronic Disease Management",
      description: "Ongoing support and treatment plans for diabetes, hypertension, and long-term conditions.",
      icon: "heartbeat",
    },
    {
      id: "health-screenings",
      title: "Health Screenings",
      description: "Comprehensive health assessments to detect potential issues early on.",
      icon: "clipboard-list",
    },
  ],

  // -------------------------------------------------------------
  // PATIENT TESTIMONIALS & REVIEWS
  // -------------------------------------------------------------
  testimonials: [
    {
      stars: "★★★★★",
      text: '"Dr. Nafis took the time to really listen. I felt heard and cared for from the very first visit."',
      author: "Fatima R., Patient since 2021",
    },
    {
      stars: "★★★★★",
      text: '"Professional, warm, and thorough. My whole family now sees Dr. Nafis — couldn\'t be happier."',
      author: "Karim H., Patient since 2019",
    },
    {
      stars: "★★★★★",
      text: '"The online consultation was seamless. Got a diagnosis and prescription without leaving home."',
      author: "Sarah M., Patient since 2022",
    },
  ],

  // -------------------------------------------------------------
  // SOCIAL PROFILES
  // -------------------------------------------------------------
  socials: [
    { platform: "Facebook", url: "https://facebook.com/drnafis", icon: "facebook" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/drnafis", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com/drnafis", icon: "twitter" },
  ],

  // -------------------------------------------------------------
  // PAGE SECTIONS CONTENT
  // -------------------------------------------------------------
  sections: {
    header: {
      logoText: "Dr. Nafis",
      mobileCtaText: "BOOK NOW",
      navLinks: [
        { label: "SERVICES", href: "#services" },
        { label: "ABOUT", href: "#about" },
        { label: "REVIEWS", href: "#reviews" },
        { label: "CONTACT", href: "#contact" },
      ],
      ctaText: "BOOK NOW",
    },

    hero: {
      name: "Dr. Nafis",
      title: "General Practitioner",
      tagline: "Care that endures.",
      description: "We provide compassionate, expert medical care for you and your family. Your health is our lifelong commitment.",
      ctaText: "Book Appointment",
      secondaryCtaText: "Learn More",
    },

    stats: {
      items: [
        { label: "YEARS EXPERIENCE", value: "12+" },
        { label: "PATIENT RATING", value: "4.9★" },
        { label: "PATIENTS SERVED", value: "3,000+" },
        { label: "RESPONSE TIME", value: "24h" },
      ],
    },

    services: {
      title: "Our Services",
      subtitle: "WHAT WE OFFER",
    },

    about: {
      sectionLabel: "About",
      title: "Dr. Nafis",
      ctaText: "Book a Visit",
    },

    testimonials: {
      title: "What Our Patients Say",
      subtitle: "TESTIMONIALS",
    },

    contact: {
      title: "Get in Touch",
      subtitle: "CONTACT US",
      successModal: {
        title: "Appointment booked",
        message: "Your request was received successfully. We will contact you soon to confirm the time.",
        buttonText: "Close",
      },
    },

    footer: {
      logoText: "Dr. Nafis",
      description: "Dedicated to providing high-quality medical care with a personal touch. Your health is our priority.",
      callCtaText: "Call Now",
      quickLinks: [
        { label: "Home", href: "/" },
        { label: "About Doctor", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Book Appointment", href: "#contact" },
      ],
      legalLinks: [
        { label: "Privacy Policy", href: "/" },
        { label: "Terms of Service", href: "/" },
      ],
      copyrightText: "© 2026 asifcodespace. All rights reserved.",
    },
  },
};
