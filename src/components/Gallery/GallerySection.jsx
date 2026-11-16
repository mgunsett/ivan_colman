import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box, Flex, HStack, IconButton, Image, Modal, ModalContent, ModalOverlay, Text,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import useScrubReveal from '../../hooks/useScrubReveal'

gsap.registerPlugin(ScrollTrigger)

// ─── Galería: diseño "Carriles" ─────────────────────────────────────
// Una fila horizontal por galería (playerData.galleries), todas a la vista.
// Cada foto mantiene su forma (shape: tall | square | wide). Las flechas
// mueven el carril con scrollTo, nunca con scrollIntoView (que desplaza
// la página). Al tocar una foto se abre el visor de esa galería.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'
const plural = (n) => `${n} ${n === 1 ? 'foto' : 'fotos'}`

// Alto del carril y ancho de cada forma (proporción de la celda)
const RAIL_H = { base: 240, md: 280, lg: 340 }
const RATIO = { tall: 0.8, square: 1, wide: 1.5 }
const widthFor = (shape = 'square') => ({
  base: `${Math.round(RAIL_H.base * RATIO[shape])}px`,
  md: `${Math.round(RAIL_H.md * RATIO[shape])}px`,
  lg: `${Math.round(RAIL_H.lg * RATIO[shape])}px`,
})

const lbIn = keyframes`from { opacity: 0; transform: scale(0.985); } to { opacity: 1; transform: none; }`

const arrowStyle = {
  variant: 'unstyled',
  minW: { base: '34px', md: '38px' },
  h: { base: '34px', md: '38px' },
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

// ─── Visor ──────────────────────────────────────────────────────────
function Lightbox({ gallery, index, onClose, onGo }) {
  const isOpen = gallery != null
  const photos = gallery?.photos ?? []
  const photo = photos[index]
  const x0 = useRef(null)

  const go = useCallback((d) => {
    const n = index + d
    if (n >= 0 && n < photos.length) onGo(n)
  }, [index, photos.length, onGo])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, go])

  const btn = {
    variant: 'unstyled',
    minW: '46px',
    h: '46px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
    border: '1px solid rgba(252,247,240,0.3)',
    bg: 'rgba(26,22,18,0.5)',
    color: '#FCF7F0',
    _disabled: { opacity: 0.25, cursor: 'default' },
    _focusVisible: { outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' },
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="none">
      <ModalOverlay bg="rgba(26,22,18,0.95)" sx={{ backdropFilter: 'blur(10px)' }} />
      <ModalContent bg="transparent" boxShadow="none" m={0} aria-label="Foto ampliada">
        {photo && (
          <Box display="grid" gridTemplateRows="auto 1fr auto" gap={3.5} h="100svh"
               px={{ base: 4, md: 6 }} pt={{ base: 4, md: 5 }} pb={{ base: '76px', md: 6 }} color="#FCF7F0">
            <Flex justify="space-between" align="center">
              <Text fontFamily="heading" fontWeight={700} fontSize="14px" letterSpacing="0.08em" textTransform="uppercase">
                {gallery.name}
                <Text as="span" ml={2.5} fontWeight={500} fontSize="11px" letterSpacing="0.12em" color="brand.gray2">
                  {plural(photos.length)}
                </Text>
              </Text>
              <IconButton aria-label="Cerrar" icon={<FiX size={20} />} onClick={onClose} {...btn} />
            </Flex>

            <Box
              position="relative"
              display="grid"
              placeItems="center"
              minH={0}
              sx={{ touchAction: 'pan-y' }}
              onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
              onPointerDown={(e) => { x0.current = e.clientX }}
              onPointerUp={(e) => {
                if (x0.current !== null && Math.abs(e.clientX - x0.current) > 40) go(e.clientX < x0.current ? 1 : -1)
                x0.current = null
              }}
            >
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                maxW="100%"
                maxH="100%"
                objectFit="contain"
                borderRadius="8px"
                draggable={false}
                sx={{
                  animation: `${lbIn} .25s ${EASE}`,
                  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                }}
              />
              <IconButton aria-label="Foto anterior" icon={<FiChevronLeft size={20} />} onClick={() => go(-1)}
                          isDisabled={index === 0} position="absolute"
                          left={{ base: '30%', md: 0 }} top={{ md: '50%' }} bottom={{ base: '-62px', md: 'auto' }}
                          transform={{ md: 'translateY(-50%)' }} {...btn} />
              <IconButton aria-label="Foto siguiente" icon={<FiChevronRight size={20} />} onClick={() => go(1)}
                          isDisabled={index === photos.length - 1} position="absolute"
                          right={{ base: '30%', md: 0 }} top={{ md: '50%' }} bottom={{ base: '-62px', md: 'auto' }}
                          transform={{ md: 'translateY(-50%)' }} {...btn} />
            </Box>

            <Text textAlign="center" fontFamily="heading" fontWeight={500} fontSize="12px" letterSpacing="0.12em"
                  color="brand.gray2" aria-live="polite">
              {index + 1} de {photos.length}
            </Text>
          </Box>
        )}
      </ModalContent>
    </Modal>
  )
}

