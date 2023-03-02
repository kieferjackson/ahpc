
// Make a media query for whether the user prefers reduced motion
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// Set whether animations should be disabled based on media query
const ANIMATION_DISABLED = !mediaQuery || mediaQuery.matches;

// Company Contact Info
const EMAIL_ADDRESS = 'info@advocatehpc.com';
const PHONE_NUMBER = '602-830-0605';