import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.webp'
//Estadísticas (recuadro destacado)
import polaco2 from '@assets/polaco2.webp'
import colman_stats from '@assets/colman_stats.webp'

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
import image17 from '@assets/gallery/image17.webp'
import image18 from '@assets/gallery/image18.webp'
import image19 from '@assets/gallery/image19.webp'
import image21 from '@assets/gallery/image21.webp'
import image22 from '@assets/gallery/image22.webp'
import image23 from '@assets/gallery/image23.webp'
import image24 from '@assets/gallery/image24.webp'
import image25 from '@assets/gallery/image25.webp'
import image27 from '@assets/gallery/image27.webp'
import image28 from '@assets/gallery/image28.webp'
import image29 from '@assets/gallery/image29.webp'
import image30 from '@assets/gallery/image30.webp'
import image31 from '@assets/gallery/image31.webp'
import image32 from '@assets/gallery/image32.webp'
import image33 from '@assets/gallery/image33.webp'
import image34 from '@assets/gallery/image34.webp'
import image35 from '@assets/gallery/image35.webp'
import image36 from '@assets/gallery/image36.webp'
import image37 from '@assets/gallery/image37.webp'
import image38 from '@assets/gallery/image38.webp'
import image39 from '@assets/gallery/image39.webp'
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

