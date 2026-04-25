// ─── MOVIE DATA ───
// Replace these with API calls to your backend

export const POSTER_GRADIENTS = {
  mp1:  'linear-gradient(155deg,#1a0b26,#4a2080)',
  mp2:  'linear-gradient(155deg,#091828,#204880)',
  mp3:  'linear-gradient(155deg,#281200,#803000)',
  mp4:  'linear-gradient(155deg,#001c12,#005030)',
  mp5:  'linear-gradient(155deg,#1c1000,#604000)',
  mp6:  'linear-gradient(155deg,#1c0018,#600040)',
  mp7:  'linear-gradient(155deg,#001824,#004060)',
  mp8:  'linear-gradient(155deg,#181800,#484800)',
  mp9:  'linear-gradient(155deg,#180008,#500018)',
  mp10: 'linear-gradient(155deg,#001408,#003020)',
  mp11: 'linear-gradient(155deg,#0e0e26,#282860)',
  mp12: 'linear-gradient(155deg,#200a00,#602000)',
};

export const NOW_PLAYING = [
  { id: 1, title: 'Nebula Protocol',  genre: 'Sci-Fi · Action',   runtime: '2h 22m', rating: 8.7, ageRating: '14A', emoji: '🌌', poster: 'mp1' },
  { id: 2, title: 'Frozen Meridian',  genre: 'Thriller · Drama',  runtime: '1h 58m', rating: 7.4, ageRating: 'PG',  emoji: '🧊', poster: 'mp2' },
  { id: 3, title: 'Crimson Throne',   genre: 'Fantasy · Epic',    runtime: '2h 47m', rating: 9.1, ageRating: '18A', emoji: '🐉', poster: 'mp3' },
  { id: 4, title: "Eden's Edge",      genre: 'Drama · Romance',   runtime: '2h 05m', rating: 7.9, ageRating: 'G',   emoji: '🌿', poster: 'mp4' },
  { id: 5, title: 'Storm Atlas',      genre: 'Action · Adventure',runtime: '2h 15m', rating: 8.2, ageRating: '14A', emoji: '⚡', poster: 'mp5' },
  { id: 6, title: 'The Last Cipher',  genre: 'Mystery · Thriller',runtime: '1h 48m', rating: 7.6, ageRating: 'PG',  emoji: '🕵️', poster: 'mp6' },
  { id: 7, title: 'Masquerade',       genre: 'Drama · Art',       runtime: '2h 18m', rating: 8.0, ageRating: '14A', emoji: '🎭', poster: 'mp7' },
  { id: 8, title: 'Peak Pursuit',     genre: 'Adventure · Family',runtime: '1h 55m', rating: 7.2, ageRating: 'G',   emoji: '🏔️', poster: 'mp8' },
  { id: 9, title: 'Tidal Force',      genre: 'Sci-Fi · Drama',    runtime: '2h 30m', rating: 8.5, ageRating: '14A', emoji: '🌊', poster: 'mp9' },
  { id: 10, title: 'Circus of Souls', genre: 'Comedy · Fantasy',  runtime: '1h 40m', rating: 6.8, ageRating: 'PG',  emoji: '🎪', poster: 'mp10' },
  { id: 11, title: 'Void Prophecy',   genre: 'Sci-Fi · Horror',   runtime: '2h 08m', rating: 8.9, ageRating: '18A', emoji: '🔮', poster: 'mp11' },
  { id: 12, title: 'The Clever Fox',  genre: 'Animation · Comedy',runtime: '1h 32m', rating: 7.1, ageRating: 'G',   emoji: '🦊', poster: 'mp12' },
];

