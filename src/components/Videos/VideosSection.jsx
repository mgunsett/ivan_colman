import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { FaInstagram } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import useScrubReveal from '../../hooks/useScrubReveal'
import { VideoCard } from './VideoCard'
import './videos.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Videos: diseño "Programa" ──────────────────────────────────────
// Un video "en pantalla" con su ficha y la lista para cambiarlo.
//
// Todo entra en el alto visible: en desktop el alto de la pantalla
// (--screen-h) sale del alto del viewport (svh) menos la navbar, el padding y el
// título, y la columna derecha toma ese mismo alto (si hubiera muchos
// videos, la lista scrollea por dentro). En mobile el video se achica
// para entrar completo en pantalla.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'

const swapIn = keyframes`
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to   { opacity: 1; transform: none; }
`

function Label({ children, ...rest }) {
  return (
    <Text fontFamily="mono" fontSize="10px" fontWeight={500} letterSpacing="0.2em"
          textTransform="uppercase" color="brand.gray" lineHeight={1.3} {...rest}>
      {children}
    </Text>
  )
}

function NowPlaying({ video }) {
  const club = video.club ?? playerData.currentClub
  const crest = video.clubLogo ?? playerData.logoCurrentClub
  return (
    <Box key={video.id} aria-live="polite"
         sx={{ animation: `${swapIn} .5s ${EASE} both`, '@media (prefers-reduced-motion: reduce)': { animation: 'none' } }}>
      <Flex align="center" gap={2}>
        <Box w="8px" h="8px" borderRadius="full" bg="brand.rec" />
        <Text fontFamily="mono" fontSize="11px" fontWeight={700} letterSpacing="0.2em" textTransform="uppercase" color="brand.bone">
          En pantalla
        </Text>
      </Flex>
      <Text as="h3" mt="var(--g1)" fontFamily="heading" fontWeight={700} textTransform="uppercase"
            letterSpacing="-0.01em" lineHeight={0.95} color="brand.bone" fontSize="var(--title)">
        {video.title}
      </Text>
      {video.text && (
        <Text mt="var(--g1)" maxW="60ch" fontFamily="body" fontSize={{ base: '14px', md: '15px' }}
              lineHeight={1.6} color="brand.gray" noOfLines={2}>
          {video.text}
        </Text>
      )}

      <Flex mt="var(--g2)" pt="var(--g2)" borderTop="1px solid" borderColor="brand.amberLight"
            wrap="wrap" align="flex-end" gap={{ base: '18px 28px', md: '18px 40px' }}>
        <Box>
          <Label>Temporada</Label>
          <Text mt={2} fontFamily="heading" fontWeight={700} fontSize="15px" color="brand.bone">{video.year}</Text>
        </Box>
        <Box>
          <Label>Club</Label>
          <Flex mt={2} align="center" gap={2} fontFamily="heading" fontWeight={700} fontSize="15px" color="brand.bone">
            <Image src={crest} alt="" boxSize="20px" objectFit="contain" />{club}
          </Flex>
        </Box>
        {video.league && (
          <Box>
            <Label>Torneo</Label>
            <Text mt={2} fontFamily="heading" fontWeight={700} fontSize="15px" color="brand.bone">{video.league}</Text>
          </Box>
        )}
        <Flex
          as="a"
          href={`https://www.instagram.com/reel/${video.instagramId}/`}
          target="_blank"
          rel="noopener noreferrer"
          ml={{ md: 'auto' }}
          align="center"
          gap={2.5}
          pb="6px"
          borderBottom="1.5px solid"
          borderColor="brand.dorado"
          fontFamily="heading"
          fontWeight={700}
          fontSize="13px"
          letterSpacing="0.06em"
          color="brand.bone"
          transition={`border-color .3s ${EASE}`}
          _focusVisible={{ outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '4px' }}
          sx={{ [HOVER]: { '&:hover': { borderColor: 'brand.amber' } } }}
        >
          <Box as={FaInstagram} boxSize="16px" />Abrir en Instagram
        </Flex>
      </Flex>
    </Box>
  )
}