// Nombre para los textos alternativos de la galería
const N = 'Ivan Colman'

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

  // Estadísticas — 
  seasonStats: [
    { label: 'Asistencias',     value: 21, featured: true,
      caption: 'Asistencias en la temporada',
      text: 'El número que mejor lo define: hacer jugar al equipo.' },
    { label: 'Partidos',        value: 63,       order: 1 },
    { label: 'Minutos jugados', value: "3.641'", order: 3, wide: true },
    { label: 'Valoración promedio', value: 8.9,  order: 4, tone: 'gold' },
    { label: 'Goles',           value: 13,       order: 2 },
    { label: 'Tiros al arco',   value: 14,       order: 5 },
  ],
  featuredImage: colman_stats,

  clubs: [
    {
      name: 'Cusco F.C.',
      country: 'Perú',
      years: '2024 — Actualidad',
      logo: cusco,
      titles: [],
      info: 'Jugador con más asistencias · Temporada 2025',
    },
    {
      name: 'Quilmes',
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
      info: '',
      note: 'Inferiores',
    },

  ],

  // Videos — diseño "Programa": uno en pantalla y la lista para cambiarlo.
  //  title   → título grande · text → una línea de contexto
  //  year / league / club → ficha del video (club: por defecto currentClub)
  videos: [
    {
      id: 'v2',
      instagramId: 'DPP_syMDWD5',
      title: 'Asistencias',
      category: 'Asistencias',
      text: 'Una por una, las asistencias que lo pusieron arriba en la Liga 1.',
      year: 2025,
      league: 'Liga 1',
      cover: image2,
    },
    {
      id: 'v3',
      instagramId: 'DVjGHikDaUC',
      title: "Highlights '25",
      category: 'Highlights',
      text: 'Jugadas destacadas de su temporada 2025 con Cusco F.C.',
      year: 2025,
      league: 'Liga 1',
      cover: image10,
    },
    {
      id: 'v4',
      instagramId: 'DCmfAbFpTpl',
      title: "Highlights '24",
      category: 'Highlights',
      text: 'Su primera temporada en Cusco F.C., en la Liga 1 de Perú.',
      year: 2024,
      league: 'Liga 1',
      cover: image4,
    },
  ],

  // Galería — diseño "Carriles": una fila por galería, todas a la vista.
  //  shape → forma de la foto en el carril: 'tall' | 'square' | 'wide' (según su proporción)
  //  pos   → objectPosition, para no cortar la cara
  //  Las primeras fotos de cada galería son las que se ven sin deslizar: poner ahí las mejores.
  galleries: [
    {
      key: 'cusco',
      name: 'Cusco F.C.',
      description: 'Liga 1 con Cusco F.C., desde 2024.',
      logo: cusco,
      photos: [
      { src: image37, alt: `${N} festeja un gol con Cusco F.C.`, pos: 'center 28%', shape: 'tall' },
      { src: image30, alt: `La camiseta 10 de ${N} en el vestuario de Cusco F.C.`, pos: 'center 22%', shape: 'tall' },
      { src: image29, alt: `${N} hace un corazón con las manos al festejar`, pos: 'center 16%', shape: 'tall' },
      { src: image32, alt: 'Formación de Cusco F.C. antes de un partido de la Liga 1', pos: 'center 45%', shape: 'square' },
      { src: image28, alt: `${N} corre a festejar con los brazos abiertos`, pos: 'center 25%', shape: 'tall' },
      { src: image1, alt: `Retrato de ${N} con la camiseta de Cusco F.C.`, pos: 'center 25%', shape: 'tall' },
      { src: image31, alt: `${N} conduce la pelota con la camiseta blanca de Cusco F.C.`, pos: 'center 45%', shape: 'tall' },
      { src: image35, alt: `${N} llega al estadio con Cusco F.C.`, pos: 'center 18%', shape: 'tall' },
      { src: image33, alt: `${N} encara a un rival en la Liga 1`, pos: 'center 45%', shape: 'wide' },
      { src: image2, alt: `${N} de espaldas con la 10 de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image36, alt: `${N} corre a buscar la pelota`, pos: 'center 40%', shape: 'wide' },
      { src: image4, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image6, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image38, alt: `${N}, capitán de Cusco F.C., en el sorteo con el árbitro`, pos: 'center 35%', shape: 'wide' },
      { src: image7, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image8, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image9, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image10, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'square' },
      { src: image11, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'square' },
      { src: image12, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image13, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image14, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image15, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image16, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image17, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'square' },
      { src: image18, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'square' },
      { src: image3, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'tall' },
      { src: image5, alt: `${N} en un partido de Cusco F.C.`, pos: 'center 30%', shape: 'wide' },
      ],
    },
    {
      key: 'libertadores',
      name: 'Copa Libertadores',
      description: 'Cusco F.C. ante Flamengo, por la Copa Libertadores.',
      logo: cusco,
      photos: [
      { src: image34, alt: `${N} encara entre dos jugadores de Flamengo`, pos: 'center 45%', shape: 'wide' },
      { src: image39, alt: `${N} con Cusco F.C. en la Copa Libertadores`, pos: 'center 22%', shape: 'tall' },
      { src: image27, alt: `${N} le pega a la pelota ante la marca de un jugador de Flamengo`, pos: 'center 35%', shape: 'tall' },
      { src: image19, alt: `${N} disputa la pelota ante Flamengo`, pos: 'center 40%', shape: 'square' },
      ],
    },
    {
      key: 'quilmes',
      name: 'Quilmes',
      description: 'Su etapa en Quilmes, entre 2022 y 2023.',
      logo: escudoQuilmes,
      photos: [
      { src: image23, alt: `${N} patea un tiro de esquina con Quilmes`, pos: 'center 30%', shape: 'tall' },
      { src: image21, alt: `${N} con la camiseta de Quilmes`, pos: 'center 35%', shape: 'wide' },
      { src: image24, alt: `${N} en un partido de Quilmes`, pos: 'center 30%', shape: 'tall' },
      { src: image22, alt: `${N} en un partido de Quilmes`, pos: 'center 40%', shape: 'wide' },
      { src: image25, alt: `${N} en un partido de Quilmes`, pos: 'center 40%', shape: 'wide' },
      ],
    },
  ],

  // Prensa — diseño "Zócalo": cada nota como el gráfico de una transmisión.
  //  title    → titular del zócalo (texto limpio, sin letras Unicode ni emojis)
  //  quote    → texto de la publicación (queda como referencia; no se muestra)
  //  stat     → dato del recuadro dorado · image/pos → foto de fondo y su encuadre
  //  featured → la nota que se ve primero
  press: [
    {
      media: 'Liga1 Max',
      logo:  logo3,
      type:  'Publicación en Instagram',
      date:  'Marzo 2026',
      url:   'https://www.instagram.com/p/DVjGHikDaUC/',
      title: 'Director de orquesta',
      quote: 'Iván Colman lidera el torneo con 328 pases completados y una precisión del 85,19%.',
      stat:  { value: '328', label: 'pases completados' },
      image: image33,
      pos:   'center 40%',
    },
    {
      media: 'OneFootball',
      logo:  logo1,
      type:  'Publicación en Instagram',
      date:  'Diciembre 2025',
      url:   'https://www.instagram.com/p/DS79VnxDv5p/',
      title: 'El más asistidor de los últimos 5 años de la Liga 1',
      quote: 'Todo equipo necesita al jugador de los buenos pases, y Cusco tiene a Iván Colman. Con 31 asistencias, se convirtió en el jugador más asistidor de los últimos 5 años de la Liga 1.',
      stat:  { value: '31', label: 'asistencias' },
      image: image28,
      pos:   'center 8%',
      featured: true,
    },
    {
      media: 'Liga 1 TeApuesto',
      logo:  logo3,
      type:  'Publicación en Instagram',
      date:  'Julio 2025',
      url:   'https://www.instagram.com/p/DbELHTxEja7/',
      title: 'El conductor elegido de la fecha',
      quote: 'Iván Colman es el Jugador al Volante de la Fecha 1 tras su gol y asistencia en la victoria de Cusco FC.',
      stat:  { value: 'F1', label: 'jugador de la fecha' },
      image: image37,
      pos:   'center 18%',
    },
  ],

  // Contacto — diseño "Tarjetas":
  //  socialMedia → una tarjeta por red (icon = ícono del chip y de la marca de agua, note = aclaración)
  //  contact     → una tarjeta por representante (forWhom = "Escribile por…", cta = texto del botón)
  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      handle: '@ivan_colman8',
      note: 'Su cuenta personal',
      url: 'https://www.instagram.com/ivan_colman8/',
      hoverColor: '#E1306C',
    },
    {
      label: 'Transfermarkt',
      icon: IoMdStats,
      image: transfermkt,
      handle: '/ivan-colman',
      note: 'Ficha y valor de mercado',
      url: 'https://www.transfermarkt.com.ar/ivan-colman/profil/spieler/380603',
      hoverColor: '#2E73F2',
    },
  ],

  contact: [
    {
      title:   'Representación deportiva',
      label:   'Moon Sports Group',
      image:   moon,
      handle:  '@moonsportsgroup_',
      url:     'https://www.instagram.com/moonsportsgroup_/',
      forWhom: 'clubes, intermediarios y propuestas deportivas.',
      cta:     'Escribir a Moon Sports Group',
    },
    {
      title:   'Marketing y marcas',
      label:   'LED Sports Marketing',
      image:   ledsports,
      handle:  '@_ledsports',
      url:     'https://www.instagram.com/_ledsports/',
      forWhom: 'marcas, campañas, eventos y prensa.',
      cta:     'Escribir a LED Sports',
    },
  ],
}
