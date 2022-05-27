import React from 'react'
import { Wrapper, DummyImg, ImageWrapper } from './styled'

enum Resolution {
  MD = '1.5x',
  LG = '2x',
}
interface ImageAttributes {
  src: string
  alt: string
}

export interface CompositeImageProps {
  path: string
  attributes: ImageAttributes[]
}

interface ComponentProps extends CompositeImageProps {
  maxHeight?: string
}

export const getImageUrl = (base: string, imageSrc: string, resolution?: Resolution): string =>
  `${base}${imageSrc}${resolution ? `@${resolution}.png` : '.png'}`

export const getSrcSet = (base: string, imageSrc: string) => {
  return `${getImageUrl(base, imageSrc)} 512w, 
  ${getImageUrl(base, imageSrc, Resolution.MD)} 768w, 
  ${getImageUrl(base, imageSrc, Resolution.LG)} 1024w,`
}

const CompositeImage: React.FC<ComponentProps> = ({ path, attributes, maxHeight = '512px' }) => {
  return (
    <Wrapper maxHeight={maxHeight}>
      <DummyImg
        src={getImageUrl(path, attributes[0].src)}
        maxHeight={maxHeight}
        srcSet={getSrcSet(path, attributes[0].src)}
      />
      {attributes.map((image) => (
        <ImageWrapper key={image.src}>
          <img src={getImageUrl(path, image.src)} srcSet={getSrcSet(path, image.src)} alt={image.alt} />
        </ImageWrapper>
      ))}
    </Wrapper>
  )
}

export default CompositeImage
