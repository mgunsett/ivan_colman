import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.webp'

import argentina from '@assets/argentina.webp'
import cusco from '@assets/escudo_cusco.webp'
//Escudos trayectoria
import escudoAldosivi from '@assets/escudos/escudo_aldosivi.webp'
import escudoArgentinos from '@assets/escudos/escudo_argentinos.webp'
import escudoBoca from '@assets/escudos/escudo_boca.webp'
import escudoLuqueno from '@assets/escudos/escudo_luqueno.webp'
import escudoQuilmes from '@assets/escudos/escudo_quilmes.webp'
//Gallery
import image1 from '@assets/gallery/image1.webp'
import image2 from '@assets/gallery/image2.webp'
import image3 from '@assets/gallery/image3.webp'
import image4 from '@assets/gallery/image4.webp'
import image5 from '@assets/gallery/image5.webp'
import image6 from '@assets/gallery/image6.webp'
import image7 from '@assets/gallery/image7.webp'
import image8 from '@assets/gallery/image8.webp'
import image9 from '@assets/gallery/image9.webp'
import image10 from '@assets/gallery/image10.webp'
import image11 from '@assets/gallery/image11.webp'
import image12 from '@assets/gallery/image12.webp'
import image13 from '@assets/gallery/image13.webp'
import image14 from '@assets/gallery/image14.webp'
import image15 from '@assets/gallery/image15.webp'
import image16 from '@assets/gallery/image16.webp'
//Video
import photoGraph from '@assets/perfil_video.webp'
//Prensa
import logo1 from '@assets/logos/logo1.webp'
import logo2 from '@assets/logos/logo2.webp'
import logo3 from '@assets/logos/logo3.webp'
//Redes
import transfermkt from '@assets/contact2.svg'
import ledsports from '@assets/contact3.webp'
import moon from '@assets/contact4.webp'


const name = 'IVAN'
const fullName = 'COLMAN'

