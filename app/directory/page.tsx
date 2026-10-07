import DirectoryClient from '@/components/directory/DirectoryClient'
import { getAllProviders } from '@/lib/queries'
import { Provider } from '@/lib/data/providers'

// Static fallback data while Sanity is being seeded
const FALLBACK_PROVIDERS: Provider[] = [
  { _id: '1',  name: 'Gulf Resource Recovery',     region: 'Riyadh',    country: 'ksa', materials: ['Plastics', 'Metals', 'E-waste'],              licensed: true,  licenceBody: 'MWAN' },
  { _id: '2',  name: 'Najd Materials Reclamation', region: 'Riyadh',    country: 'ksa', materials: ['Paper & board', 'Plastics'],                   licensed: true,  licenceBody: 'MWAN' },
  { _id: '3',  name: 'Red Sea Circular Co.',       region: 'Jeddah',    country: 'ksa', materials: ['Organics', 'Paper & board'],                   licensed: true,  licenceBody: 'MWAN' },
  { _id: '4',  name: 'Tihama Waste Partners',      region: 'Jeddah',    country: 'ksa', materials: ['C&D', 'Metals'],                               licensed: false },
  { _id: '5',  name: 'Eastern Province Recyclers', region: 'Dammam',    country: 'ksa', materials: ['Metals', 'E-waste'],                           licensed: true,  licenceBody: 'MWAN' },
  { _id: '6',  name: 'Dhahran Stream Services',    region: 'Dammam',    country: 'ksa', materials: ['Plastics', 'Organics'],                        licensed: true,  licenceBody: 'MWAN' },
  { _id: '7',  name: 'Emirates Circular Co.',      region: 'Dubai',     country: 'uae', materials: ['Organics', 'C&D', 'Paper & board'],            licensed: true,  licenceBody: 'Dubai Municipality' },
  { _id: '8',  name: 'Marina Reclaim',             region: 'Dubai',     country: 'uae', materials: ['Plastics', 'E-waste'],                         licensed: true,  licenceBody: 'Dubai Municipality' },
  { _id: '9',  name: 'Capital Waste Solutions',    region: 'Abu Dhabi', country: 'uae', materials: ['C&D', 'Metals', 'Plastics'],                   licensed: true,  licenceBody: 'Tadweer' },
  { _id: '10', name: 'Yas Materials Group',        region: 'Abu Dhabi', country: 'uae', materials: ['E-waste', 'Paper & board'],                    licensed: false },
  { _id: '11', name: 'Sharjah Reclamation Works',  region: 'Sharjah',   country: 'uae', materials: ['Metals', 'C&D'],                               licensed: true,  licenceBody: "Bee'ah" },
  { _id: '12', name: 'Industrial Belt Recovery',   region: 'Sharjah',   country: 'uae', materials: ['Plastics', 'Organics', 'Paper & board'],       licensed: true,  licenceBody: "Bee'ah" },
]

export default async function DirectoryPage() {
  const sanityProviders = await getAllProviders()
  const providers = sanityProviders?.length > 0 ? sanityProviders : FALLBACK_PROVIDERS

  return <DirectoryClient providers={providers} />
}
