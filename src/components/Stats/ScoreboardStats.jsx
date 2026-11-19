import { Box, Flex, Grid, Image, SimpleGrid, Text, useToken } from '@chakra-ui/react'
import { playerData } from '../../data/playerData.js'
import useSeasonStats from '../../hooks/useSeasonStats'
import { seasonTiles } from '../../lib/seasonTiles'

const HOVER = '@media (hover: hover) and (pointer: fine)'

const tileBase = {
  position: 'relative',
  border: '1px solid',
  borderColor: 'brand.amberLight',
  borderRadius: { base: '14px', md: '16px' },
  p: { base: '18px', md: '22px 24px' },
  minH: { base: '130px', md: '160px', lg: '190px' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
}

function Label({ children, color = 'brand.gray', ...rest }) {
  return (
    <Text
      fontFamily="mono"
      fontSize={{ base: '9px', md: '10px' }}
      fontWeight={500}
      letterSpacing="0.2em"
      textTransform="uppercase"
      lineHeight={1.3}
      color={color}
      {...rest}
    >
      {children}
    </Text>
  )
}

function CardTitle({ children }) {
  return (
    <Text as="h3" fontFamily="heading" fontWeight={700} fontSize="15px"
          letterSpacing="0.24em" textTransform="uppercase" color="brand.bone">
      {children}
    </Text>
  )
}

// ─── Recuadro destacado ────────────────────────────────────────────
function FeaturedTile({ stat }) {
  return (
    <Box
      className="st-reveal"
      {...tileBase}
      gridColumn={{ base: 'span 2', lg: 'auto' }}
      gridRow={{ lg: 'span 2' }}
      minH={{ base: '360px', md: '380px', lg: 'auto' }}
      bg="brand.amber"
      borderColor="brand.amber"
      color="brand.dark"
      p={{ base: '24px 22px', md: '30px 28px' }}
    >
      <Text
        fontFamily="heading"
        fontWeight={700}
        fontSize={{ base: '120px', md: '140px', lg: '150px' }}
        lineHeight={0.9}
        letterSpacing="-0.03em"
        color="brand.dorado"
        position="relative"
        zIndex={2}
      >
        {stat.value}
      </Text>
      <Box position="relative" zIndex={2} maxW={{ base: '58%', md: '50%', lg: '60%' }}>
        <Text fontFamily="heading" fontWeight={700} fontSize="15px" lineHeight={1.2} color="brand.dark">
          {stat.caption ?? stat.label}
        </Text>
        
      </Box>
      {playerData.featuredImage && (
        <Image
          src={playerData.featuredImage}
          alt={`${playerData.shortName ?? playerData.displayName} de espaldas, con la ${playerData.number} de ${playerData.currentClub}`}
          loading="lazy"
          position="absolute"
          right={{ base: '-5%', md: '0%', lg: '0%' }}
          bottom={0}
          h={{ base: '84%', md: '94%', lg: '86%' }}
          w="auto"
          maxW="none"
          zIndex={1}
          pointerEvents="none"
          draggable={false}
          filter="drop-shadow(0 20px 30px rgba(0,0,0,0.45))"
        />
      )}
      {/* Fundido para que el texto se lea sobre la foto */}
      <Box position="absolute" inset={0} zIndex={1} pointerEvents="none"
           bgGradient="linear(to-r, brand.amber 22%, rgba(26,22,18,0.2) 60%, transparent)" />
    </Box>
  )
}

function StatTile({ stat }) {
  const gold = stat.tone === 'gold'
  return (
    <Box
      className="st-reveal"
      {...tileBase}
      gridColumn={stat.wide ? 'span 2' : 'auto'}
      order={{ base: stat.order ?? 0, lg: 0 }}
      bg={gold ? 'brand.dorado' : 'brand.dark'}
      borderColor={gold ? 'brand.dorado' : 'brand.amberLight'}
      transition="border-color .3s cubic-bezier(0.23,1,0.32,1)"
      sx={{ [HOVER]: { '&:hover': { borderColor: gold ? 'brand.dorado' : 'brand.orange' } } }}
    >
      <Text
        fontFamily="heading"
        fontWeight={700}
        fontSize={{ base: '44px', md: '56px', lg: '64px' }}
        lineHeight={0.9}
        letterSpacing="-0.03em"
        color="brand.bone"
        sx={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {stat.value}
      </Text>
      <Label mt={3.5} color={gold ? 'brand.amber' : 'brand.gray'}>{stat.label}</Label>
    </Box>
  )
}

// ─── Perfil ──────────────────────────────────────────────────────
function ProfileCard() {
  const items = [
    { label: 'Posición', value: playerData.position },
    { label: 'Pie hábil', value: playerData.foot },
    { label: 'Edad', value: `${playerData.age} años` },
    { label: 'Altura y peso', value: `${playerData.height} · ${playerData.weight}` },
    { label: 'Origen', value: playerData.birthPlace, icon: playerData.nationalityFlag },
    { label: 'Club actual', value: playerData.currentClub, icon: playerData.logoCurrentClub },
  ]
  return (
    <Box className="st-reveal" border="1px solid" borderColor="brand.amberLight"
         borderRadius="16px" p={{ base: '22px 20px', md: '28px' }} position="relative" overflow="hidden">
      {/* Dorsal en contorno: llena el espacio libre cuando la tarjeta crece a la par del radar */}
      <Text aria-hidden="true" display={{ base: 'none', lg: 'block' }} position="absolute" right="-24px" bottom="-58px"
            fontFamily="heading" fontWeight={700} fontSize="250px" lineHeight={1} letterSpacing="-0.04em"
            color="transparent" pointerEvents="none" opacity="0.5" userSelect="none"
            sx={{ WebkitTextStroke: '1.5px', WebkitTextStrokeColor: 'var(--chakra-colors-brand-dorado)' }}>
        {playerData.number}
      </Text>
      <CardTitle>Perfil</CardTitle>
      <Grid as="dl" templateColumns="1fr 1fr" gap={{ base: '20px 16px', md: '22px 24px' }} mt={6}>
        {items.map((it) => (
          <Box key={it.label}>
            <Label as="dt">{it.label}</Label>
            <Flex as="dd" align="center" gap={2} mt={2}
                  fontFamily="heading" fontWeight={700} fontSize={{ base: '14px', md: '15px' }}
                  lineHeight={1.25} color="brand.bone">
              {it.icon && <Image src={it.icon} alt="" boxSize="18px" objectFit="contain" flexShrink={0} />}
              {it.value}
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

// ─── Atributos: radar + lista ────────────────────────────────────
const CX = 150
const CY = 150
const R = 110

function Radar({ stats }) {
  const [ink, accent, muted] = useToken('colors', ['brand.amber', 'brand.orange', 'brand.gray'])
  const n = stats.length
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
  }
  const ring = (f) => stats.map((_, i) => pt(i, R * f).join(',')).join(' ')
  const shape = stats.map((s, i) => pt(i, (R * s.value) / 100).join(',')).join(' ')

  return (
    <Box
      as="svg"
      viewBox="0 0 300 300"
      w="100%"
      maxW={{ base: '240px', md: '300px' }}
      mx="auto"
      display="block"
      overflow="visible"
      role="img"
      aria-label={`Atributos de ${playerData.displayName}: ${stats.map((s) => `${s.label} ${s.value}`).join(', ')}`}
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(f)} fill="none" stroke={ink} strokeOpacity={f === 1 ? 0.3 : 0.12} />
      ))}
      {stats.map((_, i) => {
        const [x, y] = pt(i, R)
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke={ink} strokeOpacity={0.1} />
      })}
      <g className="radar-shape" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <polygon points={shape} fill={accent} fillOpacity={0.22} stroke={accent} strokeWidth={2} />
        {stats.map((s, i) => {
          const [x, y] = pt(i, (R * s.value) / 100)
          return <circle key={s.label} cx={x} cy={y} r={4} fill={ink} />
        })}
      </g>
      {stats.map((s, i) => {
        const [x, y] = pt(i, R + 20)
        const anchor = Math.abs(x - CX) < 5 ? 'middle' : x > CX ? 'start' : 'end'
        return (
          <text key={s.label} x={x} y={y + 4} textAnchor={anchor} fontFamily="Nippo" fontSize="9"
                fontWeight="500" letterSpacing="1" fill={muted}>
            {s.label.toUpperCase()}
          </text>
        )
      })}
    </Box>
  )
}

function AttributesCard() {
  const { stats } = playerData
  return (
    <Box className="st-reveal" border="1px solid" borderColor="brand.amberLight"
         borderRadius="16px" p={{ base: '22px 20px', md: '28px' }}>
      <CardTitle>Atributos</CardTitle>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 6, md: 7 }}
            alignItems="center" mt={{ base: 6, md: 4 }}>
        <Box px={{ base: 10, md: 8, lg: 6 }}><Radar stats={stats} /></Box>
        <Box as="ul" listStyleType="none" m={0}>
          {stats.map((s) => (
            <Flex as="li" key={s.label} justify="space-between" align="baseline" py="11px"
                  borderBottom="1px solid" borderColor="brand.amberLight"
                  sx={{ '&:last-of-type': { borderBottom: 0 } }}>
              <Label>{s.label}</Label>
              <Text fontFamily="heading" fontWeight={700} fontSize="22px" lineHeight={1} color="brand.orange">
                {s.value}
              </Text>
            </Flex>
          ))}
        </Box>
      </Grid>
    </Box>
  )
}

