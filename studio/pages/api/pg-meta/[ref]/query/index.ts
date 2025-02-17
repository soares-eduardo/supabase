import { NextApiRequest, NextApiResponse } from 'next'
import apiWrapper from 'lib/api/apiWrapper'
import { constructHeaders } from 'lib/api/apiHelpers'
import { PG_META_URL } from 'lib/constants'
import { post } from 'lib/common/fetch'

export default (req: NextApiRequest, res: NextApiResponse) =>
  apiWrapper(req, res, handler, { withAuth: true })

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method == 'POST') {
    return handlePost(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: { message: `Method ${method} Not Allowed` } })
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.body
  const headers = constructHeaders(req.headers)
  const response = await post(`${PG_META_URL}/query`, { query: enrichQuery(query) }, { headers })

  if (response.error) {
    return res.status(400).json({ error: response.error })
  } else {
    return res.status(200).json(response)
  }
}

const enrichQuery = (query: string) => `
-- source: dashboard
-- user: ${'self host'}
-- date: ${new Date().toISOString()}

${query}
`
