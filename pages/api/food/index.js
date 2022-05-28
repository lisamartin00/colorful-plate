import { listFood, createFood } from '@/lib/fauna'

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      const entries = await listFood()

      res.json(entries)
    },

    POST: async () => {
      const {
        body: { name, color, photoUrl },
      } = req
      const created = await createFood({
        name,
        photoUrl,
        color,
        createdAt: new Date(),
      })

      res.json(created)
    },
  }

  if (!handlers[req.method]) {
    return res.status(405).end()
  }

  await handlers[req.method]()
}
