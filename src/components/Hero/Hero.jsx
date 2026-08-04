import { useRef, useEffect } from 'react'
import { Box, Text, Flex, VStack, HStack, Image, useToken } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MatchBox from './MatchBox'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'
import bgCenter from '@assets/polaco3.webp'
import bgRight from '@assets/polaco2.webp'
import bgLeft from '@assets/polaco4.webp'
import '../../styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)
const photoFade = 'radial-gradient(56% 48% at 40% 35%, black 32%, transparent 92%)'
const photoFadeSx = {
  mixBlendMode: 'luminosity',
  maskImage: photoFade,
  WebkitMaskImage: photoFade,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
}

/* Foto decorativa del tríptico de fondo. La altura va en vh para que la
   composición escale sola; el ancho queda en auto para no deformar el recorte */
function BgPhoto({ src, ...rest }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      position="absolute"
      w="auto"
      maxW="none"
      objectFit="contain"
      filter="grayscale(100%) contrast(1.05)"
      sx={photoFadeSx}
      {...rest}
    />
  )
}

function PlayerPanel() {
  const [amber] = useToken('colors', ['brand.amber'])
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      gap={{ base: 0, md: 4 }}
      fontFamily='heading'
      fontWeight="bold"
    >
      <Text
        className="player-number"
        fontFamily='heading'
        fontWeight="bold"
        fontSize={{ base: '24vw', md: '16vw', lg: '10vw' }}
        lineHeight={0.9}
        color="brand.gray2"
      // sx={{ WebkitTextStroke: `2px #e7e5e591` }}
      >
        {playerData.number}
      </Text>
      <Box  w={{ base: '110px', md: "1px" }} h={{ base: "1px", md: "70px", lg: "100px" }} bg="brand.amber" mt={{ base: 2, md: 8 }} ml={{ base: 2, md: 0}}/>
      <Flex id="player-info-text" direction={'column'} justifyContent={'flex-start'} alignItems={{ base: 'flex-end', md: 'flex-start' }} gap={1} mt={{ base: 4, md: 8 }}>
        <Flex gap={1} justifyContent='flex-start' alignItems={{ base: 'flex-start', md: 'center' }} direction={{ base: 'row', md: 'row' }}>
          <Text className='text-title' fontSize={{ base: '9px', sm: '10px', md: "11px", lg: "10px" }} color="brand.bone"
            textTransform="uppercase" letterSpacing="widest">
            Posición
          </Text>
          <Text className='text-title' fontSize={{ base: '9px', sm: '10px', md: "11px", lg: "12px" }} color="brand.dorado"
            fontWeight="700" textTransform="uppercase" letterSpacing={{ base: "none", md: "widest" }}>
            {playerData.position}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems='center' gap={{ base: '10px', md: '14px' }}>
          <Image src={playerData.nationalityFlag} w={{ base: '15px', md: '25px' }} />
          <Text className='text' mb={'-5px'} fontSize={{ base: 'xs', md: "md" }} color="brand.amber" letterSpacing="wider">
            {playerData.nationality}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems={'flex-end'} gap={{ base: '8px', md: '10px' }} spacing={1} mt={'3px'} ml={-1}>
          <Image src={playerData.logoCurrentClub} ml={{ base: '2px', md: 'none' }} w={{ base: '20px', sm: '25px', md: '30px', lg: '30px' }} h={{ base: '20px', sm: '25px', md: '30px', lg: '30px' }} />
          <Text className='text' fontSize={{ base: 'xs', md: "md" }} color="brand.amber" letterSpacing="wider">
            {playerData.currentClub}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default function Hero() {
  const outerRef     = useRef(null)
  const containerRef = useRef(null)
  const photoRef     = useRef(null)
  const bgGroupRef   = useRef(null)
  const line1Ref     = useRef(null)
  const line2Ref     = useRef(null)
  const vignetteRef  = useRef(null)
  const { matches }  = useMatches()
  const [amber, bgRef] = useToken('colors', ['brand.amber', 'brand.bgRef'])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([line1Ref.current, line2Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'expo.out', delay: 0.4 }
      )
      gsap.fromTo(photoRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6 }
      )
      // El tríptico de fondo entra suave para no competir con la foto principal
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Sólo opacidad + clearProps: un transform residual aislaría el
        // mix-blend-mode de las fotos respecto del fondo del hero
        gsap.fromTo(bgGroupRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.8, ease: 'power2.out', clearProps: 'opacity' }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(vignetteRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.75,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: '+=80vh',
            scrub: 1.2,
          },
        }
      )
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={outerRef} h="200vh" position="relative" zIndex={1} id= 'hero'>
      <Box
        className="hero-container"
        ref={containerRef}
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
        bg="brand.dark"
        sx={{
          maskImage: 'linear-gradient(black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(black 90%, transparent)',
          // dvh evita el salto al colapsar la barra del navegador en mobile; vh queda de fallback
          '@supports (height: 100dvh)': { height: '100dvh' },
        }}
      >
        {/* Tríptico de fondo: polaco4 (izq) — polaco3 (centro) — polaco2 (der).
            El fundido va en cada <Image> (photoFadeSx), no en este contenedor:
            su tamaño no coincide con el borde de las fotos */}
        <Box
          ref={bgGroupRef}
          className="hero-bg-group"
          position="absolute"
          inset={0}
          zIndex={0}
          overflow="hidden"
          pointerEvents="none"
        >
          <BgPhoto
            className="hero-bg-center"
            src={bgCenter}
            zIndex={1}
            h={{ base: '65vh', sm: '46vh', md: '56vh', lg: '86vh' }}
            left={{ base: '0%', sm: '0%', md: '8%', lg: '14%' }}
            bottom={{ base: '35%', sm: '16%', md: '8%', lg: '6%' }}
            opacity={{ base: 0.55, md: 0.18, lg: 0.55 }}
          />
          <BgPhoto
            className="hero-bg-left"
            display={{ base: 'none', md: 'block' }}
            src={bgLeft}
            zIndex={3}
            h={{ base: '46vh', sm: '54vh', md: '70vh', lg: '122vh' }}
            left="55%"
            top={{ base: '12%', sm: '8%', md: '4%', lg: '12%' }}
            transform="translateX(-50%)"
            opacity={{ base: 0.30, md: 0.26, lg: 0.21 }}
          />
          <BgPhoto
            className="hero-bg-right"
            src={bgRight}
            zIndex={2}
            h={{ base: '72vh', sm: '48vh', md: '60vh', lg: '82vh' }}
            right={{ base: '-8%', sm: '-2%', md: '6%', lg: '20%' }}
            top={{ base: '10%', sm: '14%', md: '10%', lg: '8%' }}
            opacity={{ base: 0.30, md: 0.24, lg: 0.19 }}
          />
        </Box>

        {/* Player photo */}
        <Box
          className="player-photo-container"
          position="absolute"
          inset={0}
          zIndex={{base: 3, md: 5,  lg:9999}}
          pl={{ base: '0%', sm: '5%', md: '10%', lg: '12%' }}
          pt={{ base: '0%', sm: '0%', md: '2%', lg: '4%' }}
          display="flex"
          justifyContent={{ base: 'flex-start', lg: 'flex-start' }}
          alignItems={{ base: 'flex-start', lg: 'flex-start' }}
          pointerEvents="none"
        >
          <Box
            ref={photoRef}
            h={{ base: '87vh', sm: '90vh', md: '90vh', lg: '90vh' }}
            style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
          >
            <Image
              className="player-photo"
              src={playerData.image}
              alt={`${playerData.displayName}, ${playerData.position.toLowerCase()} profesional de ${playerData.currentClub}`}
              h={{ base: '100%', sm: '90vh', md: '90vh', lg: '90vh' }}
              w={{ base: '600px', sm: '50vw', md: '40vw', lg: '40vw' }}
              objectFit="contain"
              objectPosition="bottom center"
              draggable= {false}
            />
          </Box>
        </Box>

        {/* Visible name text */}
        <Box
          className='player-name-container'
          position="absolute"
          inset={0}
          zIndex={2}
          pointerEvents="none"
          display="flex"
          flexDir="column"
          alignItems={{ base: 'center', md: 'flex-start' }}
          justifyContent={{ base: 'flex-start', md: 'center' }}
          pt={{ base: '30%', lg: '0%' }}
          ml={{ base: 0, md: '37%' }}
          mt={{ base: '15%', lg: '-2%' }}
        >
          <Flex 
          direction="column" 
          as="h1" 
          overflow="hidden"
          >
              <Text
                ref={line1Ref}
                className="player-name"
                as="span"
                display="block"
                fontFamily='Nippo'
                fontWeight="bold"
                letterSpacing="2px"
                textTransform="uppercase"
                fontSize={{ base: '12vw', md: '16vw', lg: '5vw' }}
                color="brand.amber"
                lineHeight={0.9}
                style={{ opacity: 0 }}
                ml={{ base: 2, md: 0 }}
                mb={'-5px'}
              >
                {playerData.name}
              </Text>            

            <Text
              className="player-fullname"
              ref={line2Ref}
              as="span"
              display="block"
              fontFamily='Nippo'
              fontWeight="bold"
              fontSize={{ base: '22vw', md: '16vw', lg: '10vw' }}
              letterSpacing="2px"
              color="transparent"
              lineHeight={0.9}
              style={{ opacity: 0 }}
              sx={{ WebkitTextStroke: `2px ${amber}` }}
            >
              {playerData.fullName}
            </Text>

            
          </Flex>
        </Box>
        {/* Player info — bottom left */}
        <Box
          className="player-info"
          position="absolute"
          bottom={{ base: 'auto', lg: '20%' }}
          left={{ base: '67%', lg: '37%' }}
          top={{ base: '56%', lg: '60%' }}
          zIndex={15}
        >
          <PlayerPanel />
        </Box>

        {/* MatchBox desktop */}
        <Box
          position="absolute"
          bottom="12%"
          right={0}
          top={{ base: 'auto', lg: '20%' }}
          zIndex={10}
          display={{ base: 'none', lg: 'block' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="card" />
        </Box>

        {/* MatchBox mobile */}
        <Box
          position="absolute"
          bottom={{base:"10px",md:"40px"}}
          left={0}
          right={0}
          zIndex={15}
          display={{ base: 'block', lg: 'none' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="strip" />
        </Box>



        {/* Vignette */}
        <Box
          ref={vignetteRef}
          position="absolute"
          inset={0}
          zIndex={20}
          background="radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)"
          pointerEvents="none"
          style={{ opacity: 0.15 }}
        />
      </Box>
    </Box>
  )
}