export default function VideosSection() {
  const videos = playerData.videos
  const [active, setActive] = useState(0)

  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  // Una sola entrada coordinada: pantalla y ficha suben y aparecen juntas.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.vid-reveal')
        gsap.fromTo(items, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
          scrollTrigger: { trigger: items[0], start: 'top 85%', once: true },
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  if (!videos.length) return null
  const video = videos[active]

  return (
    <Box
      as="section"
      id="videos"
      ref={sectionRef}
      aria-labelledby="videos-title"
      position="relative"
      bg="brand.dark"
      minH="calc(100 * var(--vh))"
      px={{ base: 4, md: 8, lg: 10 }}
      pt="var(--pad-t)"
      pb="var(--pad-b)"
      display="flex"
      alignItems="center"
      className="videos-programa"
      sx={{ overflow: 'clip' }}
    >
      <Box maxW="1400px" w="100%" mx="auto">
        <Box ref={headerRef} mb="var(--head-gap)" h={{ md: 'var(--head)' }}>
          <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="0.28em">
            Highlights
          </Text>
          <Text as="h2" id="videos-title" fontFamily="heading" fontWeight="bold"
                fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1} mt={2}>
            Videos
          </Text>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: 'calc(var(--screen-h) * 9 / 16) minmax(0, 1fr)' }}
          gap={{ base: 7, md: 10, lg: 16 }}
          alignItems="start"
        >
          {/* Pantalla */}
          <Box
            className="vid-reveal"
            w={{ base: 'var(--screen-w)', md: '100%' }}
            mx={{ base: 'auto', md: 0 }}
            h={{ md: 'var(--screen-h)' }}
            sx={{ aspectRatio: '9 / 16' }}
          >
            <VideoCard video={video} index={active} />
          </Box>

          {/* Ficha + lista: en desktop mide lo mismo que la pantalla */}
          <Flex
            className="vid-reveal"
            direction="column"
            minW={0}
            h={{ lg: 'var(--screen-h)' }}
          >
            <NowPlaying video={video} />

            <Flex justify="space-between" align="baseline" mt="var(--g2)" pb="var(--g1)"
                  borderBottom="1px solid" borderColor="brand.amberLight" flexShrink={0}>
              <Text as="h3" fontFamily="heading" fontWeight={700} fontSize={{ base: '14px', md: '15px' }}
                    letterSpacing="0.24em" textTransform="uppercase" color="brand.bone">
                Más videos
              </Text>
              <Label>{videos.length} videos</Label>
            </Flex>

            <Box as="ul" listStyleType="none" m={0} flex={{ lg: 1 }} minH={0}
                 overflowY={{ lg: 'auto' }} sx={{ scrollbarWidth: 'thin' }}>
              {videos.map((v, i) => {
                const on = i === active
                return (
                  <Box as="li" key={v.id}>
                    <Box
                      as="button"
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on ? 'true' : undefined}
                      aria-label={on ? `${v.title}, en pantalla` : `Poner en pantalla: ${v.title}`}
                      w="100%"
                      display="grid"
                      gridTemplateColumns={{ base: '64px minmax(0,1fr) auto', md: 'calc(var(--thumb-h) * 0.8) minmax(0,1fr) auto' }}
                      gap={{ base: 3.5, md: 5 }}
                      alignItems="center"
                      textAlign="left"
                      py="var(--g1)"
                      borderBottom="1px solid"
                      borderColor="brand.amberLight"
                      cursor="pointer"
                      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '4px', borderRadius: '8px' }}
                      sx={{
                        '& .vi-thumb': { borderColor: on ? 'brand.orange' : 'transparent' },
                        [HOVER]: on ? {} : {
                          '&:hover .vi-thumb': { borderColor: 'brand.dorado' },
                          '&:hover .vi-state': { color: 'brand.bone' },
                        },
                      }}
                    >
                      <Image
                        className="vi-thumb"
                        src={v.cover}
                        alt=""
                        w="100%"
                        h={{ base: '80px', md: 'var(--thumb-h)' }}
                        objectFit="cover"
                        objectPosition={v.pos ?? 'center 35%'}
                        borderRadius="8px"
                        border="2px solid"
                        transition={`border-color .3s ${EASE}`}
                      />
                      <Box minW={0}>
                        <Text fontFamily="heading" fontWeight={700} fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                              lineHeight={1.05} textTransform="uppercase" color="brand.bone" noOfLines={1}>
                          {v.title}
                        </Text>
                        <Text mt={2} fontFamily="mono" fontSize="10px" fontWeight={500} letterSpacing="0.14em"
                              textTransform="uppercase" color="brand.gray" noOfLines={1}>
                          {(v.club ?? playerData.currentClub)} · {v.league} {v.year}
                        </Text>
                      </Box>
                      <Text className="vi-state" fontFamily="mono" fontSize="10px" fontWeight={700} letterSpacing="0.14em"
                            textTransform="uppercase" color={on ? 'brand.rec' : 'brand.gray'} transition="color .3s">
                        {on ? 'En pantalla' : 'Ver'}
                      </Text>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
