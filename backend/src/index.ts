import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { boardsRoute } from './routes/boards.js'
import { threadsRoute } from './routes/threads.js'

const app = new Hono()

app.get('/', (c) => c.text('ok'))
app.route('/api/boards', boardsRoute)
app.route('/api/threads', threadsRoute)

serve({ fetch: app.fetch, port: 3000 })
