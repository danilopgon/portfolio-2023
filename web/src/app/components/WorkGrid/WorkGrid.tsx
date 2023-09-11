'use client'

import { useState, useEffect, use } from 'react'
import { Divider } from '@nextui-org/divider'
import { Skeleton } from '@nextui-org/skeleton'

import fetchProjects from '../../services/fetchProjects'
import Project from '../../types/Project'
import CustomCardProps from '../../types/CustomCardProps'
import CustomCard from './CustomCard'

const WorkGrid = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [adaptedProjects, setAdaptedProjects] = useState<CustomCardProps[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const adaptProjects = (projects: Project[]): CustomCardProps[] => {
    return projects.map((project) => {
      const id = project.id
      const {
        title,
        description,
        URL: url,
        finish_date: date,
        categories,
        technologies,
        thumbnail,
      } = project.attributes

      const { alternativeText, url: thumbnailUrl } = thumbnail.data.attributes
      const cardImageURL = `${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnailUrl}`
      const categoriesList = categories.data.map((category) => category.attributes.Name).join(', ')
      const technologiesList = technologies.data.map((technology) => technology.attributes.Name).join(', ')
      const yearDate = new Date(date).getFullYear().toString()

      return {
        id,
        colSpan: '4',
        title,
        thumbnail: cardImageURL,
        alternativeText,
        description,
        categories: categoriesList,
        technologies: technologiesList,
        url,
        date: yearDate,
      }
    })
  }

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects()
      console.log(projectsFromServer)

      if (projectsFromServer) {
        setProjects(projectsFromServer)
      }
    }

    getProjects()
  }, [])

  useEffect(() => {
    if (projects.length > 0) {
      const adaptedProjects = adaptProjects(projects)
      setAdaptedProjects(adaptedProjects)
    }
  }, [projects])

  useEffect(() => {
    if (adaptedProjects) {
      setIsLoaded(true)
    }

    console.log(adaptedProjects)
  }, [adaptedProjects])

  if (!isLoaded) {
    return (
      <section className="w-full">
        <div className="grid max-w-full animate-fade grid-cols-12 grid-rows-2 gap-2 px-8 py-10">
          <Skeleton className="col-span-12 h-96  sm:col-span-4"></Skeleton>
          <Skeleton className="col-span-12 h-96  sm:col-span-4"></Skeleton>
          <Skeleton className="col-span-12 h-96  sm:col-span-4"></Skeleton>
          <Skeleton className="col-span-12 h-96  sm:col-span-5"></Skeleton>
          <Skeleton className="col-span-12 h-96  sm:col-span-7"></Skeleton>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full">
      <div className="grid max-w-full animate-fade grid-cols-12 grid-rows-2 gap-2 px-8 py-10">
        {adaptedProjects.map((project, index) => {
          if (index > 4) return

          if (index === 3) {
            project.colSpan = '5'
          }

          if (index === 4) {
            project.colSpan = '7'
          }

          return <CustomCard key={project.id} {...project} />
        })}
      </div>

      <Divider className="my-4 animate-flip-down animate-duration-[2000ms] animate-once animate-ease-in" />
    </section>
  )
}

export default WorkGrid