// Cómo se dibuja cada dato de la API en el marcador: el destacado
// (Asistencias, con el texto de playerData), el ancho y el dorado.
const STATIC_FEATURED = playerData.seasonStats.find((s) => s.featured)
const TILE_STYLE = {
  Partidos: { order: 1 },
  Goles: { order: 2 },
  Minutos: { label: 'Minutos jugados', order: 3, wide: true },
  Valoración: { label: 'Valoración promedio', order: 4, tone: 'gold' },
  'Pases clave': { order: 5 },
  'Tiros al arco': { order: 5 },
}

function apiTiles(season) {
  return seasonTiles(season).map((t) =>
    STATIC_FEATURED && t.label === STATIC_FEATURED.label
      ? { ...STATIC_FEATURED, value: t.value }
      : { ...t, ...TILE_STYLE[t.label] }
  )
}

// ─── Bloque principal ────────────────────────────────────────────
export function ScoreboardStats() {
  // Temporada en curso desde API-Football; sin datos, los valores fijos.
  const season = useSeasonStats()
  const items = season ? apiTiles(season) : playerData.seasonStats
  const featured = items.find((s) => s.featured)
  const rest = items.filter((s) => !s.featured)

  return (
    <Box>
      <Grid
        templateColumns={{ base: '1fr 1fr', lg: '1.25fr 1fr 1fr 1fr' }}
        gridAutoRows={{ lg: 'minmax(190px, auto)' }}
        gap={{ base: 2, md: '10px' }}
      >
        {featured && <FeaturedTile stat={featured} />}
        {rest.map((s) => <StatTile key={s.label} stat={s} />)}
      </Grid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 2, md: '10px' }} mt={{ base: 2, md: '10px' }}
                  sx={{ '@media screen and (min-width: 62em)': { gridTemplateColumns: '1fr 1.35fr' } }}>
        <ProfileCard />
        <AttributesCard />
      </SimpleGrid>
    </Box>
  )
}

export default ScoreboardStats
