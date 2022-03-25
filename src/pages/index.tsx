import { GetServerSideProps, GetStaticProps } from "next"
// import { useEffect, useState } from "react"

export default function Home({ repositories, time }) {

  // const [repositories, setRepositories] = useState([])

  // useEffect(() => {
  //   fetch('https://api.github.com/users/melquisedeque-magalhaes/repos').then(response => response.json()).then(data => {
  //     const repositoryName = data.map(item => item.name)

  //     setRepositories(repositoryName)
  //   })
  // }, [])

  return (
    <>
      <h1>{time}</h1>
      <ul>
        {repositories.map(repository => (
          <li key={repository}>{repository}</li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response  = await fetch('https://api.github.com/users/melquisedeque-magalhaes/repos')

  const data = await response.json()

  const repositoryName = data.map(item => item.name)

  return {
    props: {
      time: new Date().toISOString(),
      repositories: repositoryName
    },
    revalidate: 5 * 60 //  5 minutes
  }
}