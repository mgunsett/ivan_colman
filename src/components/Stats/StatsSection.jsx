import { useRef, useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrubReveal from '../../hooks/useScrubReveal'
import { ScoreboardStats } from './ScoreboardStats.jsx'
import { ClubsCards } from './ClubsCards.jsx'

gsap.registerPlugin(ScrollTrigger)

// Estadísticas: "Marcador" (número destacado + recuadros, perfil y radar)
// y la trayectoria en tarjetas. Los diseños anteriores (anillos, radar,
// dossier, línea vertical) quedaron en el historial de git.

export default function StatsSection() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [
      { ref: titleRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } },
    ],
    start: 'top 80%',
    end:   'top 40%',
  })

  // Una sola entrada coordinada para toda la sección: cada bloque (.st-reveal)
  // sube y aparece al entrar en pantalla, en tandas. Solo transform + opacity.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.st-reveal')
        gsap.set(items, { opacity: 0, y: 28 })
        gsap.set('.radar-shape', { scale: 0.001 })
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: true })
            batch.forEach((el) => {
              const shape = el.querySelector('.radar-shape')
              if (shape) gsap.to(shape, { scale: 1, duration: 1.1, ease: 'expo.out', delay: 0.2 })
            })
          },
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <Box
      as="section"
      id="estadisticas"
      ref={sectionRef}
      aria-labelledby="stats-title"
      bg="brand.dark"
      pt={{ base: 16, lg: 20 }}
      pb={{ base: 16, lg: 24 }}
      px={{ base: 4, md: 8, lg: 10 }}
      borderTopLeftRadius={{ base: '14px', lg: '22px' }}
      borderTopRightRadius={{ base: '14px', lg: '22px' }}
      boxShadow="0 -24px 80px rgba(0,0,0,0.65)"
    >
      <Box maxW="1400px" mx="auto">
        <Flex align="flex-end" justify="space-between" mb={{ base: 8, md: 12 }}>
          <Box ref={titleRef}>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone"
                  textTransform="uppercase" letterSpacing="0.28em">
              Temporada 2025 / 2026
            </Text>
            <Text as="h2" id="stats-title" fontFamily="heading" fontWeight="bold"
                  fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1} mt={2}>
              Estadísticas
            </Text>
          </Box>
        </Flex>

        <ScoreboardStats />
        <ClubsCards />
      </Box>
    </Box>
  )
}
