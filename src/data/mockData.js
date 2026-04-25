import MOVIES_RAW from './movies.json';
import THEATRES_RAW from './theatres.json';

// ─── POSTER GRADIENTS (keyed by genre for real data) ───
export const POSTER_GRADIENTS = {
  // Legacy keys
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
  // Genre-based keys
  'Animated':          'linear-gradient(155deg,#002818,#006040)',
  'Science fiction':   'linear-gradient(155deg,#040810,#0a1850)',
  'Action':            'linear-gradient(155deg,#1a0400,#600808)',
  'Horror':            'linear-gradient(155deg,#060606,#200008)',
  'Comedy':            'linear-gradient(155deg,#1a1400,#605000)',
  'Drama':             'linear-gradient(155deg,#000c18,#002848)',
  'Thriller':          'linear-gradient(155deg,#080010,#220038)',
  'Romance':           'linear-gradient(155deg,#16000c,#500038)',
  'Romantic comedy':   'linear-gradient(155deg,#180010,#500040)',
  'Biography':         'linear-gradient(155deg,#0e0900,#3c2808)',
  'Music':             'linear-gradient(155deg,#120018,#400058)',
  'Fantasy':           'linear-gradient(155deg,#080818,#202278)',
  'Adventure':         'linear-gradient(155deg,#001810,#004030)',
  'Documentary':       'linear-gradient(155deg,#090908,#2a2810)',
  'Mystery':           'linear-gradient(155deg,#050508,#141428)',
  'Family':            'linear-gradient(155deg,#001608,#004c1c)',
  'Children':          'linear-gradient(155deg,#001208,#003818)',
  'War':               'linear-gradient(155deg,#0c0c08,#303018)',
  'Crime drama':       'linear-gradient(155deg,#0e0606,#38140e)',
  'Dark comedy':       'linear-gradient(155deg,#100c00,#362600)',
  'Historical drama':  'linear-gradient(155deg,#0e0800,#362200)',
  'Musical comedy':    'linear-gradient(155deg,#140010,#3c0038)',
  'LGBTQ':             'linear-gradient(155deg,#10001a,#3a0050)',
  'Comedy drama':      'linear-gradient(155deg,#080c14,#202840)',
  'Anime':             'linear-gradient(155deg,#1a0010,#60003a)',
  'Blues':             'linear-gradient(155deg,#000c18,#002850)',
  'Country':           'linear-gradient(155deg,#100a00,#3c2800)',
  'Gospel':            'linear-gradient(155deg,#100800,#403000)',
  'Pop':               'linear-gradient(155deg,#14001a,#480058)',
  'R&B':               'linear-gradient(155deg,#0c0018,#300050)',
  'Rock':              'linear-gradient(155deg,#100000,#400008)',
  'Soul':              'linear-gradient(155deg,#0a0014,#280044)',
  'Funk':              'linear-gradient(155deg,#100c00,#402c00)',
  default:             'linear-gradient(155deg,#080810,#181828)',
};

// ─── HELPERS ───
function parseRuntime(pt) {
  if (!pt) return '';
  const m = pt.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m) return '';
  return [m[1] && m[1] + 'h', m[2] && m[2] + 'm'].filter(Boolean).join(' ');
}

function langDisplay(code) {
  const map = { en: 'English', 'en-GB': 'English', 'fr-CA': 'French', 'fr-FR': 'French', 'es-ES': 'Spanish', it: 'Italian', pa: 'Punjabi', ml: 'Malayalam', pl: 'Polish', vi: 'Vietnamese' };
  return map[code] || 'English';
}

const GENRE_EMOJI = {
  'Animated': '🎨', 'Science fiction': '🚀', 'Action': '💥', 'Horror': '👻',
  'Comedy': '😄', 'Drama': '🎭', 'Thriller': '🕵️', 'Romance': '❤️',
  'Romantic comedy': '💕', 'Biography': '📖', 'Music': '🎵', 'Fantasy': '✨',
  'Adventure': '🗺️', 'Documentary': '🎥', 'Mystery': '🔍', 'Family': '🌟',
  'Children': '🌈', 'War': '⚔️', 'Crime drama': '🔫', 'Dark comedy': '😈',
  'Historical drama': '🏛️', 'Musical comedy': '🎪', 'LGBTQ': '🏳️‍🌈',
  'Anime': '⛩️', 'Music': '🎶', 'Comedy drama': '🎭',
};