export const COMING_SOON_MARCH = [
  { id: 101, title: 'Velvet Echo',    genre: 'Romance · Mystery', runtime: '2h 10m', ageRating: 'PG',  emoji: '🌹', poster: 'mp6', releaseDate: 'Mar 7' },
  { id: 102, title: 'Silicon Gods',   genre: 'Sci-Fi · Thriller', runtime: '2h 35m', ageRating: '14A', emoji: '🤖', poster: 'mp7', releaseDate: 'Mar 21', canPreorder: true },
  { id: 103, title: 'Blue Beyond',    genre: 'Animation · Family',runtime: '1h 48m', ageRating: 'G',   emoji: '🌊', poster: 'mp2', releaseDate: 'Mar 28' },
  { id: 104, title: 'Iron Epoch',     genre: 'Action · History',  runtime: '2h 52m', ageRating: '18A', emoji: '🗡️', poster: 'mp1', releaseDate: 'Mar 14' },
  { id: 105, title: 'Noise & Silence',genre: 'Musical · Drama',   runtime: '2h 05m', ageRating: '14A', emoji: '🎵', poster: 'mp3', releaseDate: 'Mar 21' },
];

export const COMING_SOON_APRIL = [
  { id: 201, title: 'Desert Bloom',       genre: 'Drama · Adventure',    runtime: '1h 52m', ageRating: 'PG',  emoji: '☀️', poster: 'mp8', releaseDate: 'Apr 4' },
  { id: 202, title: 'The Hollow Dark',    genre: 'Horror · Supernatural',runtime: '2h 02m', ageRating: '18A', emoji: '👻', poster: 'mp9', releaseDate: 'Apr 18' },
  { id: 203, title: 'King of the Wild',   genre: 'Animation · Family',   runtime: '1h 44m', ageRating: 'G',   emoji: '🦁', poster: 'mp10', releaseDate: 'Apr 25' },
  { id: 204, title: "Warlord's Last Stand",genre: 'Action · Epic',        runtime: '2h 40m', ageRating: '14A', emoji: '⚔️', poster: 'mp11', releaseDate: 'Apr 11' },
  { id: 205, title: 'Moonfall Express',   genre: 'Mystery · Sci-Fi',     runtime: '1h 58m', ageRating: 'PG',  emoji: '🌙', poster: 'mp12', releaseDate: 'Apr 30' },
];

export const FEATURED_FILM = {
  title: 'Silicon Gods',
  release: 'March 21, 2026',
  ageRating: '14A',
  runtime: '2h 35m',
  tagline: 'MOST ANTICIPATED',
  description: 'In a near-future Toronto, a rogue AI collective redefines the line between creator and creation. The most talked-about film of 2026 — from director Anya Kowalczyk, filmed entirely in Canada.',
  emoji: '🤖',
  countdown: { days: 32, hours: 8, mins: 45, secs: 12 },
};

// ─── THEATRE DATA ───
export const THEATRES = [
  {
    id: 1,
    name: 'Cineplex Cinemas Yonge-Eglinton',
    chain: 'CINEPLEX · Scene+ Partner',
    address: '2300 Yonge St, Toronto, ON M4P 2W6',
    distance: '1.8 km',
    rating: '★★★★½',
    amenities: ['IMAX', '4DX', 'DBOX', 'VIP', '♿ Accessible', '🅿️ Parking'],
  },
  {
    id: 2,
    name: 'Scotiabank Theatre Toronto',
    chain: 'CINEPLEX · Scene+ Partner',
    address: '259 Richmond St W, Toronto, ON M5V 3M6',
    distance: '4.2 km',
    rating: '★★★★',
    amenities: ['IMAX', 'UltraAVX', 'VIP', '♿ Accessible'],
  },
  {
    id: 3,
    name: 'SilverCity Mississauga Cinemas',
    chain: 'LANDMARK · Scene+ Partner',
    address: '1177 Central Pkwy W, Mississauga, ON L5C 4P3',
    distance: '8.4 km',
    rating: '★★★½',
    amenities: ['DBOX', 'VIP', 'Standard', '♿ Accessible', '🅿️ Parking'],
  },
  {
    id: 4,
    name: 'Cineplex Odeon Eglinton Town Centre',
    chain: 'CINEPLEX · Scene+ Partner',
    address: '22 Lebovic Ave, Scarborough, ON M1L 4V9',
    distance: '12.1 km',
    rating: '★★★★',
    amenities: ['Standard', 'VIP', 'FR Available', '♿ Accessible'],
  },
  {
    id: 5,
    name: 'Rainbow Cinemas Market Square',
    chain: 'RAINBOW · Independent',
    address: '80 Front St E, Toronto, ON M5E 1T4',
    distance: '5.6 km',
    rating: '★★★',
    amenities: ['Standard', 'Budget Pricing', '♿ Accessible'],
  },
];

