import apiWrapper from 'lib/api/apiWrapper'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method == 'GET') {
    return handleGetAll(req, res)
  } else {
    res.setHeader('Allow', ['GET'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
  // Platform specific endpoint
  const response = [
    {
      id: 1,
      name: 'Default Organization',
      slug: 'default-org-slug',
      billing_email: 'billing@supabase.co',
    },
  ]
  return res.status(200).json(response)
}