function theatreChain(name) {
  if (/cineplex|scotiabank/i.test(name)) return 'CINEPLEX · Scene+';
  if (/landmark/i.test(name)) return 'LANDMARK';
  if (/rainbow/i.test(name)) return 'RAINBOW';
  if (/tiff/i.test(name)) return 'TIFF';
  if (/imax/i.test(name)) return 'IMAX Theatre';
  return 'Independent';
}

function theatreAmenities(name) {
  const tags = [];
  if (/imax/i.test(name)) tags.push('IMAX');
  if (/vip/i.test(name)) tags.push('VIP');
  if (/ultraavx|avx/i.test(name)) tags.push('UltraAVX');
  if (tags.length === 0) tags.push('Standard');
  tags.push('♿ Accessible');
  return tags;
}

const TMS_IMG_BASE = 'http://developer.tmsimg.com/';
const TMS_API_KEY  = process.env.REACT_APP_TMS_API_KEY || '';

// ─── NOW PLAYING (all 132 movies from JSON) ───
export const NOW_PLAYING = MOVIES_RAW.map((m, i) => {
  const genres = m.genres || [];
  const g1 = genres[0] || 'Drama';
  const g2 = genres[1];
  const genreStr = g2 ? `${g1} · ${g2}` : g1;
  const rawUri = m.preferredImage?.uri;
  const imageUri = rawUri ? rawUri.split('?')[0] : null;
  return {
    id: m.tmsId,
    title: m.title,
    genre: genreStr,
    genres,
    runtime: parseRuntime(m.runTime),
    releaseYear: m.releaseYear,
    releaseDate: m.releaseDate,
    ageRating: m.ratings?.[0]?.code || 'NR',
    emoji: GENRE_EMOJI[g1] || '🎬',
    poster: g1,
    imageUri,
    posterUrl: imageUri ? `${TMS_IMG_BASE}${imageUri}?w=240&h=360&api_key=${TMS_API_KEY}` : null,
    posterUrlLarge: imageUri ? `${TMS_IMG_BASE}${imageUri}?w=480&h=720&api_key=${TMS_API_KEY}` : null,
    language: langDisplay(m.titleLang),
    director: m.directors?.[0] || '',
    cast: m.topCast || [],
    synopsis: m.longDescription || m.shortDescription || '',
    showtimes: (m.showtimes || []).map(s => ({
      theatreId: s.theatre.id,
      theatreName: s.theatre.name,
      dateTime: s.dateTime,
      format: s.quals || '',
    })),
  };
});

// ─── FEATURED HOME (first 5 movies with badges) ───
const BADGE_DEFS = [
  { badge: 'HOT', badgeType: 'badge-hot' },
  { badge: 'NEW', badgeType: 'badge-new' },
  { badge: 'TRENDING', badgeType: 'badge-genre' },
  {},
  {},
];
export const FEATURED_HOME = NOW_PLAYING.slice(0, 5).map((m, i) => ({ ...m, ...BADGE_DEFS[i] }));

// ─── THEATRES (from JSON, only those with active showtimes) ───
const THEATRE_MAP = new Map(THEATRES_RAW.map(t => [t.theatreId, t]));
const ACTIVE_IDS = [...new Set(MOVIES_RAW.flatMap(m => (m.showtimes || []).map(s => s.theatre.id)))];

export const THEATRES = ACTIVE_IDS
  .map(id => THEATRE_MAP.get(id))
  .filter(Boolean)
  .sort((a, b) => a.location.distance - b.location.distance)
  .map(t => {
    const addr = t.location.address;
    return {
      id: t.theatreId,
      name: t.name,
      chain: theatreChain(t.name),
      address: `${addr.street}, ${addr.city}, ${addr.state} ${addr.postalCode}`,
      postalCode: addr.postalCode,
      city: addr.city,
      phone: t.location.telephone,
      distance: `${t.location.distance.toFixed(1)} km`,
      geoCode: t.location.geoCode,
      amenities: theatreAmenities(t.name),
      rating: '',
    };
  });

// ─── LOOKUP MAPS (built from real data) ───

// theatreId → transformed THEATRES entry (address, phone, postalCode, etc.)
export const THEATRE_LOOKUP = Object.fromEntries(THEATRES.map(t => [t.id, t]));

