import { extendTheme } from '@chakra-ui/react'


// ─── PALETA OSCURA — Cusco FC (camiseta oscura + dorado)
const brandDark = {
  brown:      '#1A1612', // negro opaco mate (fondo camiseta)
  brownDark:  '#0F0D0A', // negro más oscuro
  brownLight: '#2A2620', // negro opaco más claro
  amber:      '#D4A574', // dorado/crema (color principal)
  amber2:     '#D4A5748e',
  amberDark:  '#A67C4A', // dorado oscuro
  amberLight: '#D4A57450', // dorado translúcido (bordes suaves)
  dorado:     '#E8B560', // dorado más luminoso (acentos)
  orange:     '#C99456', // dorado cálido (hover botones)
  orangeDark: '#9E6F3F', // dorado oscuro
  orangeLight:'#D9A563', // dorado claro
  dark:       '#1A16129f', // fondo negro opaco (mantener alpha)
  dark3:      '#1A1612a1',
  dark2:      '#6B6560', // divisores gris/marrón
  gray:       '#9A8F85', // marrón apagado (texto secundario)
  gray2:      '#4A4440', // marrón oscuro (números grandes/relleno)
  bone:       '#FFFFFF', // texto principal
  boneWarm:   '#E8D5C3', // crema cálido (detalles)
  rec:        '#FF4D4D', // rojo del indicador REC
  bgRef:      '#D4A57420', // bg de hover en cajas
}

// ─── PALETA CLARA — Cusco FC (dorado/crema + negro opaco)
const brandLight = {
  brown:      '#FCF7F0', // superficie clara (tarjetas/nodos) — crema claro
  brownDark:  '#E8D5C3', // dorado más oscuro (sombras suaves)
  brownLight: '#1A1612', // negro opaco (texto de apoyo)
  amber:      '#1A1612', // negro opaco del escudo (bordes/títulos)
  amber2:     '#1A16128e',
  amberDark:  '#0F0D0A', // negro más oscuro
  amberLight: '#1A161240', // negro translúcido (bordes suaves)
  dorado:     '#D4A574', // dorado (acentos destacados)
  orange:     '#A67C4A', // dorado oscuro (hover botones)
  orangeDark: '#7B5A2F', // dorado muy oscuro
  orangeLight:'#C99456', // dorado más claro
  dark:       '#FCF7F0', // fondo crema claro
  dark3:      '#F5EFE8',
  dark2:      '#D4A574', // divisores dorado
  gray:       '#8B7355', // marrón grisáceo (texto secundario)
  gray2:      '#B8A485', // marrón más claro (números grandes/relleno)
  bone:       '#1A1612', // texto principal (negro opaco)
  boneWarm:   '#1A1612', // negro opaco (detalles/labels)
  rec:        '#E63946', // rojo del indicador REC
  bgRef:      '#D4A57410', // bg de hover en cajas
}


// Elegí la paleta de la landing:
const PALETTE = 'light'

const brand =
  PALETTE === 'light' ? brandLight :
  brandDark

// Colores de la firma del desarrollador (crédito en el footer)
const dev = {
  green: '#2D5A47',
  cream: '#E8D5A3',
}

const theme = extendTheme({
  colors: { brand, dev },
  fonts: {
    heading:   'Nippo',
    body:      `Nippo`,
    mono:      `Nippo`,
  },
  styles: {
    global: {
      'html, body': {
        bg: brand.dark,
        color: brand.bone,
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: brand.dark },
      '::-webkit-scrollbar-thumb': { bg: brand.amber, borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
