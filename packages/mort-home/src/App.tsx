import styled from '@emotion/styled'

import MainCard from './components/dataDisplay/Card'
import { useGetAllCharacters } from './hooks/home/useGetAllCharacters'

export const NavMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style-type: none;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

export const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
`

export const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
`

export const Card = styled.div`
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0.5rem;
  padding: 1rem;
  width: 300px;
`

export const AboutUs = styled.section`
  margin: 2rem 0;
  padding: 1rem;
  text-align: center;
`

export const Contact = styled.section`
  margin: 2rem 0;
  padding: 1rem;
  text-align: center;
`

export const Header = styled.header`
  background-color: #333;
  padding: 1rem;
`

const Main: React.FC = () => {
  const { characters, isLoading, isError } = useGetAllCharacters()

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header>
            <NavMenu>
              <li>
                <NavLink href="#">Home</NavLink>
              </li>
              <li>
                <NavLink href="#about">About Us</NavLink>
              </li>
              <li>
                <NavLink href="#contact">Contact</NavLink>
              </li>
            </NavMenu>
          </Header>

          <main>
            <CardContainer>
              {characters?.length &&
                characters?.map(character => (
                  <MainCard
                    key={character?.id}
                    name={character?.name}
                    imageUrl={character?.image}
                    species={character?.species}
                    status={character?.status}
                    location={character?.location}
                    onClick={() =>
                      window.history.pushState(
                        {
                          path: `/character/${character?.id}`,
                        },
                        '',
                        `/character/${character?.id}`
                      )
                    }
                  />
                ))}
            </CardContainer>
          </main>

          <AboutUs id="about">
            <h2>About Us</h2>
            <p>
              We are a fan-made website showcasing information on the Rick and
              Morty universe.
            </p>
          </AboutUs>

          <Contact id="contact">
            <h2>Contact</h2>
            <p>
              If you have any questions, feel free to reach out to us at{' '}
              <a href="mailto:info@example.com">info@example.com</a>.
            </p>
          </Contact>
        </>
      )}
    </>
  )
}

export default Main