// ─── FEATURED MOVIES FOR HOME PAGE ───
export const FEATURED_HOME = [
  { id: 1, title: 'Nebula Protocol', genre: 'Sci-Fi · Action', runtime: '2h 22m', rating: 8.7, ageRating: '14A', emoji: '🌌', poster: 'mp1', badge: 'HOT', badgeType: 'badge-hot' },
  { id: 3, title: 'Crimson Throne',  genre: 'Fantasy · Epic',  runtime: '2h 47m', rating: 9.1, ageRating: '18A', emoji: '🐉', poster: 'mp3', badge: 'TOP RATED', badgeType: 'badge-genre' },
  { id: 11, title: 'Void Prophecy', genre: 'Sci-Fi · Horror',  runtime: '2h 08m', rating: 8.9, ageRating: '18A', emoji: '🔮', poster: 'mp11', badge: 'NEW', badgeType: 'badge-new' },
  { id: 9, title: 'Tidal Force',    genre: 'Sci-Fi · Drama',   runtime: '2h 30m', rating: 8.5, ageRating: '14A', emoji: '🌊', poster: 'mp9', badge: 'TRENDING', badgeType: 'badge-genre' },
  { id: 5, title: 'Storm Atlas',    genre: 'Action · Adventure',runtime:'2h 15m', rating: 8.2, ageRating: '14A', emoji: '⚡', poster: 'mp5' },
];

// ─── GIFT CARD DESIGNS ───
export const GIFT_CARD_DESIGNS = [
  { id: 1, amount: 25,  gradient: 'linear-gradient(135deg,#1a0b26,#8B4F10,#C47A2B)', tagline: 'Movie Magic Gift Card' },
  { id: 2, amount: 50,  gradient: 'linear-gradient(135deg,#091828,#004060,#C47A2B)', tagline: 'Movie Magic Gift Card' },
  { id: 3, amount: 100, gradient: 'linear-gradient(135deg,#1c0018,#600040,#C47A2B)', tagline: 'Movie Magic Gift Card' },
  { id: 4, amount: 150, gradient: 'linear-gradient(135deg,#0e0e26,#282860,#C47A2B)', tagline: 'Movie Magic Gift Card' },
];

// ─── SEAT MAP DATA ───
// 'p' = premium, 'taken' = taken, 'sel' = pre-selected, '' = standard
export const SEAT_ROWS = [
  { label: 'A', seats: ['p','p','p','GAP','p','p-sel','p-sel','p','p','p','GAP','p','p','p'] },
  { label: 'B', seats: ['p','p','p','GAP','p-taken','p-taken','p','p','p','p','GAP','p','p','p'] },
  { label: 'C', seats: ['','','','','GAP','taken','taken','','','','','GAP','','','',''] },
  { label: 'D', seats: ['','','','','GAP','','','taken','taken','taken','','GAP','','','',''] },
  { label: 'E', seats: ['','','','','GAP','','','','','','','GAP','','','',''] },
  { label: 'F', seats: ['','taken','taken','','GAP','','','','taken','','','GAP','taken','taken','',''] },
  { label: 'G', seats: ['','','','','GAP','taken','','','','','taken','GAP','','','',''] },
];
