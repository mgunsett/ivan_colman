import { useEffect, useRef } from 'react'
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react'
import { FiArrowUp } from 'react-icons/fi'
import { playerData } from '../../data/playerData'
import sportfolioWeb from '@assets/logo_sport_dark.webp'

// ─── Footer: diseño "Firma" ─────────────────────────────────────────
// Una fila con logo, copyright, "Volver arriba" y el crédito de
// desarrollo (Sportfolio). Debajo, el apellido y el dorsal gigantes en
// contorno, ajustados al ancho disponible, como cierre de la página.
// El logo de Sportfolio va en verde (dev.green) porque el fondo es claro.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'
const focus = { outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '4px', borderRadius: '4px' }

// "IVAN COLMAN" → "Ivan Colman"
const playerName = playerData.displayName.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())

const toTop = (e) => {
  e.preventDefault()
  if (window.__lenis) window.__lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Ajusta el tamaño de la firma para que ocupe exactamente el ancho del contenedor
function useFitWidth(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      el.style.fontSize = '100px'
      const w = [...el.children].reduce((a, c) => a + c.getBoundingClientRect().width, 0)
      const W = el.parentElement.clientWidth
      if (w) el.style.fontSize = `${(100 * W) / w * 0.99}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(el.parentElement)
    return () => ro.disconnect()
  }, [ref])
}

export default function Footer() {
  const signRef = useRef(null)
  useFitWidth(signRef)
  const year = new Date().getFullYear()

  return (
    <Box as="footer" bg="brand.dark3" pt={{ base: 9, md: 10 }} px={{ base: 4, md: 8, lg: 10 }} overflow="hidden">
      <Box maxW="1400px" mx="auto">
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr auto 1fr' }}
          alignItems="center"
          justifyItems={{ base: 'center', lg: 'stretch' }}
          textAlign={{ base: 'center', lg: 'left' }}
          gap={{ base: 5, lg: 6 }}
        >
          {/* Logo → inicio */}
          <Box as="a" href="#hero" onClick={toTop} aria-label={`${playerName}, ir al inicio`}
               justifySelf={{ lg: 'start' }} _focusVisible={focus}>
            <Text fontFamily="heading" fontWeight="bold" textTransform="uppercase" fontSize="34px"
                  lineHeight={1} letterSpacing="-0.06em" color="brand.amber">
              {playerData.initials}
              <Box as="span" color="brand.dorado" ml="1px">_</Box>
            </Text>
          </Box>

          <Text fontFamily="body" fontSize="12px" lineHeight={1.4} color="brand.gray">
            © {year} {playerName}. Todos los derechos reservados.
          </Text>

          {/* Crédito + volver arriba */}
          <Flex justifySelf={{ lg: 'end' }} align="center" gap={{ base: 4, md: 5 }}
                direction={{ base: 'column', md: 'row' }}>
                  <Flex
              as="a"
              href="#hero"
              onClick={toTop}
              align="center"
              gap={2}
              px={4}
              py={2.5}
              borderRadius="full"
              border="1px solid"
              borderColor="brand.amber"
              fontFamily="heading"
              fontWeight={700}
              fontSize="12px"
              lineHeight={1}
              color="brand.bone"
              transition={`background .2s ease, color .2s ease, transform .16s ${EASE}`}
              _active={{ transform: 'scale(0.97)' }}
              _focusVisible={focus}
              sx={{
                '& svg': { transition: `transform .25s ${EASE}` },
                [HOVER]: { '&:hover': { bg: 'brand.amber', color: 'brand.dark' }, '&:hover svg': { transform: 'translateY(-2px)' } },
              }}
            >
              Volver arriba
              <Box as={FiArrowUp} boxSize="14px" aria-hidden="true" />
            </Flex>
            <Flex direction="column" align={{ base: 'center', md: 'flex-end' }} gap="5px">
              <Text fontFamily="body" fontSize="11px" lineHeight={1} color="brand.gray">Desarrollo web</Text>
              <Box
                as="a"
                href="https://matiasgunsett.netlify.app/sportfolio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sportfolio Web, desarrollo web"
                display="block"
                transition="opacity .2s ease"
                _focusVisible={focus}
                sx={{ [HOVER]: { '&:hover': { opacity: 0.75 } } }}
              >
                <Image src={sportfolioWeb} alt="Sportfolio Web" w="90px" h="auto" display="block" />
              </Box>
            </Flex>

          </Flex>
        </Grid>

        {/* Firma: apellido + dorsal en contorno, cortada abajo a propósito */}
        <Flex
          ref={signRef}
          aria-hidden="true"
          mt={{ base: 6, md: 7 }}
          mb="-0.36em"
          justify="center"
          align="flex-end"
          whiteSpace="nowrap"
          userSelect="none"
          pointerEvents="none"
          fontFamily="heading"
          fontWeight={700}
          lineHeight={1}
          letterSpacing="-0.05em"
          textTransform="uppercase"
          fontSize="220px"
          color="transparent"
          sx={{ WebkitTextStrokeWidth: { base: '1px', md: '1.5px' } }}
        >
          <Box as="span" sx={{ WebkitTextStrokeColor: 'rgba(26,22,18,0.32)' }}>{playerData.fullName}</Box>
          <Box as="span" sx={{ WebkitTextStrokeColor: 'var(--chakra-colors-brand-orange)' }}>{playerData.number}</Box>
        </Flex>
      </Box>
    </Box>
  )
}
