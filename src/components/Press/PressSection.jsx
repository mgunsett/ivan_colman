import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import useScrubReveal from '../../hooks/useScrubReveal'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'
const REDUCED = '@media (prefers-reduced-motion: reduce)'
const SWAP_MS = 180

const glass = (bg, blur = 12) => ({
  background: bg,
  backdropFilter: `blur(${blur}px) saturate(1.1)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(1.1)`,
})

function Zocalo({ note, wiping }) {
  return (
    <Box
      position="absolute"
      zIndex={2}
      left={{ base: 3, md: 5, lg: 10 }}
      right={{ base: 3, lg: 'auto' }}
      bottom={{ base: 3, md: 5, lg: 9 }}
      maxW={{ lg: 'calc(100% - 80px)' }}
      display="grid"
      gridTemplateColumns="auto minmax(0,1fr) auto"
      alignItems="stretch"
      sx={{
        clipPath: wiping ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)',
        transition: wiping ? 'none' : `clip-path .32s ${EASE}`,
        [REDUCED]: { clipPath: 'none', opacity: wiping ? 0 : 1, transition: wiping ? 'none' : 'opacity .2s ease' },
      }}
    >
      {/* Logo del medio */}
      <Flex
        align="center"
        justify="center"
        w={{ base: '48px', md: '64px', lg: '76px' }}
        borderLeftRadius="10px"
        sx={glass('rgba(252,247,240,0.88)')}
      >
        <Image src={note.logo} alt="" boxSize={{ base: '30px', md: '40px', lg: '46px' }} objectFit="contain" />
      </Flex>

      {/* Medio, link y titular */}
      <Flex direction="column" justify="center" minW={0} px={{ base: 3, md: '22px' }} py={{ base: '11px', md: '14px' }}
            color="#FCF7F0" sx={glass('rgba(26,22,18,0.48)', 14)}>
        <Flex align="center" gap={{ base: 2.5, md: 3.5 }} wrap="wrap">
          <Text fontFamily="body" fontWeight={500} fontSize={{ base: '11px', md: '12px' }} lineHeight={1} color="#E8D5C3">
            {note.media}, {note.date.toLowerCase()}
          </Text>
          <Box
            as="a"
            href={note.url}
            target="_blank"
            rel="noopener noreferrer"
            fontFamily="heading"
            fontWeight={700}
            fontSize={{ base: '11px', md: '12px' }}
            lineHeight={1}
            color="brand.dorado"
            pb="4px"
            borderBottom="1.5px solid"
            borderColor="rgba(212,165,116,0.5)"
            transition="border-color .2s ease"
            _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '4px' }}
            sx={{ [HOVER]: { '&:hover': { borderColor: 'brand.dorado' } } }}
          >
            Ver la publicación
          </Box>
        </Flex>
        <Text
          as="h3"
          mt={{ base: '6px', md: 2 }}
          fontFamily="heading"
          fontWeight={700}
          fontSize={{ base: '16px', md: '22px', lg: 'clamp(20px, 2.1vw, 30px)' }}
          lineHeight={1}
          letterSpacing="-0.005em"
          textTransform="uppercase"
          color="#FCF7F0"
          textShadow="0 1px 12px rgba(0,0,0,0.25)"
        >
          {note.title}
        </Text>
      </Flex>

      {/* Dato de la nota */}
      {note.stat && (
        <Flex
          direction="column"
          justify="center"
          align="flex-start"
          gap={{ base: '3px', md: '5px' }}
          minW={{ md: '140px' }}
          px={{ base: 3, md: 5 }}
          py={{ base: '10px', md: 3 }}
          borderRightRadius="10px"
          color="brand.amber"
          sx={glass('rgba(212,165,116,0.9)')}
        >
          <Text fontFamily="heading" fontWeight={700} fontSize={{ base: '24px', md: '36px' }} lineHeight={0.9} letterSpacing="-0.02em">
            {note.stat.value}
          </Text>
          <Text fontFamily="body" fontWeight={500} fontSize={{ base: '10px', md: '12px' }} lineHeight={1.1} maxW={{ base: '9ch', md: 'none' }}>
            {note.stat.label}
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default function PressSection() {
  const press = playerData.press ?? []
  const start = Math.max(0, press.findIndex((n) => n.featured))
  const [active, setActive] = useState(start) // canal elegido
  const [shown, setShown] = useState(start)   // nota pintada en pantalla
  const [wiping, setWiping] = useState(false)
  const timer = useRef(null)
  const tabsRef = useRef(null)

  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  // Una sola entrada coordinada: pantalla y canales suben y aparecen juntos.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.press-reveal')
        gsap.fromTo(items, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
          scrollTrigger: { trigger: items[0], start: 'top 85%', once: true },
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  // Con mouse o dedo: barrido del zócalo y fundido de la foto.
  // Con teclado: cambio inmediato (es una acción repetida, tiene que sentirse al instante).
  const select = (i, { animate = true } = {}) => {
    if (i === active) return
    setActive(i)
    clearTimeout(timer.current)
    if (!animate) { setWiping(false); setShown(i); return }
    setWiping(true)
    timer.current = setTimeout(() => { setShown(i); setWiping(false) }, SWAP_MS)
  }

  const onKeyDown = (e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!d) return
    e.preventDefault()
    const n = (active + d + press.length) % press.length
    select(n, { animate: false })
    const tab = tabsRef.current?.children[n]
    tab?.focus()
    if (tabsRef.current && tab) tabsRef.current.scrollTo({ left: tab.offsetLeft - 16 })
  }

  if (!press.length) return null
  const note = press[shown]

  return (
    <Box
      as="section"
      id="prensa"
      ref={sectionRef}
      aria-labelledby="prensa-title"
      bg="brand.dark"
      // La sección ocupa exactamente un viewport: el padding superior deja
      // lugar al navbar fijo y la pantalla se estira para llenar el resto.
      display="flex"
      flexDirection="column"
      h="100svh"
      minH={{ base: '600px', md: '640px' }}
      pt={{ base: '76px', lg: '84px' }}
      pb={{ base: 6, lg: 8 }}
      px={{ base: 4, md: 8, lg: 10 }}
      sx={{ overflow: 'clip' }}
    >
      <Flex direction="column" flex="1" minH={0} w="100%" maxW="1400px" mx="auto">
        <Flex ref={headerRef} flexShrink={0} justify="space-between" align="flex-end" gap={{ base: 2, md: 6 }} wrap="wrap">
          <Box>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="0.28em">
              Medios
            </Text>
            <Text as="h2" id="prensa-title" fontFamily="heading" fontWeight="bold"
                  fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1} mt={{ base: 1, lg: 2 }}>
              Prensa
            </Text>
          </Box>
          
        </Flex>

        {/* Pantalla */}
        <Box
          className="press-reveal"
          id="prensa-pantalla"
          role="tabpanel"
          aria-labelledby={`prensa-canal-${active}`}
          aria-live="polite"
          position="relative"
          mt={{ base: 4, lg: 6 }}
          w="100%"
          flex="1 1 auto"
          minH={{ base: '260px', md: '300px' }}
          borderRadius="14px"
          overflow="hidden"
          bg="brand.amber"
          sx={{ isolation: 'isolate' }}
        >
          <Image
            src={note.image}
            alt={`${playerData.displayName}, foto de la nota de ${note.media}`}
            position="absolute"
            inset={0}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition={note.pos ?? 'center'}
            draggable={false}
            sx={{
              filter: wiping ? 'grayscale(1) blur(6px) brightness(.82)' : 'grayscale(1) contrast(1.08) brightness(.82)',
              opacity: wiping ? 0 : 1,
              transition: `opacity .45s ${EASE}, filter .45s ${EASE}`,
              [REDUCED]: { filter: 'grayscale(1) brightness(.82)', transition: 'opacity .2s ease' },
            }}
          />
          <Box position="absolute" inset={0} zIndex={1} pointerEvents="none" bg="linear-gradient(180deg, transparent 60%, rgba(26,22,18,0.32) 100%)" />
          <Zocalo note={note} wiping={wiping} />
        </Box>

        {/* Canales */}
        <Box
          ref={tabsRef}
          className="press-reveal"
          role="tablist"
          aria-label="Medios"
          onKeyDown={onKeyDown}
          flexShrink={0}
          mt={3}
          display="grid"
          gridTemplateColumns={{ md: `repeat(${press.length}, 1fr)` }}
          gridAutoFlow={{ base: 'column', md: 'row' }}
          gridAutoColumns={{ base: '78%', md: 'auto' }}
          gap="10px"
          overflowX={{ base: 'auto', md: 'visible' }}
          mr={{ base: -4, md: 0 }}
          pr={{ base: 4, md: 0 }}
          sx={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {press.map((n, i) => {
            const on = i === active
            return (
              <Box
                key={n.url + i}
                as="button"
                type="button"
                role="tab"
                id={`prensa-canal-${i}`}
                aria-selected={on}
                aria-controls="prensa-pantalla"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                position="relative"
                display="flex"
                alignItems="center"
                gap={3.5}
                px="18px"
                py={3}
                textAlign="left"
                borderRadius="12px"
                border="1px solid"
                borderColor={on ? 'brand.amber' : 'brand.amberLight'}
                bg={on ? 'brand.amber' : 'brand.dark'}
                color={on ? 'brand.dark' : 'brand.bone'}
                scrollSnapAlign="start"
                transition={`border-color .2s ease, background .2s ease, transform .16s ${EASE}`}
                _active={{ transform: 'scale(0.97)' }}
                _focusVisible={{ outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '3px' }}
                _after={on ? {
                  content: '""', position: 'absolute', left: '18px', right: '18px', top: '-1px', h: '3px',
                  borderBottomRadius: '3px', bg: 'brand.dorado',
                } : undefined}
                sx={{ [HOVER]: on ? {} : { '&:hover': { borderColor: 'brand.amber' } } }}
              >
                <Image src={n.logo} alt="" boxSize="36px" objectFit="contain" borderRadius="8px" bg="white"
                       border="1px solid" borderColor="brand.amberLight" p="3px" flexShrink={0} />
                <Box minW={0}>
                  <Text fontFamily="heading" fontWeight={700} fontSize="14px" lineHeight={1.1} noOfLines={1}>{n.media}</Text>
                  <Text mt="5px" fontFamily="body" fontSize="12px" lineHeight={1} color={on ? 'brand.gray2' : 'brand.gray'}>
                    {n.date}
                  </Text>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Flex>
    </Box>
  )
}