export const playerData = {
  name,
  fullName,
  initials: `${name[0]}${fullName[0]}`,
  displayName: `${name} ${fullName}`,
  number: 10,
  position: 'Mediocentro',
  positionShort: 'MCO',
  nationality: 'Argentino',
  nationalityFlag: argentina,
  age: 31,
  height: '1.73m',
  weight: '70kg',
  foot: 'Derecho',
  birthDate: '06 / 05 / 1995  ',
  birthPlace: 'San Martín, Argentina',
  currentClub: 'Cusco F.C.',
  logoCurrentClub: cusco,
  image: polaco1,
  

  stats: [
    { label: 'Velocidad',      value: 89 },
    { label: 'Remate',     value: 92 },
    { label: 'Regate',         value: 86 },
    { label: 'Pases',    value: 95 },
    { label: 'Presión Alta',   value: 87 },
    { label: 'Visión de Juego',value: 91 },
  ],

  seasonStats: [
    { label: 'Partidos',    value: 63},
    { label: 'Goles',       value: 13},
    { label: 'Asistencias', value: 21},
    { label: 'Tiros al arco', value: 14},
    { label: 'Min / Part.', value: "3,641'" },
    { label: 'Valoración', value: 8.9},

  ],

  clubs: [
    {
      name: 'Cusco F.C.',
      country: 'Perú',
      years: '2024 — Actualidad',
      logo: cusco,
      titles: [],
      info: 'Jugador con más Asistencias - Temporada 2025',
    },
    {
      name: 'C.A Quillmes',
      country: 'Argentina',
      years: '2022 — 2023',
      logo: escudoQuilmes,
      titles: [],
      info: '',
    },
    {
      name: 'Sportivo Luqueño',
      country: 'Paraguay',
      years: '2021 — 2022',
      logo: escudoLuqueno,
      titles: [],
      info: '',
    },
    {
      name: 'Argentinos Juniors',
      country: 'Argentina',
      years: '2019 — 2021',
      logo: escudoArgentinos,
      titles: [],
      info: '',
    },
    {
      name: 'Aldosivi',
      country: 'Argentina',
      years: '2018 — 2019',
      logo: escudoAldosivi,
      titles: [],
      info: '',
    },
    {
      name: 'Argentinos Juniors',
      country: 'Argentina',
      years: '2016 — 2018',
      logo: escudoArgentinos,
      titles: ['Campeón Primera Nacional 2016/17'],
      info: '',
    },
    {
      name: 'Boca Juniors',
      country: 'Argentina',
      years: '2014 — 2016',
      logo: escudoBoca,
      titles: [],
      info: 'Inferiores',
    },

  ],

  videos: [
    {
      id: 'v2',
      instagramId: 'DPP_syMDWD5',
      title: 'Asistencia',
      fullTitle: 'Ivan Colman | Asistencias \'26',
      season: 'Asistencias Cusco F.C.',
      league: 'LIGA 1 2025',
      thumbnail: image2,
      cover: image2,
      category: 'Asistencia',
    },
    {
      id: 'v3',
      instagramId: 'DVjGHikDaUC',
      title: 'Highlights \'25',
      fullTitle: 'Ivan Colman | Highlights \'25',
      season: 'Highlights Cusco F.C. \'25',
      league: 'LIGA 1 2025',
      thumbnail: image10,
      cover: image10,
      category: 'Highlights',
    },
    
    {
      id: 'v4',
      instagramId: 'DCmfAbFpTpl',
      title: 'Highlights \'24',
      fullTitle: 'Ivan Colman | Highlights \'24',
      season: 'Highlights Cusco F.C. \'24',
      league: 'LIGA 1 2024',
      thumbnail: image4,
      cover: image4,
      category: 'Highlights',
    },
  ],



  gallery: [
    { id: 1, src: image1, alt: 'Ivan Colman', caption: 'Cusco F.C.', category: 'Partido', aspect: 'wide' },
    { id: 2, src: image2, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Festejo', aspect: 'tall' },
    { id: 3, src: image3, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Entrenamiento', aspect: 'square' },
    { id: 4, src: image4, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 5, src: image5, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Equipo', aspect: 'wide' },
    { id: 6, src: image6, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Retrato', aspect: 'tall' },
    { id: 7, src: image7, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 8, src: image8, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 9, src: image9, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 10, src: image10, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 11, src: image11, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 12, src: image12, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 13, src: image13, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 14, src: image14, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 15, src: image15, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
    { id: 16, src: image16, alt: 'Ivan Colman', caption: 'Cusco F.C', category: 'Partido', aspect: 'wide' },
  ],

   press: [
    {
      media: 'Liga 1 TeApuesto',
      logo:  logo3,
      title: '¡𝗘𝗹 𝗰𝗼𝗻𝗱𝘂𝗰𝘁𝗼𝗿 𝗲𝗹𝗲𝗴𝗶𝗱𝗼 𝗱𝗲 𝗹𝗮 𝗳𝗲𝗰𝗵𝗮! Iván Colman es el Jugador al Volante @indrive.pe de la Fecha 1 tras su gol y asistencia en la victoria de Cusco FC. 🟡⚫️',
      date:  'Julio 2025 ',
      url:   'https://www.instagram.com/p/DbELHTxEja7/',
    },
    {
      media: 'Liga1 Max',
      logo:  logo3,
      title: 'DIRECTOR DE ORQUESTA 🎻\n\nIván Colman lidera el torneo con 328 pases completados y una precisión del 85.19%.',
      date:  'Marzo 2026',
      url:   'https://www.instagram.com/p/DVjGHikDaUC/',
    },
    {
      media: 'Oneftbol  ',
      logo:  logo1,
      title: 'Todo equipo necesita al jugador de los buenos pases, y Cusco tiene a @ivan_colman8 🇦🇷. Con 31 asistencias, se convirtió en el jugador más asistidor de los últimos 5 años de la Liga 1.',
      date:  'Diciembre 2025',
      url:   'https://www.instagram.com/p/DS79VnxDv5p/',
    },
  ],

  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@ivan_colman8',
      url: 'https://www.instagram.com/ivan_colman8/',
      hoverColor: '#E1306C',
      hoverGradient: 'insta-gradient',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: '/ivan-colman',
      url: 'https://www.transfermarkt.com.ar/ivan-colman/profil/spieler/380603',
      hoverColor: '#2e73f2',
    },
  ],

  contact: [
    {
      title:      'Representante Deportivo',
      label:      'Moon Sports Group',
      image:       moon,
      handle:     '@moonsportsgroup_',
      url:        'https://www.instagram.com/moonsportsgroup_/',
      hoverColor: 'rgba(19, 81, 139, 0.2)',
      borderColor: 'rgb(19, 81, 139)',
    },
    {
      title:      'Contacto Marketing',
      label:      'led sports marketing',
      image: ledsports,
      handle:     '@_ledsports',
      url:        'https://www.instagram.com/_ledsports/',
      hoverColor: 'rgba(212,168,75,0.18)',
      borderColor: 'rgb(129, 103, 46)',
    },
  ],
}