// theatreId → array of movies showing there today with their slots
export const MOVIES_BY_THEATRE = {};
NOW_PLAYING.forEach(movie => {
  movie.showtimes.forEach(s => {
    if (!MOVIES_BY_THEATRE[s.theatreId]) MOVIES_BY_THEATRE[s.theatreId] = [];
    let entry = MOVIES_BY_THEATRE[s.theatreId].find(e => e.id === movie.id);
    if (!entry) {
      entry = {
        id: movie.id,
        title: movie.title,
        emoji: movie.emoji,
        genre: movie.genre,
        ageRating: movie.ageRating,
        runtime: movie.runtime,
        poster: movie.poster,
        posterUrl: movie.posterUrl,
        slots: [],
      };
      MOVIES_BY_THEATRE[s.theatreId].push(entry);
    }
    entry.slots.push({ dateTime: s.dateTime, format: s.format });
  });
});

// ─── COMING SOON (kept as curated mock data) ───
export const COMING_SOON_MARCH = [
  { id: 101, title: 'Velvet Echo',     genre: 'Romance · Mystery', runtime: '2h 10m', ageRating: 'PG',  emoji: '🌹', poster: 'Romance',           releaseDate: 'Mar 7' },
  { id: 102, title: 'Silicon Gods',    genre: 'Sci-Fi · Thriller',  runtime: '2h 35m', ageRating: 'PG-13', emoji: '🤖', poster: 'Science fiction', releaseDate: 'Mar 21', canPreorder: true },
  { id: 103, title: 'Blue Beyond',     genre: 'Animated · Family',  runtime: '1h 48m', ageRating: 'G',   emoji: '🌊', poster: 'Animated',          releaseDate: 'Mar 28' },
  { id: 104, title: 'Iron Epoch',      genre: 'Action · History',   runtime: '2h 52m', ageRating: 'R',   emoji: '🗡️', poster: 'Action',            releaseDate: 'Mar 14' },
  { id: 105, title: 'Noise & Silence', genre: 'Musical · Drama',    runtime: '2h 05m', ageRating: 'PG-13', emoji: '🎵', poster: 'Music',           releaseDate: 'Mar 21' },
];

export const COMING_SOON_APRIL = [
  { id: 201, title: 'Desert Bloom',        genre: 'Drama · Adventure',      runtime: '1h 52m', ageRating: 'PG',  emoji: '☀️',  poster: 'Adventure',  releaseDate: 'Apr 4' },
  { id: 202, title: 'The Hollow Dark',     genre: 'Horror · Supernatural',  runtime: '2h 02m', ageRating: 'R',   emoji: '👻',  poster: 'Horror',     releaseDate: 'Apr 18' },
  { id: 203, title: 'King of the Wild',    genre: 'Animated · Family',      runtime: '1h 44m', ageRating: 'G',   emoji: '🦁',  poster: 'Animated',   releaseDate: 'Apr 25' },
  { id: 204, title: "Warlord's Last Stand",genre: 'Action · Epic',          runtime: '2h 40m', ageRating: 'PG-13', emoji: '⚔️', poster: 'Action',   releaseDate: 'Apr 11' },
  { id: 205, title: 'Moonfall Express',    genre: 'Mystery · Sci-Fi',       runtime: '1h 58m', ageRating: 'PG',  emoji: '🌙',  poster: 'Mystery',    releaseDate: 'Apr 30' },
];

export const FEATURED_FILM = {
  title: 'Silicon Gods',
  release: 'March 21, 2026',
  ageRating: 'PG-13',
  runtime: '2h 35m',
  tagline: 'MOST ANTICIPATED',
  description: 'In a near-future Toronto, a rogue AI collective redefines the line between creator and creation. The most talked-about film of 2026 — from director Anya Kowalczyk, filmed entirely in Canada.',
  emoji: '🤖',
  countdown: { days: 32, hours: 8, mins: 45, secs: 12 },
};

// ─── GIFT CARD DESIGNS ───
export const GIFT_CARD_DESIGNS = [
  { id: 1, amount: 25,  gradient: 'linear-gradient(135deg,#1a0b26,#8B4F10,#C47A2B)', tagline: 'Movie Magic Gift Card' },
  { id: 2, amount: 50,  gradient: 'linear-gradient(135deg,#091828,#004060,#C47A2B)', tagline: 'Movie Magic Gift Card' },
  { id: 3, amount: 100, gradient: 'linear-gradient(135deg,#1c0018,#600040,#C47A2B)', tagline: 'Movie Magic Gift Card' },
  { id: 4, amount: 150, gradient: 'linear-gradient(135deg,#0e0e26,#282860,#C47A2B)', tagline: 'Movie Magic Gift Card' },
];
