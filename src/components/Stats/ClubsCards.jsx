import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Flex, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { playerData } from '../../data/playerData.js'

// ─── Trayectoria en tarjetas (vitrina horizontal) ──────────────────
// Las flechas mueven el riel con scrollTo (nunca scrollIntoView, que
// desplaza toda la página). La entrada la coordina StatsSection.

const HOVER = '@media (hover: hover) and (pointer: fine)'
const GAP = 16

function Achievement({ children, outline }) {
  return (
    <Text
      fontFamily="heading"
      fontWeight={500}
      fontSize="11px"
      lineHeight={1.45}
      color="brand.bone"
      textAlign="center"
      _before={{
        content: '""',
        display: 'inline-block',
        w: '7px',
        h: '7px',
        mr: '7px',
        borderRadius: 'full',
        verticalAlign: '1px',
        bg: outline ? 'transparent' : 'brand.orange',
        border: outline ? '1.5px solid' : 'none',
        borderColor: 'brand.orange',
      }}
    >
      {children}
    </Text>
  )
}

function ClubCard({ club, index, total, isActive }) {
  const info = (Array.isArray(club.info) ? club.info : [club.info]).filter(Boolean)
  return (
    <Box
      as="article"
      className="st-reveal"
      w={{ base: '230px', md: '260px' }}
      flexShrink={0}
      scrollSnapAlign="start"
      bg="brand.dark"
      border="1px solid"
      borderColor={isActive ? 'brand.amber' : 'brand.amberLight'}
      borderRadius="6px"
      overflow="hidden"
      position="relative"
      transition="transform .35s cubic-bezier(0.23,1,0.32,1), border-color .35s, box-shadow .35s"
      sx={{
        [HOVER]: {
          '&:hover': { transform: 'translateY(-6px)', borderColor: 'brand.amber', boxShadow: '0 18px 40px rgba(26,22,18,0.12)' },
        },
      }}
    >
      {/* Banda: período + nº de etapa */}
      <Flex justify="space-between" align="center" px={4} py={3}
            borderBottom="1px solid" borderColor="brand.amberLight"
            bg={isActive ? 'rgba(212,165,116,0.16)' : 'transparent'}>
        <Text fontFamily="mono" fontSize="10px" letterSpacing="0.18em" textTransform="uppercase"
              color={isActive ? 'brand.rec' : 'brand.gray'}>
          {club.years}
        </Text>
        <Text fontFamily="heading" fontWeight={700} fontSize="10px" letterSpacing="0.1em" color="brand.gray2">
          {String(total - index).padStart(2, '0')}
        </Text>
      </Flex>

      {/* Cuerpo */}
      <VStack spacing={0} px={4} pt={5} pb={6} minH="200px" position="relative">
        <Image aria-hidden="true" src={club.logo} alt="" position="absolute" right="-50px" bottom="-60px"
               boxSize="220px" objectFit="contain" opacity={0.06} filter="grayscale(1)"
               pointerEvents="none" draggable={false} />
        <Flex boxSize="84px" borderRadius="full" align="center" justify="center" position="relative"
              bg="brand.dark" border="1px solid" borderColor="brand.amber"
              boxShadow={isActive ? '0 0 0 4px #E8D5C3, 0 0 24px rgba(212,165,116,0.45)' : 'none'}>
          <Image src={club.logo} alt={`Escudo de ${club.name}`} boxSize="52px" objectFit="contain" loading="lazy" />
        </Flex>
        <Text mt={4} fontFamily="heading" fontWeight={700} fontSize="15px" lineHeight={1.1}
              textTransform="uppercase" color="brand.bone" textAlign="center">
          {club.name}
        </Text>
        <Text mt={1.5} fontFamily="mono" fontSize="10px" letterSpacing="0.2em" textTransform="uppercase"
              color="brand.gray" textAlign="center">
          {club.note ? `${club.country} · ${club.note}` : club.country}
        </Text>
        {(club.titles.length > 0 || info.length > 0) && (
          <VStack spacing={1.5} mt={3.5} position="relative">
            {club.titles.map((t) => <Achievement key={t}>{t}</Achievement>)}
            {info.map((line) => <Achievement key={line} outline>{line}</Achievement>)}
          </VStack>
        )}
      </VStack>
    </Box>
  )
}

export function ClubsCards() {
  const railRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const { clubs } = playerData

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const move = (dir) => {
    const el = railRef.current
    if (!el) return
    const card = el.querySelector('article')
    const step = card ? (card.offsetWidth + GAP) * 2 : 300
    el.scrollTo({ left: el.scrollLeft + dir * step, behavior: 'smooth' })
  }

  const arrowProps = {
    variant: 'unstyled',
    minW: '38px',
    h: '38px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'brand.amber',
    color: 'brand.bone',
    transition: 'background .25s, opacity .25s',
    _disabled: { opacity: 0.3, cursor: 'default' },
    _focusVisible: { outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '3px' },
    sx: { [HOVER]: { '&:not(:disabled):hover': { bg: 'rgba(212,165,116,0.18)' } } },
  }

  return (
    <Box mt={{ base: 16, md: 20 }} sx={{ overflow: 'clip' }}>
      <Flex align="flex-end" justify="space-between" gap={4} className="st-reveal">
        <Box>
          <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="0.28em">
            Trayectoria
          </Text>
          <Text as="h3" fontFamily="heading" fontWeight="bold" fontSize={{ base: '4xl', lg: '5xl' }}
                color="brand.amber" lineHeight={1} mt={2}>
            Clubes
          </Text>
        </Box>
        <HStack spacing={2}>
          <IconButton aria-label="Clubes anteriores" icon={<FiChevronLeft size={18} />}
                      isDisabled={edges.start} onClick={() => move(-1)} {...arrowProps} />
          <IconButton aria-label="Clubes siguientes" icon={<FiChevronRight size={18} />}
                      isDisabled={edges.end} onClick={() => move(1)} {...arrowProps} />
        </HStack>
      </Flex>

      <Flex
        ref={railRef}
        mt={{ base: 6, md: 7 }}
        gap={`${GAP}px`}
        overflowX="auto"
        pt={2}
        pb={4}
        px="2px"
        tabIndex={0}
        role="region"
        aria-label="Clubes de la carrera"
        onScroll={sync}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
        }}
        _focusVisible={{ outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '4px', borderRadius: '8px' }}
        sx={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {clubs.map((club, i) => (
          <ClubCard key={`${club.name}-${club.years}`} club={club} index={i} total={clubs.length} isActive={i === 0} />
        ))}
      </Flex>
    </Box>
  )
}

export default ClubsCards
