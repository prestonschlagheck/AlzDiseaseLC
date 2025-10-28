import { Hero } from '../components/Hero'
import { VideoIntroduction } from '../components/VideoIntroduction'
import { Statistics } from '../components/Statistics'
import { EducationalPrograms } from '../components/EducationalPrograms'
import { Faculty } from '../components/Faculty'
import { ResourceCenter } from '../components/ResourceCenter'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import NewsFeed from '../components/NewsFeed'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16 lg:pt-20"> {/* Adjusted mobile padding to prevent header overlap */}
        <Hero />
        <VideoIntroduction />
        <EducationalPrograms />
        <Statistics />
        <NewsFeed />
        <Faculty />
        <ResourceCenter />
        <Footer />
      </div>
    </main>
  )
}