// ─── Carril ─────────────────────────────────────────────────────────
function Lane({ gallery, first, onOpen }) {
  const railRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const titleId = `galeria-${gallery.key}`

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [sync])

  const move = (d) => {
    const el = railRef.current
    if (el) el.scrollTo({ left: el.scrollLeft + d * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <Box as="article" className="gal-reveal" aria-labelledby={titleId} mt={{ base: 12, md: 14 }}>
      <Flex align="flex-end" justify="space-between" gap={5} pb={4}
            borderBottom="1px solid" borderColor="brand.amberLight">
        <Flex align="flex-end" gap={{ base: 2.5, md: 3.5 }} minW={0} wrap={{ base: 'wrap', md: 'nowrap' }} rowGap={1}>
          <Image src={gallery.logo} alt="" boxSize={{ base: '24px', md: '34px' }} objectFit="contain"
                 mb={{ base: 1, md: 1.5 }} flexShrink={0} />
          <Text
            as="h3"
            id={titleId}
            fontFamily="heading"
            fontWeight={700}
            fontSize={{ base: '26px', md: '44px', lg: '60px' }}
            lineHeight={0.9}
            letterSpacing="-0.01em"
            textTransform="uppercase"
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            color={first ? 'brand.amber' : 'transparent'}
            sx={{ WebkitTextStrokeWidth: { base: '1.2px', md: '1.5px' }, WebkitTextStrokeColor: 'var(--chakra-colors-brand-amber)' }}
          >
            {gallery.name}
          </Text>
          <Text fontFamily="heading" fontWeight={700} fontSize={{ base: '10px', md: '12px' }} letterSpacing="0.12em"
                color="brand.orange" mb={{ base: 1.5, md: 2.5 }} whiteSpace="nowrap">
            {plural(gallery.photos.length)}
          </Text>
        </Flex>

        <Flex align="center" gap={6} flexShrink={0}>
          {gallery.description && (
            <Text display={{ base: 'none', lg: 'block' }} maxW="30ch" textAlign="right" fontFamily="body"
                  fontSize="13px" lineHeight={1.5} color="brand.gray">
              {gallery.description}
            </Text>
          )}
          {/* En celular el carril se desliza con el dedo */}
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
            <IconButton aria-label={`Fotos anteriores de ${gallery.name}`} icon={<FiChevronLeft size={16} />}
                        isDisabled={edges.start} onClick={() => move(-1)} {...arrowStyle} />
            <IconButton aria-label={`Fotos siguientes de ${gallery.name}`} icon={<FiChevronRight size={16} />}
                        isDisabled={edges.end} onClick={() => move(1)} {...arrowStyle} />
          </HStack>
        </Flex>
      </Flex>

      <Flex
        ref={railRef}
        as="ul"
        listStyleType="none"
        m={0}
        mt={{ base: 4, md: '18px' }}
        gap={{ base: 2, md: '10px' }}
        overflowX="auto"
        pb={1}
        mr={{ base: -4, md: 0 }}
        pr={{ base: 4, md: 0 }}
        tabIndex={0}
        aria-label={`Fotos de ${gallery.name}`}
        onScroll={sync}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
        }}
        _focusVisible={{ outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '4px', borderRadius: '10px' }}
        sx={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {gallery.photos.map((p, j) => (
          <Box as="li" key={p.src + j} flexShrink={0} scrollSnapAlign="start">
            <Box
              as="button"
              type="button"
              onClick={() => onOpen(j)}
              aria-label={`Ampliar foto ${j + 1} de ${gallery.photos.length}: ${p.alt}`}
              display="block"
              position="relative"
              w={widthFor(p.shape)}
              h={{ base: `${RAIL_H.base}px`, md: `${RAIL_H.md}px`, lg: `${RAIL_H.lg}px` }}
              borderRadius="10px"
              overflow="hidden"
              bg="brand.dark3"
              cursor="zoom-in"
              _focusVisible={{ outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '3px' }}
              sx={{ [HOVER]: { '&:hover img': { transform: 'scale(1.04)' } } }}
            >
              <Image
                src={p.src}
                alt=""
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition={p.pos ?? 'center'}
                loading={j < 4 ? 'eager' : 'lazy'}
                draggable={false}
                transition={`transform .7s ${EASE}`}
              />
              <Text as="span" position="absolute" left="10px" bottom="10px" px={2} py="5px" borderRadius="4px"
                    bg="rgba(26,22,18,0.55)" color="#FCF7F0" fontFamily="heading" fontWeight={700}
                    fontSize="10px" letterSpacing="0.12em" lineHeight={1}>
                {String(j + 1).padStart(2, '0')}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

// ─── Sección ────────────────────────────────────────────────────────
export default function GallerySection() {
  const galleries = playerData.galleries ?? []
  const [open, setOpen] = useState(null) // { g, i }

  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  // Una sola entrada coordinada: cada carril sube y aparece al entrar en pantalla.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.gal-reveal')
        gsap.set(items, { opacity: 0, y: 32 })
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.1, overwrite: true }),
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  if (!galleries.length) return null

  return (
    <Box
      as="section"
      id="galeria"
      ref={sectionRef}
      aria-labelledby="galeria-title"
      bg="brand.dark"
      pt={{ base: 16, lg: 20 }}
      pb={{ base: 16, lg: 24 }}
      px={{ base: 4, md: 8, lg: 10 }}
      sx={{ overflow: 'clip' }}
    >
      <Box maxW="1400px" mx="auto">
        <Flex ref={headerRef} justify="space-between" align="flex-end" gap={6} wrap="wrap">
          <Box>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="0.28em">
              Fotos
            </Text>
            <Text as="h2" id="galeria-title" fontFamily="heading" fontWeight="bold"
                  fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1} mt={2}>
              Galería
            </Text>
          </Box>
          
        </Flex>

        {galleries.map((g, i) => (
          <Lane key={g.key} gallery={g} first={i === 0} onOpen={(j) => setOpen({ g: i, i: j })} />
        ))}
      </Box>

      <Lightbox
        gallery={open ? galleries[open.g] : null}
        index={open?.i ?? 0}
        onClose={() => setOpen(null)}
        onGo={(i) => setOpen((o) => ({ ...o, i }))}
      />
    </Box>
  )
}
