import fs from 'fs'
import path from 'path'

const RATINGS_FILE = path.join(process.cwd(), 'public/ratings.json')

export default JSON.parse(fs.readFileSync(RATINGS_FILE))
