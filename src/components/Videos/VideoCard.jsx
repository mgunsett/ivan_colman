import { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa'
import { playerData } from '../../data/playerData'

// ─── Pantalla del "Programa" ─────────────────────────────────────────
// Reel vertical (9:16) con portada. Al tocarlo se reproduce dentro de la
// misma card (embed de Instagram). Al cambiar de video vuelve a la portada.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'

function PlayIcon() {
  return (
    <Box as="svg" viewBox="0 0 24 24" boxSize={{ base: '22px', lg: '24px' }} ml="3px" aria-hidden="true">
      <path fill="currentColor" d="M7 4.5v15l13-7.5z" />
    </Box>
  )
}

export function VideoCard({ video, index = 0 }) {
  const [playing, setPlaying] = useState(false)
  useEffect(() => setPlaying(false), [video.instagramId])

  const name = playerData.shortName ?? playerData.displayName
  const play = () => setPlaying(true)

  return (
    <Box
      role={playing ? undefined : 'button'}
      tabIndex={playing ? undefined : 0}
      aria-label={playing ? undefined : `Reproducir ${video.title}`}
      onClick={playing ? undefined : play}
      onKeyDown={(e) => {
        if (!playing && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); play() }
      }}
      position="relative"
      w="100%"
      h="100%"
      borderRadius={{ base: '14px', lg: '16px' }}
      overflow="hidden"
      bg="#0c0b0a"
      cursor={playing ? 'default' : 'pointer'}
      boxShadow="0 30px 60px rgba(26,22,18,0.22)"
      sx={{
        isolation: 'isolate',
        [HOVER]: {
          '&:hover .vc-cover': { transform: 'scale(1.05)' },
          '&:hover .vc-play': { transform: 'scale(1.08)' },
        },
      }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.orange', outlineOffset: '4px' }}
    >
      <Box
        as="img"
        className="vc-cover"
        src={video.cover}
        alt={`${name} · ${video.title}`}
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition={video.pos ?? 'center 35%'}
        transition={`transform .7s ${EASE}`}
        draggable={false}
      />
      <Box position="absolute" inset={0} zIndex={1} pointerEvents="none"
           bg="linear-gradient(180deg, rgba(26,22,18,0.12) 0%, transparent 35%, rgba(26,22,18,0.86) 100%)" />

      {!playing && (
        <>
          <Flex position="absolute" top={3} left={3} zIndex={3} align="center" gap="6px" px="9px" py="5px"
                borderRadius="5px" bg="rgba(26,22,18,0.55)" border="1px solid" borderColor="rgba(212,165,116,0.7)"
                sx={{ backdropFilter: 'blur(6px)' }}>
            <Box w="6px" h="6px" borderRadius="full" bg="brand.rec" />
            <Text fontFamily="mono" fontSize="9px" fontWeight={500} letterSpacing="0.24em"
                  textTransform="uppercase" color="#FCF7F0" lineHeight={1}>
              {video.category}
            </Text>
          </Flex>
          <Flex position="absolute" top={3} right={3} zIndex={3} boxSize="28px" borderRadius="7px"
                align="center" justify="center" bg="rgba(26,22,18,0.55)" border="1px solid"
                borderColor="rgba(252,247,240,0.3)" color="#FCF7F0">
            <Box as={FaInstagram} boxSize="14px" />
          </Flex>

          <Flex className="vc-play" position="absolute" left="50%" top="50%" zIndex={3}
                boxSize={{ base: '64px', lg: '76px' }} ml={{ base: '-32px', lg: '-38px' }} mt={{ base: '-32px', lg: '-38px' }}
                borderRadius="full" align="center" justify="center" bg="brand.dorado" color="brand.amber"
                boxShadow="0 10px 30px rgba(26,22,18,0.35)" transition={`transform .4s ${EASE}`}>
            <PlayIcon />
          </Flex>

          <Flex position="absolute" left="14px" right="14px" bottom="14px" zIndex={3}
                justify="space-between" align="flex-end" gap={2.5} color="#FCF7F0">
            <Box minW={0}>
              <Text fontFamily="heading" fontWeight={700} fontSize="18px" lineHeight={1.05}
                    textTransform="uppercase" noOfLines={1}>
                {video.title}
              </Text>
              <Text mt="6px" fontFamily="mono" fontSize="9px" fontWeight={500} letterSpacing="0.22em"
                    textTransform="uppercase" color="brand.dorado">
                {video.league} {video.year}
              </Text>
            </Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="11px" letterSpacing="0.2em" color="brand.dorado">
              {String(index + 1).padStart(2, '0')}
            </Text>
          </Flex>
        </>
      )}

      {playing && (
        <Box
          as="iframe"
          src={`https://www.instagram.com/reel/${video.instagramId}/embed`}
          title={`${name} | ${video.title}`}
          position="absolute"
          inset={0}
          w="100%"
          h="100%"
          zIndex={6}
          bg="#000"
          border="none"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </Box>
  )
}

export default VideoCard
