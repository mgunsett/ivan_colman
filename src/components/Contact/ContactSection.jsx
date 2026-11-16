import { useEffect, useRef } from 'react'
import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { FiArrowUpRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import useScrubReveal from '../../hooks/useScrubReveal'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'
const focus = { outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '3px' }

function GroupTitle({ children }) {
  return (
    <Text as="h3" fontFamily="heading" fontWeight={700} fontSize="13px" color="brand.gray" mb={3.5}>
      {children}
    </Text>
  )
}

function SocialCard({ item }) {
  const Icon = item.icon
  return (
    <Box
      as="a"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.label}: ${item.handle}`}
      className="ct-reveal"
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={7}
      minH={{ base: '140px', md: '168px' }}
      px={6}
      py="22px"
      border="1px solid"
      borderColor="brand.amberLight"
      borderRadius="14px"
      bg="brand.dark"
      color="brand.bone"
      transition={`border-color .2s ease, transform .16s ${EASE}`}
      _active={{ transform: 'scale(0.985)' }}
      _focusVisible={focus}
      sx={{
        '--c': item.hoverColor,
        [HOVER]: {
          '&:hover': { borderColor: 'var(--c)' },
          '&:hover .ct-chip': { bg: 'var(--c)' },
          '&:hover .ct-go': { transform: 'translate(2px,-2px)', borderColor: 'var(--c)' },
        },
      }}
    >
      {/* Ícono y marca de agua */}
      <Flex className="ct-chip" boxSize="40px" borderRadius="10px" align="center" justify="center"
            bg="brand.amber" color="brand.dark" transition="background .2s ease" aria-hidden="true">
        <Box as={Icon} boxSize="20px" />
      </Flex>
      <Box as={Icon} aria-hidden="true" position="absolute" right="-18px" bottom="-26px" boxSize="150px"
           color="brand.amber" opacity={0.06} pointerEvents="none" />
      <Flex className="ct-go" position="absolute" top={5} right={5} boxSize="34px" borderRadius="full"
            border="1px solid" borderColor="brand.amberLight" align="center" justify="center"
            transition={`transform .25s ${EASE}, border-color .2s ease`} aria-hidden="true">
        <Box as={FiArrowUpRight} boxSize="15px" />
      </Flex>

      <Box position="relative">
        <Text fontFamily="body" fontWeight={500} fontSize="12px" lineHeight={1} color="brand.gray">{item.label}</Text>
        <Text mt={2} fontFamily="heading" fontWeight={700} fontSize={{ base: '24px', md: '28px', lg: '34px' }}
              lineHeight={1} letterSpacing="-0.01em">
          {item.handle}
        </Text>
        {item.note && (
          <Text mt={2} fontFamily="body" fontWeight={500} fontSize="12px" lineHeight={1} color="brand.gray">{item.note}</Text>
        )}
      </Box>
    </Box>
  )
}

// Toda la tarjeta es el link. Al pasar el mouse se enciende un halo dorado
// desde el logo, se marca el borde y la flecha se desplaza.
function RepCard({ item }) {
  return (
    <Box
      as="a"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.label} (${item.title}): ${item.handle}`}
      className="ct-reveal"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      gap={5}
      p={{ base: 5, md: 6 }}
      pr={{ base: 16, md: 20 }}
      border="1px solid"
      borderColor="brand.amberLight"
      borderRadius="14px"
      bg="brand.dark"
      transition={`border-color .25s ease, background-color .25s ease, transform .16s ${EASE}`}
      _active={{ transform: 'scale(0.985)' }}
      _focusVisible={focus}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        bg: 'radial-gradient(120% 140% at 0% 50%, var(--chakra-colors-brand-dorado) 0%, transparent 60%)',
        opacity: 0,
        transition: 'opacity .35s ease',
        pointerEvents: 'none',
      }}
      sx={{
        [HOVER]: {
          '&:hover': { borderColor: 'brand.dorado', bg: 'brand.dark3' },
          '&:hover::before': { opacity: 0.22 },
          '&:hover .ct-logo': { transform: 'scale(1.05)' },
          '&:hover .ct-go': { transform: 'translate(2px,-2px)', bg: 'brand.amber', color: 'brand.dark', borderColor: 'brand.amber' },
        },
      }}
    >
      <Image className="ct-logo" src={item.image} alt="" position="relative" flexShrink={0}
             boxSize={{ base: '60px', md: '72px' }} borderRadius="full" objectFit="contain"
             bg="brand.amber" p={2} transition={`transform .35s ${EASE}`} />
      <Box position="relative" minW={0}>
        <Text fontFamily="body" fontWeight={500} fontSize="12px" lineHeight={1} color="brand.orange">{item.title}</Text>
        <Text mt="7px" fontFamily="heading" fontWeight={700} fontSize="22px" lineHeight={1.05} textTransform="uppercase" color="brand.bone">
          {item.label}
        </Text>
        <Text mt="6px" fontFamily="body" fontSize="13px" lineHeight={1} color="brand.gray">{item.handle}</Text>
      </Box>

      <Flex className="ct-go" position="absolute" top="50%" right={{ base: 5, md: 6 }} mt="-17px" boxSize="34px"
            borderRadius="full" border="1px solid" borderColor="brand.amberLight" color="brand.bone"
            align="center" justify="center" aria-hidden="true"
            transition={`transform .25s ${EASE}, background-color .2s ease, color .2s ease, border-color .2s ease`}>
        <Box as={FiArrowUpRight} boxSize="15px" />
      </Flex>
    </Box>
  )
}

export default function ContactSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  // Una sola entrada coordinada: las tarjetas suben y aparecen en tandas.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.ct-reveal')
        gsap.set(items, { opacity: 0, y: 28 })
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: true,
            clearProps: 'transform',
          }),
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <Box
      as="section"
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-title"
      bg="brand.dark"
      pt={{ base: 16, lg: 20 }}
      pb={{ base: 16, lg: 24 }}
      px={{ base: 4, md: 8, lg: 10 }}
    >
      <Box maxW="1400px" mx="auto">
        <Flex ref={headerRef} justify="space-between" align="flex-end" gap={6} wrap="wrap">
          <Box>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="0.28em">
              Redes y representación
            </Text>
            <Text as="h2" id="contact-title" fontFamily="heading" fontWeight="bold"
                  fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1} mt={2}>
              Contacto
            </Text>
          </Box>
          <Text maxW="44ch" fontFamily="body" fontSize={{ base: '13px', md: '14px' }} lineHeight={1.6} color="brand.gray">
            Seguilo en sus redes o escribile directamente a quien lleva cada tema.
          </Text>
        </Flex>

        <Box mt={10}>
          <GroupTitle>Redes sociales</GroupTitle>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
            {playerData.socialMedia.map((s) => <SocialCard key={s.url} item={s} />)}
          </SimpleGrid>
        </Box>

        <Box mt={10}>
          <GroupTitle>Representación</GroupTitle>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
            {playerData.contact.map((c) => <RepCard key={c.url} item={c} />)}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
}
