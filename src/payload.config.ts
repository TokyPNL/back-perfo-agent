import { Auth } from './payload-types';
// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Managers from './collections/Managers'
import Agents from './collections/Agents'
import Projets from './collections/Projets'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Managers, Agents, Projets],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '36795ec7c43e2ffc2fd090bf',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb+srv://ramahefarisontoky:9xJE5mcNnHIg2bss@cluster0.vdujor2.mongodb.net/test',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: '*', // allow requests from all origins
})
