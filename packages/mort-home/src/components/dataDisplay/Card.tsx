import styled from '@emotion/styled'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'

interface CardProps {
  name?: string | null
  imageUrl?: string | null
  species?: string | null
  status?: string | null
  location?: {
    id?: string | null
  } | null
  onClick: () => void
}

const StyledCard = styled(CardContent)`
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
    transition: transform 0.2s;
  }
`

export const CardImage = styled.img`
  max-width: 100%;
`

export const CardTitle = styled.h3`
  margin: 0.5rem 0;
`

export const CardSubtitle = styled.h4`
  margin: 0.5rem 0;
`

const Card: React.FC<CardProps> = ({
  imageUrl,
  name,
  species,
  status,
  location,
  onClick,
}) => {
  return (
    <StyledCard>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <CardImage src={imageUrl ?? ''} alt={`${name} image`} />
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{species}</CardSubtitle>
          <p>
            Status: {status} | Location: {location && location.id}
          </p>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
}

export default Card
